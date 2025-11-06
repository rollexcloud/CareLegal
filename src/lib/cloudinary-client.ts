const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim();
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();

function requireEnv(name: string, value: string | undefined | null) {
  if (!value) {
    throw new Error(`${name} is not configured.`);
  }
  return value;
}

export async function uploadToCloudinary(file: File, folder?: string): Promise<string> {
  const preset = requireEnv("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET", CLOUDINARY_UPLOAD_PRESET);
  const cloudName = requireEnv("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME", CLOUDINARY_CLOUD_NAME);

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);
  if (folder) {
    formData.append("folder", folder);
  }

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const message = typeof errorPayload?.error?.message === "string" ? errorPayload.error.message : "Upload failed";
    throw new Error(message);
  }

  const payload = await response.json();
  if (typeof payload.secure_url !== "string") {
    throw new Error("Cloudinary response missing secure_url");
  }

  return payload.secure_url as string;
}
