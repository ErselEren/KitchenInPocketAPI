import React, { createContext, useState } from 'react';

export const UserContext = createContext({
  userId: null,
  userToken: null, // Add userToken here
  setUserId: () => {},
  setUserToken: () => {}, // Add setUserToken here
});

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null); // Initialize userToken state

  return (
    <UserContext.Provider value={{ userId, userToken, setUserId, setUserToken }}>
      {children}
    </UserContext.Provider>
  );
};
