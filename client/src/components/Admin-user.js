import { useEffect, useState } from "react";
import { useAuth } from "../store/store";
import{Link} from "react-router-dom"

export const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const { AuthorizationToken } = useAuth();

  const getAllUserData = async () => {
    try {
      const response = await fetch("http://localhost:5050/admin/user", {
        method: "GET",
        headers: { Authorization: AuthorizationToken },
      });
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete user ById

  const deleteUserbyID = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5050/admin/user/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: AuthorizationToken },
        }
      );
      const data = await response.json();
      if (response.ok) {
        getAllUserData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUserData();
  }, []);
  return (
    <>
      <div className="adminuser-heding container  w-50">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">User name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="edit">
                    <Link to={`/admin/users/update/${user._id}/edit`}>
                      <i className="fa-regular fa-pen-to-square"></i>
                    </Link>

                    <button
                      className="delete"
                      onClick={() => deleteUserbyID(user._id)}
                    >
                      <i className="fa-solid fa-trash fa"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
