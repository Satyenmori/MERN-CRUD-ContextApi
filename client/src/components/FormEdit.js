import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FormEdit = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const Navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing data
  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5050/formdata/${id}`
        );
        const data = response.data;
        setValue("name", data.name);
        setValue("location", data.location);
        setExistingImages(data.images || []);
        setSingleImage(data.img || null);
        console.log("single Img", data.img);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchFormData();
  }, [id, setValue]);

  // Handle multiple image selection
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle single image selection
  const handleSingleImg = (e) => {
    const file = e.target.files[0];
    setSingleImage(file);
  };

  // Handle image deletion (for existing images)
  const handleDeleteExistingImage = (imageToDelete) => {
    setExistingImages((prevImages) =>
      prevImages.filter((image) => image !== imageToDelete)
    );
  };

  // Handle image deletion (for newly selected images)
  const handleDeleteImage = (index) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);

      // Append newly selected images
      selectedImages.forEach((image) => formData.append("images", image));

      // Append remaining existing images
      existingImages.forEach((image) =>
        formData.append("existingImages", image)
      );

      if (singleImage) formData.append("img", singleImage);

      await axios.patch(`http://localhost:5050/formdata/edit/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form Data Updated Successfully");
      reset();
      setSelectedImages([]);
      setSingleImage(null);
      Navigate("/formdata");
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  return (
    <div className="container-fluid py-5 h-75">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-lg-6">
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    {...register("name", { required: true })}
                    placeholder="Name"
                  />
                  <label>Name</label>
                </div>
              </div>

              <div className="col-12">
                <div className="form-floating">
                  <input
                    className="form-control"
                    {...register("location", { required: true })}
                    placeholder="location"
                  ></input>
                  <label>Location</label>
                </div>
              </div>

              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="file"
                    className="form-control"
                    multiple
                    onChange={handleImage}
                  />
                  <label>Images</label>
                </div>
              </div>

              {/* Display existing images */}
              <div className="col-md-12 d-flex flex-wrap">
                {existingImages.map((image, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={`http://localhost:5050/${image}`}
                      alt={`Existing Image ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute end-0"
                      onClick={() => handleDeleteExistingImage(image)}
                    >
                      <i className="fa-solid fa-trash fa"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Display newly selected images */}
              <div className="col-md-12 d-flex flex-wrap">
                {selectedImages.map((image, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected Image ${index}`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute end-0"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <i className="fa-solid fa-trash fa"></i>
                    </button>
                  </div>
                ))}
              </div>

              <div className="col-md-12">
                <div className="form-floating">
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleSingleImg}
                  />
                  <label>Single Image</label>
                </div>
              </div>
              <div className="col-md-12 d-flex flex-wrap">
                {singleImage && (
                  <div className="position-relative">
                    <img
                      src={`http://localhost:5050/${singleImage}`}
                      alt={`Single Img`}
                      style={{
                        width: "100px",
                        height: "100px",
                        margin: "5px",
                      }}
                    />
                  </div>
                )}
              </div>
              {/* New Select Single IMG */}
              
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Update Form Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormEdit;
