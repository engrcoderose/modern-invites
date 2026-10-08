const flapEdge = "M0 0H1000 C977 182 879 364 757 520 C661 645 580 746 516 774 Q500 791 484 774 C420 746 339 645 243 520 C121 364 23 182 0 0Z";

export default function EnvelopeArtwork({ flapId, pocketId }: { flapId: string; pocketId: string }) {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
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
