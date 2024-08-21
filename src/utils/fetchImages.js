const { supabase } = require("./supabaseClient");

export const getAllImages = async () => {
  const { data, error } = await supabase.from("images").select("*");

  if (error) {
    console.error(error);
    return [];
  }
  return data;
};
