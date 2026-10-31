/** Crisp, repeating botanical linework; intentionally decorative. */
export default function FloralOrnament({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 400" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.1">
        <path d="M20 390C175 295 68 194 177 58M38 373C81 277 192 272 213 152M72 323C21 249 30 178 9 124" />
        <path d="M83 287C101 231 139 226 151 216C151 253 120 279 83 287ZM68 238C28 220 13 196 17 170C48 178 69 207 68 238ZM110 176C127 137 149 123 174 123C171 155 143 176 110 176ZM143 108C115 94 108 69 116 44C140 58 152 83 143 108ZM141 269C162 231 183 221 209 224C198 252 174 269 141 269ZM48 303C18 288 9 265 14 245C38 255 52 279 48 303Z" />
        {[{ x: 177, y: 55, r: 22 }, { x: 208, y: 147, r: 17 }, { x: 69, y: 224, r: 19 }].map(({ x, y, r }) => (
          <g key={x} transform={`translate(${x} ${y})`}>
            {[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="0" cy={-r / 2} rx={r / 2.6} ry={r / 1.4} transform={`rotate(${angle})`} />)}
            <circle r={r / 5} fill="currentColor" stroke="none" />
          </g>
        ))}
        <path d="M72 323C102 316 113 301 116 282M36 354C24 334 20 316 26 300" />
      </g>
    </svg>
  );
}
