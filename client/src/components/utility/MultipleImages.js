export const handleImageSelection = (e, imagesState, setImagesState) => {
  const files = Array.from(e.target.files);
  setImagesState((prevImages) => [...prevImages, ...files]);
};

export const handleSingleImageSelection = (e, setSingleImage) => {
  const file = e.target.files[0];
  setSingleImage(file);
};

export const handleImageDeletion = (index, imagesState, setImagesState) => {
  setImagesState((prevImages) => prevImages.filter((_, i) => i !== index));
};
