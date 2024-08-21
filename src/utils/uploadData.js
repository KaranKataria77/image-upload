import { supabase } from "./supabaseClient";

export const insertImage = async (imagePath) => {
  const { data, error } = await supabase
    .from("images")
    .insert([{ url: imagePath }]);

  if (error) {
    console.error(error);
    return null;
  }
  return data;
};
