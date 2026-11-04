import styles from "./styles/opening.module.css";

function FoldLines() {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 690" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      <path d="M0 0 200 235 M0 690 200 455" fill="none" stroke="#b4a182" strokeOpacity=".28" strokeWidth="2" />
      <path d="M0 2 198 236 M0 688 198 454" fill="none" stroke="#fffaf0" strokeOpacity=".9" strokeWidth="2" />
    </svg>
  );
}

export default function EnvelopePanels() {
  return (
    <div aria-hidden="true" className={`${styles.panels} pointer-events-none absolute inset-0`}>
      <div className={`${styles.topFlap} absolute inset-x-0 top-0`} />
      <div className={`${styles.bottomFlap} absolute inset-x-0 bottom-0`} />
      <div className={`${styles.leftDoor} absolute inset-y-0 left-0 w-1/2`}>
        <div className={`${styles.paperFace} absolute inset-0`}>
          <span className={`${styles.upperFold} absolute inset-0`} />
          <span className={`${styles.lowerFold} absolute inset-0`} />
          <FoldLines />
        </div>
      </div>
      <div className={`${styles.rightDoor} absolute inset-y-0 right-0 w-1/2`}>
        <div className={`${styles.paperFace} absolute inset-0`}>
          <span className={`${styles.upperFold} absolute inset-0`} />
          <span className={`${styles.lowerFold} absolute inset-0`} />
          <FoldLines />
        </div>
      </div>
    </div>
  );
}
