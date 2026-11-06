import wedding from "../data/wedding-details.json";

export default function AttirePalette() {
  return (
      <ul aria-label="Dress code color palette" className="mx-auto grid w-full max-w-md grid-cols-6 gap-1 sm:gap-2">
        {wedding.design.palette.map((color) => (
          <li key={color.hex} className="text-center">
            <span aria-hidden="true" className="mj-swatch mx-auto mb-2 block h-8 w-8 rounded-full min-[390px]:h-10 min-[390px]:w-10 lg:h-12 lg:w-12" style={{ backgroundColor: color.hex }} />
            <span className="mx-auto block max-w-[4rem] text-[10px] leading-tight sm:text-xs">{color.name}</span>
          </li>
        ))}
      </ul>
  );
}
