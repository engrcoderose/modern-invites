export const musicStartEvent = "edcel-and-apreal:music-start";
export const filmPlayEvent = "edcel-and-apreal:film-play";

export function startInvitationMusic() {
  window.dispatchEvent(new Event(musicStartEvent));
}
