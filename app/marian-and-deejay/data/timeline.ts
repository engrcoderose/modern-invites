import church from "../assets/designs/timeline-church-inc-v1.webp";
import camera from "../assets/designs/timeline_camera.png";
import reception from "../assets/designs/timeline_reception.png";
import guestArrival from "../assets/designs/timeline_guest_arrival.png";
import program from "../assets/designs/timeline_wedding_program.png";
import dinner from "../assets/designs/timeline_dinner.png";
import wedding from "./wedding-details.json";

const artwork = [church, camera, reception, guestArrival, program, dinner];

// Copy and times remain in the questionnaire data; artwork follows the same order.
export const timelineItems = wedding.timeline.map((item, index) => ({
  ...item,
  artwork: artwork[index],
  preserveArtworkInk: artwork[index] === church,
}));
