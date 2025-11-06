import { ensureCloudinaryUrl } from "./cloudinary";

const EXTERNAL_SCHEME_REGEX = /^https?:\/\//i;

function normalizeScheme(url: string) {
  const match = url.match(EXTERNAL_SCHEME_REGEX);
  if (!match) {
    return url;
  }

  const rest = url.slice(match[0].length);
  const scheme = match[0].toLowerCase();
  return `${scheme}${rest}`;
}

export function normalizeImageUrl(src: string | null | undefined, fallback: string): string {
  const value = (src ?? "").trim();
  if (!value) {
    return fallback;
  }

  const cloudinaryUrl = ensureCloudinaryUrl(value);
  if (cloudinaryUrl) {
    return cloudinaryUrl;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (EXTERNAL_SCHEME_REGEX.test(value)) {
    return normalizeScheme(value);
  }

  return fallback;
}
