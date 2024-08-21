import { supabase } from "./supabaseClient";

export async function uploadImage(file) {
  const { data, error } = await supabase.storage
    .from("user-images")
    .upload(`public/${file.name}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  return data.path;
}
