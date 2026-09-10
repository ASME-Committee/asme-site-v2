/** Parsed as UTC so the rendered date cannot shift by a day between the server
 *  and a browser in a different timezone. */
export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
