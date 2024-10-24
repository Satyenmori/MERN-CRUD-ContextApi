import formModel from "../model/Formdata.js";

export const getAllData = async (req, res) => {
  try {
    const data = await formModel.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSingleData = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await formModel.findById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const FormAdd = async (req, res) => {
  try {
    const images = req.files["images"]
      ? req.files["images"].map((file) => file.filename)
      : [];
    const img = req.files["img"] ? req.files["img"][0].filename : "";
    const data = new formModel({ ...req.body, images, img });
    await data.save();
    res.status(200).json({ msg: "Data is Add successfully", data });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Room is Not Added", message: error.message });
  }
};

export const deleteFormData = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await formModel.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data deleted successfully", data });
  } catch (error) {
    res.status(500).json(error);
  }
};

// edit logic
const handleImageUpload = (existingImages, newFiles) => {
  if (newFiles && newFiles.length > 0) {
    const newImages = newFiles.map((file) => file.filename);
    return existingImages ? [...existingImages, ...newImages] : newImages;
  }
  return existingImages;
};
// export const FormEdit = async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Get the existing data
//     const existingData = await formModel.findById(id);
//     if (!existingData) {
//       return res.status(404).json({ error: "Data not found" });
//     }

//     // Ensure that existingImages is parsed as an array
//     const remainingImages = Array.isArray(req.body.existingImages)
//       ? req.body.existingImages
//       : [req.body.existingImages].filter(Boolean); // Ensures it's an array even if only one image is present

//     // Add new uploaded images (if any)
//     const newImages = req.files?.images?.map((file) => file.filename) || [];
//     const updatedImages = [...remainingImages, ...newImages];

//     // Update the data
//     const updatedData = await formModel.findByIdAndUpdate(
//       id,
//       {
//         ...req.body,
//         images: updatedImages,
//         img: req.files?.img?.[0]?.filename || existingData.img, // Single img update directly
//       },
//       { new: true }
//     );

//     res.status(200).json({ msg: "Data updated successfully", updatedData });
//   } catch (error) {
//     res.status(500).json({ error: "Data not updated", message: error.message });
//   }
// };

// edit with Helper function throw handle single and multiple images

// Helper function to handle multiple images
function handleMultipleImages(newFiles, existingImages, currentImages) {
  const newImages = newFiles?.map((file) => file.filename) || [];
  const remainingImages = Array.isArray(existingImages)
    ? existingImages
    : [existingImages].filter(Boolean);

  // Merge existing and new images
  return [...remainingImages, ...newImages].length > 0
    ? [...remainingImages, ...newImages]
    : currentImages;
}

// Helper function to handle single image
function handleSingleImage(newFile, currentImage) {
  return newFile?.[0]?.filename || currentImage;
}

export const FormEdit = async (req, res) => {
  try {
    const { id } = req.params;

    // Get the existing data
    const existingData = await formModel.findById(id);
    if (!existingData) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Handle multiple images (e.g., 'images' field)
    const updatedImages = handleMultipleImages(
      req.files?.images,
      req.body.existingImages,
      existingData.images
    );

    // Handle single image (e.g., 'img' field)
    const updatedImg = handleSingleImage(req.files?.img, existingData.img);

    // Prepare updated fields with body data and updated image fields
    const updatedFields = {
      ...req.body,
      images: updatedImages,
      img: updatedImg,
    };

    // Update the data in the database
    const updatedData = await formModel.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    res.status(200).json({ msg: "Data updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ error: "Data not updated", message: error.message });
  }
};
