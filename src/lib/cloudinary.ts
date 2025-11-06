const CLOUDINARY_BASE = "https://res.cloudinary.com";

function getCloudinaryCloudName() {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim() || null;
}

export function buildCloudinaryUrl(publicId: string, options?: { transformation?: string }): string | null {
  const cloudName = getCloudinaryCloudName();
  if (!cloudName) {
    return null;
  }

  const trimmedId = publicId.replace(/^\/+/, "");
  if (!trimmedId) {
    return null;
  }

  const transformation = options?.transformation?.trim().replace(/^\/+|\/+$|\s+/g, "") || "";
  const segments = [CLOUDINARY_BASE, cloudName, "image", "upload"];
  if (transformation) {
    segments.push(transformation);
  }
  segments.push(trimmedId);
  return segments.join("/");
}

export function ensureCloudinaryUrl(value: string | null | undefined): string | null {
  const url = value?.trim();
  if (!url) {
    return null;
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  if (url.startsWith("//")) {
    return `https:${url}`;
  }

  return buildCloudinaryUrl(url) ?? null;
}
