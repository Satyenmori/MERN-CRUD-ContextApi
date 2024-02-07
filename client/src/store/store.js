import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const AuthorizationToken = `Bearer ${token}`;

  //jwt token save.............
  const storeTokenLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  // all userdata save................

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5050/user/", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    userAuthentication();
  },[]);

  return (
    <AuthContext.Provider value={{ storeTokenLS,user,AuthorizationToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
