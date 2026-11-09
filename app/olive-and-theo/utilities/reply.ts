export interface Reply {
  name: string;
  contact: string;
  attendance: "" | "yes" | "no";
}

export const emptyReply: Reply = { name: "", contact: "", attendance: "" };

export function validateReply(reply: Reply): string | null {
  if (reply.name.trim().length < 2) return "Please enter your full name using at least two characters.";
  const contact = reply.contact.trim();
  const digits = contact.replace(/\D/g, "");
  if (contact && (!/^\+?[\d\s().-]+$/.test(contact) || digits.length < 7 || digits.length > 15)) return "Please enter a valid contact number, or leave this optional field blank.";
  if (!["yes", "no"].includes(reply.attendance)) return "Please let us know whether you can join us.";
  return null;
}

export function normalizeReply(reply: Reply): Reply {
  return { ...reply, name: reply.name.trim(), contact: reply.contact.trim() };
}
