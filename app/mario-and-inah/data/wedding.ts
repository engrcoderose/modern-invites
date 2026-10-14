export const wedding = {
  couple: { display: "Mario & Inah", groom: "Mario Tsubasa O. Shimizu", bride: "Inah Patricia V. Orense" },
  date: { display: "February 20, 2027", iso: "2027-02-20T16:00:00+08:00", day: "Saturday", short: "20 · 02 · 2027" },
  venue: { name: "Panaad Garden Tagaytay", address: "238 Pag-ibig St., Tagaytay City, Philippines", directions: "https://maps.app.goo.gl/XJp3mL8eKM793irz6" },
  rsvp: { eventSlug: "mario-and-inah", deadline: "January 17, 2027", email: "mariotsubasas@gmail.com" },
  attire: {
    title: "Pastel & semi casual",
    noteLabel: "A little dress code note:",
    note: "Ladies, please avoid white dresses, and gentlemen, please skip the blue jeans.",
    footwear: "For your comfort, we recommend block heels, wedges, or pretty flats to enjoy the day on grass and uneven ground.",
  },
  music: { title: "Kasama Kang Tumanda", version: "Stagecrew", src: "/mario-and-inah/music/kasama-kang-tumanda-ffc2af93.mp3" },
} as const;

export const timeline = [
  { time: "3:00 PM", label: "Guest arrival", icon: "arrival" },
  { time: "3:30 PM", label: "Entourage", icon: "entourage" },
  { time: "4:00 PM", label: "Ceremony", icon: "ceremony" },
  { time: "5:00 PM", label: "Cocktail hour", icon: "cocktails" },
  { time: "6:00 PM", label: "Reception dinner", icon: "dinner" },
  { time: "9:00 PM", label: "Drinks & videoke", icon: "music" },
] as const;

