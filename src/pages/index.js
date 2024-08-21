import { getAllImages } from "@/utils/fetchImages";
import { supabase } from "@/utils/supabaseClient";
import { insertImage } from "@/utils/uploadData";
import { uploadImage } from "@/utils/uploadImage";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  useEffect(() => {
    fetchImages();
    console.log("files changes ");
  }, [file]);

  const fetchImages = async () => {
    const data = await getAllImages();
    setImages(data);
  };
  const handleFileChange = async (file) => {
    const path = await uploadImage(file);
    const data = await insertImage(path);
    setFile(file);
  };

  const showImage = (imagePath) => {
    const imageUrl = supabase.storage
      .from("user-images")
      .getPublicUrl(`${imagePath}`);
    return imageUrl?.data?.publicUrl;
  };
  return (
    <div className="flex flex-col items-center justify-center my-20">
      <div className="relative bg-red-600 w-52 rounded-md">
        <label className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600">
          <span className="mr-2">Upload Image</span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileChange(e.target.files[0])}
          />
        </label>
      </div>
      <div className="flex flex-wrap justify-center items-center mt-10">
        {images &&
          images?.length > 0 &&
          images?.map((image, index) => {
            const img = showImage(image.url);
            return (
              img && (
                <Image
                  key={index}
                  src={img}
                  alt="image"
                  width={300}
                  height={300}
                  className="p-2 !w-[300px] !h-[300px]"
                />
              )
            );
          })}
      </div>
    </div>
  );
};

export default Home;
