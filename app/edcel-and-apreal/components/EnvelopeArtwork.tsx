const flapEdge = "M0 0H1000 C977 182 879 364 757 520 C661 645 580 746 516 774 Q500 791 484 774 C420 746 339 645 243 520 C121 364 23 182 0 0Z";
// Map source luminance from palette burgundy (#4B0F1F) to old rose (#B76E79), retaining alpha.
const burgundyTint = "0.0900424 0.3029082 0.0305788 0 0.2941176 0.0792039 0.2664471 0.0268980 0 0.0588235 0.0750353 0.2524235 0.0254824 0 0.1215686 0 0 0 1 0";

export default function EnvelopeArtwork({ flapId, pocketId, tintId }: { flapId: string; pocketId: string; tintId: string }) {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <filter id={tintId} colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values={burgundyTint} />
        </filter>
        <clipPath id={flapId} clipPathUnits="objectBoundingBox">
          <path d={flapEdge} transform="scale(.001)" />
        </clipPath>
        <clipPath id={pocketId} clipPathUnits="objectBoundingBox">
          <path d={`M0 0H1000V1000H0Z ${flapEdge}`} clipRule="evenodd" transform="scale(.001)" />
        </clipPath>
      </defs>
    </svg>
  );
}
