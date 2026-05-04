import dayjs from "dayjs";

function normalizeImageSource(src: string, baseUrl: string = "https://science.ph/storage"): string {
  const trimmedSrc = src.trim();

  if (
    !trimmedSrc ||
    /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(trimmedSrc) ||
    trimmedSrc.startsWith("#")
  ) {
    return trimmedSrc;
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");
  const storagePrefixPattern = /^\/?storage(?=\/|$)/i;
  const srcWithoutStoragePrefix = trimmedSrc.replace(storagePrefixPattern, "");
  const cleanSrc = srcWithoutStoragePrefix.startsWith("/")
    ? srcWithoutStoragePrefix
    : `/${srcWithoutStoragePrefix}`;

  return `${normalizedBaseUrl}${cleanSrc}`;
}

export function extractFirstImage(htmlContent: string, baseUrl: string = "https://science.ph/storage"): string | null {
  const regex = /<img[^>]+src=["']([^"']+)["']/i;
  const match = htmlContent.match(regex);

  if (!match?.[1]) return null;

  return normalizeImageSource(match[1], baseUrl);
}


export function dateFormatter(dateString: string, format: string = "MMM D, YYYY"): string {
  return dayjs(dateString).format(format);
}

export function truncate(text: string, maxLength: number, ellipsis: string = "…"): string {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + ellipsis : text;
}

export function fixImageSources(html: string, baseUrl: string = "https://science.ph/storage"): string {
  if (!html) return "";

  return html.replace(
    /(<img\b[^>]*?\bsrc\s*=\s*)(["'])([^"']+)(\2)/gi,
    (_match, prefix: string, quote: string, src: string, suffix: string) => {
      return `${prefix}${quote}${normalizeImageSource(src, baseUrl)}${suffix}`;
    },
  );
}
