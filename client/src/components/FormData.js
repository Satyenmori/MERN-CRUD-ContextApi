import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const FormData = () => {
  const [test, setTest] = useState([]);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:5050/formdata");      
      const data = await response.json();      
      setTest(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  // Delete Rooms

  const deleterooms = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5050/formdata/delete/${id}`,
        {
          method: "delete",
        }
      );
      if (response.ok) {
        alert("Data Delete SuccessFuly");
        fetchRooms();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  }, []);
  return (
    <>
      <div classNameName="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h1 className="mb-5 mt-2">
              Explore Our{" "}
              <span className="text-primary text-uppercase">Form Data</span>
            </h1>
            <div className="col-md-2">
              <Link
                className="btn btn-sm btn-success rounded py-2 px-4 mb-2"
                to="/addform"
              >
                Add New Form Data
              </Link>
            </div>
          </div>
          <div className="row g-4">
            {test.map((data) => (
              <div
                key={data._id}
                className="col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="room-item shadow rounded overflow-hidden">
                  <div className="position-relative">
                    <img
                      className="img-fluid room-image"
                      src={`http://localhost:5050/${data.images[0]}`}
                      alt="img 1"
                    />
                  </div>
                  <div className="p-4 mt-2">
                    <div className="d-flex justify-content-between mb-3">
                      <h5 className="mb-0">{data?.name}</h5>
                    </div>

                    <p className="text-body mb-3">{data?.location}</p>
                    <div className="d-flex justify-content-between">
                      <Link
                        className="btn btn-sm btn-success rounded py-2 px-4"
                        to={`/edit/${data._id}`}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-sm btn-primary rounded py-2 px-4"
                        to={`/edit/${data._id}`}
                      >
                        View Detail
                      </Link>
                      <Link
                        className="btn btn-sm btn-danger rounded py-2 px-4"
                        to="#"
                        onClick={() => deleterooms(data._id)}
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FormData;
