export const TIME_SLOTS = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const SERVICES = [
  { value: "styling", label: "Interior Styling" },
  { value: "wellness", label: "Wellness-Inspired Living" },
  { value: "heritage", label: "Modern Heritage" },
  { value: "consultation", label: "General Consultation" },
] as const;

export type ServiceValue = (typeof SERVICES)[number]["value"];

export function formatTimeLabel(t: string) {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
}
