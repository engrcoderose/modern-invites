import { bandPoint, knotPosition, smooth } from "./ribbon-motion";
import { RIBBON_WIDTH, ribbonStrips, type RibbonPoint, type RibbonStrip } from "./ribbon-strips";

const ACROSS = 10;
const STRIDE = 8;
const vertexSource = `
  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 normal;
  varying vec2 fabricUv;
  varying vec3 fabricNormal;
  void main() {
    gl_Position = vec4(position.x * 2.0 - 1.0, 1.0 - position.y, -position.z / 200.0, 1.0);
    fabricUv = uv;
    fabricNormal = normal;
  }
`;
const fragmentSource = `
  precision mediump float;
  uniform sampler2D artwork;
  uniform bool satin;
  varying vec2 fabricUv;
  varying vec3 fabricNormal;
  void main() {
    if (satin) {
      vec3 n = normalize(fabricNormal);
      if (n.z < 0.0) n = -n;
      vec3 light = normalize(vec3(-.45, -.55, 1.0));
      vec3 halfLight = normalize(light + vec3(0.0, 0.0, 1.0));
      float diffuse = max(dot(n, light), 0.0);
      float specular = pow(max(dot(n, halfLight), 0.0), 18.0);
      float sheen = .59 + .2 * diffuse + .09 * specular;
      sheen += .1 * exp(-pow((fabricUv.y - .25) * 4.0, 2.0));
      sheen += .004 * sin(fabricUv.x * 1800.0);
      float edge = smoothstep(.008, .035, fabricUv.y) * (1.0 - smoothstep(.965, .992, fabricUv.y));
      sheen -= .09 * (1.0 - edge);
      gl_FragColor = vec4(vec3(sheen) * vec3(1.0, .993, .985), 1.0);
    } else {
      vec4 color = texture2D(artwork, fabricUv);
      if (color.a < .025) discard;
      gl_FragColor = color;
    }
  }
`;

function shader(gl: WebGLRenderingContext, type: number, source: string) {
  const result = gl.createShader(type);
  if (!result) throw new Error("Ribbon shader unavailable");
  gl.shaderSource(result, source);
  gl.compileShader(result);
  if (!gl.getShaderParameter(result, gl.COMPILE_STATUS)) { gl.deleteShader(result); throw new Error("Ribbon shader failed"); }
  return result;
}

function indices(columns: number, rows: number) {
  const result = new Uint16Array(columns * rows * 6);
  for (let y = 0, offset = 0; y < rows; y++) for (let x = 0; x < columns; x++, offset += 6) {
    const a = y * (columns + 1) + x;
    result.set([a, a + 1, a + columns + 1, a + 1, a + columns + 2, a + columns + 1], offset);
  }
  return result;
}

function normalize(x: number, y: number, z: number): RibbonPoint {
  const length = Math.hypot(x, y, z) || 1;
  return { x: x / length, y: y / length, z: z / length };
}

