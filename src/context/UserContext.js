import React, { createContext, useState, useEffect } from "react";
import { userList } from "../constants/usersListConstant";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([...userList]);
  const [isVisibleWebSite, setIsVisibleWebSite] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    JSON.parse(localStorage.getItem("users")).length !== 4 &&
      setUsers([...JSON.parse(localStorage.getItem("users"))]);
  }, []);

  useEffect(() => {
    users.length !== 5 && localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addNewUsers = (userKnowledge) => {
    userKnowledge.id = users.length;
    delete userKnowledge.passwordConfirm;
    setUsers((previous) => [...previous, userKnowledge]);
    setIsVisibleWebSite(true);
  };

  const updateIsUserRegistered = (userKnowledge) => {
    console.log("deneme");
    console.log(userKnowledge);
    // const result = users.filter((user) => {
    //   console.log("user: ", user);
    //   console.log("userKnowledge: ", userKnowledge);
    //   return user == userKnowledge;
    // });
    // console.log("result: ", result);
    // setIsUserRegistered((previous) => !previous);
  };

  const values = {
    addNewUsers,
    updateIsUserRegistered,
    users,
    isVisibleWebSite,
    isUserRegistered,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
