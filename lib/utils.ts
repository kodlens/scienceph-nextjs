import dayjs from "dayjs";

export function extractFirstImage(htmlContent: string): string | null {
  const regex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = htmlContent.match(regex);
  return match ? match[1] : null;
}


export function dateFormatter(dateString: string, format: string = "MMM D, YYYY"): string {
  return dayjs(dateString).format(format);
}

export function truncate(text: string, maxLength: number, ellipsis: string = "…"): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + ellipsis : text;
}