function cross(a: RibbonPoint, b: RibbonPoint) {
  return normalize(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}

function write(data: Float32Array, offset: number, x: number, y: number, z: number, u: number, v: number, normal: RibbonPoint) {
  data[offset] = x; data[offset + 1] = y; data[offset + 2] = z;
  data[offset + 3] = u; data[offset + 4] = v;
  data[offset + 5] = normal.x; data[offset + 6] = normal.y; data[offset + 7] = normal.z;
}

export function createRibbonRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const context = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: true });
  if (!context) return null;
  const gl: WebGLRenderingContext = context;
  const vertex = shader(gl, gl.VERTEX_SHADER, vertexSource);
  const fragment = shader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const element = gl.createBuffer();
  const texture = gl.createTexture();
  if (!program || !buffer || !element || !texture) throw new Error("Ribbon renderer unavailable");
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Ribbon renderer failed");
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, element);
  for (const [name, size, offset] of [["position", 3, 0], ["uv", 2, 3], ["normal", 3, 5]] as const) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location); gl.vertexAttribPointer(location, size, gl.FLOAT, false, STRIDE * 4, offset * 4);
  }
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  for (const parameter of [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T]) gl.texParameteri(gl.TEXTURE_2D, parameter, gl.CLAMP_TO_EDGE);
  for (const parameter of [gl.TEXTURE_MIN_FILTER, gl.TEXTURE_MAG_FILTER]) gl.texParameteri(gl.TEXTURE_2D, parameter, gl.LINEAR);
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.enable(gl.DEPTH_TEST); gl.depthFunc(gl.LEQUAL);
  const material = gl.getUniformLocation(program, "satin");
  const pool = new Map<string, { data: Float32Array; indices: Uint16Array }>();
  const facing = { x: 0, y: 0, z: 1 };
  let lastProgress = 0;

  function mesh(columns: number, rows: number) {
    const key = `${columns}:${rows}`;
    let result = pool.get(key);
    if (!result) { result = { data: new Float32Array((columns + 1) * (rows + 1) * STRIDE), indices: indices(columns, rows) }; pool.set(key, result); }
    return result;
  }

  function render(shape: ReturnType<typeof mesh>, satin: boolean) {
    gl.uniform1i(material, satin ? 1 : 0);
    gl.bufferData(gl.ARRAY_BUFFER, shape.data, gl.DYNAMIC_DRAW);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, shape.indices, gl.DYNAMIC_DRAW);
    gl.drawElements(gl.TRIANGLES, shape.indices.length, gl.UNSIGNED_SHORT, 0);
  }

  function drawStrip(strip: RibbonStrip, progress: number) {
    const shape = mesh(ACROSS, strip.points.length - 1);
    const knot = knotPosition(progress);
    let distance = strip.materialOffset;
    strip.points.forEach((point, i) => {
      const before = strip.points[Math.max(0, i - 1)];
      const after = strip.points[Math.min(strip.points.length - 1, i + 1)];
      const tangent = normalize(after.x - before.x, after.y - before.y, after.z - before.z);
      const flat = normalize(-tangent.y, tangent.x, 0);
      const upright = cross(tangent, flat);
      const t = i / (strip.points.length - 1);
      const twist = strip.twist * Math.sin(t * (strip.tail ? 4 : 6.283) - (strip.tail ? progress * 5 : 0));
      const widthVector = { x: flat.x * Math.cos(twist) + upright.x * Math.sin(twist), y: flat.y * Math.cos(twist) + upright.y * Math.sin(twist), z: flat.z * Math.cos(twist) + upright.z * Math.sin(twist) };
      const normal = cross(tangent, widthVector);
      const width = (strip.width || RIBBON_WIDTH) * (.4 + .6 * smooth(14, 58, Math.hypot(point.x, point.y)));
      if (i) distance += Math.hypot(point.x - before.x, point.y - before.y, point.z - before.z);
      for (let across = 0; across <= ACROSS; across++) {
        const v = across / ACROSS;
        const offset = (v - .5) * width;
        const crown = Math.sin(v * Math.PI);
        const notch = strip.tail && i === strip.points.length - 1 ? -14 * (1 - Math.abs(v * 2 - 1)) : 0;
        const derivative = Math.PI * Math.cos(v * Math.PI) / width;
        const surface = normalize(normal.x - widthVector.x * derivative, normal.y - widthVector.y * derivative, normal.z - widthVector.z * derivative);
        write(shape.data, (i * (ACROSS + 1) + across) * STRIDE,
          knot.x + (point.x + widthVector.x * offset + normal.x * crown + tangent.x * notch) / 400,
          knot.y + (point.y + widthVector.y * offset + normal.y * crown + tangent.y * notch) / 690,
          point.z + widthVector.z * offset + normal.z * crown, distance / 400, v, surface);
      }
    });
    render(shape, true);
  }

  function draw(progress: number) {
    lastProgress = progress;
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const aspect = canvas.clientWidth / (canvas.clientHeight / 2);
    const band = mesh(36, ACROSS);
    for (const side of [-1, 1] as const) {
      for (let across = 0; across <= ACROSS; across++) for (let i = 0; i <= 36; i++) {
        const t = i / 36;
        const point = bandPoint(t, side, progress);
        const before = bandPoint(Math.max(0, t - .005), side, progress);
        const after = bandPoint(Math.min(1, t + .005), side, progress);
        const dx = (after.x - before.x) * aspect; const dy = after.y - before.y;
        const length = Math.hypot(dx, dy) || 1; const offset = (across / ACROSS - .5) * .046;
        write(band.data, (across * 37 + i) * STRIDE, point.x - dy / length * offset / aspect, point.y + dx / length * offset, -30, t, across / ACROSS, facing);
      }
      render(band, true);
    }
    ribbonStrips(progress).forEach(strip => drawStrip(strip, progress));

    // Only the small knot cap retains the photograph. It turns aside as the
    // full-width strip underneath unfolds; no loop image is scaled or warped.
    const undo = smooth(.59, .78, progress);
    if (undo < 1) {
      const cap = mesh(1, 1); const knot = knotPosition(progress); const angle = undo * Math.PI / 2;
      for (let row = 0; row < 2; row++) for (let column = 0; column < 2; column++) {
        write(cap.data, (row * 2 + column) * STRIDE,
          knot.x - .0656 + column * .1312 * Math.cos(angle), knot.y - .036 + row * .06912 + undo * .014,
          80 + column * 52 * Math.sin(angle), .42 + column * .16, .25 + row * .17, facing);
      }
      render(cap, false);
    }
  }

  function resize() {
    const density = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(canvas.clientWidth * density); canvas.height = Math.round(canvas.clientHeight * density);
    gl.viewport(0, 0, canvas.width, canvas.height); draw(lastProgress);
  }
  const observer = new ResizeObserver(resize); observer.observe(canvas); resize();
  return { draw, dispose() { observer.disconnect(); pool.clear(); gl.deleteBuffer(buffer); gl.deleteBuffer(element); gl.deleteTexture(texture); gl.deleteProgram(program); gl.deleteShader(vertex); gl.deleteShader(fragment); } };
}
