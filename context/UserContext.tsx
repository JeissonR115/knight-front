// UserContext.js
import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <UserContext.Provider value={{ name, setName, lastName, setLastName }}>
      {children}
    </UserContext.Provider>
  );
};
