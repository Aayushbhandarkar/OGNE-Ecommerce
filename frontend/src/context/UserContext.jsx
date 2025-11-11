import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext);

  // ✅ Fetch currently logged-in user
  const getCurrentUser = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {
        withCredentials: true,
      });

      setUserData(result.data);
      console.log("Current User Loaded:", result.data);
    } catch (error) {
      // ✅ Handle common 400 error safely
      if (error.response?.status === 400) {
        console.warn("No active user session — user not logged in yet.");
      } else {
        console.error("getCurrentUser error:", error);
      }
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    loading,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
