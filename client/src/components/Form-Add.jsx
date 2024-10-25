import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  handleImageDeletion,
  handleImageSelection,
  handleSingleImageSelection,
} from "./utility/MultipleImages";

const FormAdd = () => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImages, setSelectedImages] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const Navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("location", data.location);

      selectedImages.forEach((image) => formData.append("images", image));
      if (singleImage) formData.append("img", singleImage);

      await axios.post("http://localhost:5050/formdata/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("New Test Data Added Successfully");
      reset();
      setSelectedImages([]);
      setSingleImage(null);
      Navigate("/formdata");
    } catch (error) {
      console.error("Error adding data", error);
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
                    onChange={(e) =>
                      handleImageSelection(e, selectedImages, setSelectedImages)
                    }
                  />
                  <label>Images</label>
                </div>
              </div>

              {/* Display selected images */}
              <div className="col-md-12 d-flex flex-wrap">
                {selectedImages.map((image, index) => (
                  <div key={index} className="position-relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected Image ${index}`}
                      style={{
                        width: "220px",
                        height: "110px",
                        margin: "5px",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute end-0"
                      onClick={() =>
                        handleImageDeletion(
                          index,
                          selectedImages,
                          setSelectedImages
                        )
                      }
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
                    onChange={(e) =>
                      handleSingleImageSelection(e, setSingleImage)
                    }
                  />
                  <label>Single Image</label>
                </div>
              </div>
              {/* Display selected Single images */}
              <div className="col-md-12 d-flex flex-wrap">
                {singleImage && (
                  <div className="position-relative">
                    <img
                      src={URL.createObjectURL(singleImage)}
                      alt="Single Image"
                      style={{
                        width: "220px",
                        height: "110px",
                        margin: "5px",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-danger btn-sm position-absolute end-0"
                      onClick={() => setSingleImage(null)}
                    >
                      <i className="fa-solid fa-trash fa"></i>
                    </button>
                  </div>
                )}
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Add Testing Data
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAdd;
