import React, { createContext, useState, useEffect, useContext } from "react";
import { userList } from "../constants/usersListConstant";
import { message } from "antd";
import FactsContext from "./FactsContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([...userList]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { factsInSaved } = useContext(FactsContext);

  useEffect(() => {
    JSON.parse(localStorage.getItem("users")) &&
      JSON.parse(localStorage.getItem("users")).length !== 2 &&
      setUsers([...JSON.parse(localStorage.getItem("users"))]);

    localStorage.getItem("users") === null &&
      localStorage.setItem("users", JSON.stringify(users));

    if (localStorage.getItem("currentUser")) {
      setCurrentUser({ ...JSON.parse(localStorage.getItem("currentUser")) });
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    users.length !== 2 && localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    (localStorage.getItem("isLoggedIn") !== null || isLoggedIn) &&
      localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    users.forEach((item, index) => {
      if (
        item.username === currentUser.username &&
        item.surname === currentUser.surname &&
        item.password === currentUser.password
      ) {
        let copyUsers = [...users];
        let temp = [
          ...copyUsers.slice(0, index),
          ...copyUsers.slice(index + 1, copyUsers.length),
        ];
        // yenilenen currenti ekle
        let copyCurrent = { ...currentUser };
        copyCurrent.savedFacts = factsInSaved;
        setCurrentUser(copyCurrent);
        temp.push(copyCurrent);
        setCurrentUser(copyCurrent);
        setUsers(temp);
      }
    });
    localStorage.setItem("users", JSON.stringify(users));
  }, [factsInSaved]);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});

    localStorage.removeItem("currentUser");
    localStorage.removeItem("saved-facts");
    localStorage.removeItem("isLoggedIn");
  };

  const signIn = (data) => {
    setIsLoggedIn(true);
    setCurrentUser(data);
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(data));
  };

  const signUp = (userKnowledge) => {
    userKnowledge.id = users.length;
    delete userKnowledge.confirm;
    setIsLoggedIn(true);
    setUsers((previous) => [...previous, userKnowledge]);
  };

  // This is where it's decided whether to signIn or signUp.
  const isUserRegistered = (userKnowledge, target, setIsModalOpen) => {
    const isSignIn = target === "signIn";
    const isSignUp = target === "signUp";

    const filteredUser = users.filter((user) => {
      return isSignIn
        ? user.username === userKnowledge.username &&
            user.password === userKnowledge.password
        : user.username === userKnowledge.username;
    });

    if (isSignIn && filteredUser[0] !== undefined) {
      setIsModalOpen(false);
      signIn(userKnowledge);
    } else if (isSignIn && filteredUser[0] === undefined) {
      setIsModalOpen(true);
      message.error("Your name or password is incorrect.");
    }

    if (isSignUp && filteredUser[0] === undefined) {
      setIsModalOpen(false);
      signUp(userKnowledge);
    } else if (isSignUp && filteredUser[0] !== undefined > 0) {
      setIsModalOpen(true);
      message.error("This username is taken. Try another username.");
    }
  };

  const values = {
    isLoggedIn,
    currentUser,
    users,
    signIn,
    logout,
    isUserRegistered,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
