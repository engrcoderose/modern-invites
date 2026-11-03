import DecorativeBackground from "./DecorativeBackground";
import storyPattern from "../assets/artwork/story-background-pattern.webp";
import styles from "../styles/invitation.module.css";

export default function StoryBackground() {
  return <DecorativeBackground image={storyPattern} className={styles.storyPattern} />;
}
