const flapEdge = "M1000 0 C995 200 973 335 922 425 C916 449 923 463 901 466 C875 459 860 480 854 521 C850 555 827 562 807 555 C785 556 764 577 744 619 C716 676 682 724 633 768 C602 796 576 822 574 853 C571 910 552 963 524 986 Q500 1014 476 986 C448 963 429 910 426 853 C424 822 398 796 367 768 C318 724 284 676 256 619 C236 577 215 556 193 555 C173 562 150 555 146 521 C140 480 125 459 99 466 C77 463 84 449 78 425 C27 335 5 200 0 0";

const embossedScrolls = [
  "M30 55 C48 239 90 344 119 377 C140 400 165 387 158 360 C150 335 117 345 134 366 C157 395 193 380 209 404 C226 431 201 449 187 430 C174 409 207 395 230 426 C252 455 251 499 280 525 C307 548 343 523 325 500 C310 480 284 502 305 515 C340 544 379 533 390 571",
  "M970 55 C952 239 910 344 881 377 C860 400 835 387 842 360 C850 335 883 345 866 366 C843 395 807 380 791 404 C774 431 799 449 813 430 C826 409 793 395 770 426 C748 455 749 499 720 525 C693 548 657 523 675 500 C690 480 716 502 695 515 C660 544 621 533 610 571",
  "M374 715 C409 741 443 728 441 692 C439 665 409 662 402 684 C395 707 425 714 429 691 M626 715 C591 741 557 728 559 692 C561 665 591 662 598 684 C605 707 575 714 571 691",
];

export function EnvelopeShapeDefinition({ id }: { id: string }) {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <clipPath id={id} clipPathUnits="objectBoundingBox">
          <path d={`${flapEdge.replace("M1000 0", "M0 0 H1000")} Z`} transform="scale(0.001)" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function EnvelopeFlapLines() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="aj-envelope-flap-lines pointer-events-none absolute inset-0 h-full w-full" fill="none">
      <g transform="translate(20 0) scale(.96 .968)" strokeWidth="1.5">
        <path d={flapEdge} stroke="#fff7eb" transform="translate(-1 -2)" />
        <path d={flapEdge} stroke="#967b66" />
        <path d={flapEdge} stroke="#fff7eb" transform="translate(7 -5) scale(.986 .989)" />
      </g>
      <g strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {embossedScrolls.map(path => (
          <g key={path}>
            <path d={path} stroke="#fff9ec" transform="translate(-1.5 -2)" />
            <path d={path} stroke="#9c8270" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function EnvelopeFoldLines() {
  const folds = "M0 1000 C18 873 123 813 242 678 L440 498 M1000 1000 C982 873 877 813 758 678 L560 498";
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 1000" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
      <path d={folds} stroke="#fff8e8" strokeWidth="2.4" transform="translate(-1.5 -1.5)" />
      <path d={folds} stroke="#a58c7b" strokeOpacity=".55" strokeWidth="1.2" />
    </svg>
  );
}
