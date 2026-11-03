export const entranceMotion = {
  duration: 850,
  distance: 24,
  stagger: 120,
  maxStagger: 360,
  easing: "ease-in-out",
  motionEasing: [.42, 0, .58, 1] as [number, number, number, number],
};

export const entranceFrames: Keyframe[] = [
  { opacity: 0, transform: `translateY(${entranceMotion.distance}px)` },
  { opacity: 1, transform: "translateY(0)" },
];
