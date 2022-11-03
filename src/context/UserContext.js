import React, { createContext, useState, useEffect } from "react";
import { userList } from "../constants/usersListConstant";
import { message } from "antd";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([...userList]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    JSON.parse(localStorage.getItem("users")) &&
      JSON.parse(localStorage.getItem("users")).length !== 2 &&
      setUsers([...JSON.parse(localStorage.getItem("users"))]);

    localStorage.getItem("users") === null &&
      localStorage.setItem("users", JSON.stringify(users));

    console.log(localStorage.getItem("currentUser"));

    localStorage.getItem("currentUser") && setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    users.length !== 2 && localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    localStorage.getItem("isLoggedIn") !== null &&
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {}, [currentUser]);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("currentUser");
  };

  const addNewUsers = (userKnowledge) => {
    userKnowledge.id = users.length;
    delete userKnowledge.confirm;
    signIn(userKnowledge);
    setUsers((previous) => [...previous, userKnowledge]);
  };

  // sagnIn olunca gerceklesecek adimler
  const signIn = (data) => {
    setIsLoggedIn(true);
    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
  };

  // signIn yapilip yapilamacagina burasi karar veriyor
  const updateIsUserRegistered = (userKnowledge) => {
    const result = users.filter((user) => {
      return (
        user.username === userKnowledge.username &&
        user.surname === userKnowledge.surname &&
        user.password === userKnowledge.password
      );
    });
    {
      result.length > 0
        ? signIn(userKnowledge)
        : message.error("Your name or password is incorrect.");
    }
  };

  const values = {
    addNewUsers,
    updateIsUserRegistered,
    signIn,
    logout,
    isLoggedIn,
    currentUser,
    users,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
