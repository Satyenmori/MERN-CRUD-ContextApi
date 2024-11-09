import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true); // used to page no need refress data get in contect page
  const [userContent, setUserContent] = useState({
    links: [],
    doc: [],
  });
  const [contentLoading, setContentLoading] = useState(true);
  const AuthorizationToken = `Bearer ${token}`;

  //jwt token save.............
  const storeTokenLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  // logout funcationality

  const logoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
    setUser("");
  };

  let isloggedin = !!token;

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
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserContent = async () => {
    try {
      setContentLoading(true);
      const response = await fetch("http://localhost:5050/api/content", {
        method: "GET",
        headers: {
          Authorization: AuthorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("content Data", data);
        setUserContent(data);
        console.log("state Cont Data", userContent);
      } else {
        console.error("Error fetching user content");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setContentLoading(false);
    }
  };

  useEffect(() => {
    if (isloggedin) {
      userAuthentication();
      fetchUserContent();
    } else {
      setIsLoading(false);
      setContentLoading(false); // If not logged in, no need to fetch user data
    }
  }, [isloggedin]);

  return (
    <AuthContext.Provider
      value={{
        storeTokenLS,
        user,
        AuthorizationToken,
        logoutUser,
        isloggedin,
        fetchUserContent,
        contentLoading,
        userContent,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
