import React, { createContext, useState, useEffect, useContext } from "react";
import { userList } from "../constants/usersListConstant";
import { message } from "antd";
import FactsContext from "./FactsContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([...userList]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { factsInSaved, setFactsInSaved } = useContext(FactsContext);

  useEffect(() => {
    //users initiala dönmemesi için kayıtlı user varsa localstoragedan veri çekiyorum.
    JSON.parse(localStorage.getItem("users")) &&
      setUsers([...JSON.parse(localStorage.getItem("users"))]);

    //localde kayıtlı user yoksa çalışır
    localStorage.getItem("users") === null &&
      localStorage.setItem("users", JSON.stringify(users));

    if (localStorage.getItem("currentUser")) {
      setCurrentUser({ ...JSON.parse(localStorage.getItem("currentUser")) });
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    console.log("users: ", users);

    //saves users to localstorage when sign up or sign in is done.
    localStorage.getItem("currentUser") &&
      localStorage.setItem("users", JSON.stringify(users));
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
        //All users except the current user.
        let temporary = [
          ...users.slice(0, index),
          ...users.slice(index + 1, users.length),
        ];

        //Added joke list to copy of currentUser. (Not saved in localstorage.)
        let copyCurrent = { ...currentUser };
        copyCurrent.savedFacts = factsInSaved;

        //jokes recorded by the current user, added users state
        temporary.push(copyCurrent);
        setUsers(temporary);

        return;
      }
    });
  }, [factsInSaved]);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    setFactsInSaved([]);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("saved-facts");
    localStorage.removeItem("isLoggedIn");
  };

  const signIn = (data) => {
    setIsLoggedIn(true);
    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));

    let filteredUser = users.filter((user) => {
      return user.username === data.username && user.password === data.password;
    });

    if (filteredUser[0].savedFacts !== undefined) {
      setFactsInSaved([...filteredUser[0].savedFacts]);
    }
  };

  const signUp = (userKnowledge) => {
    userKnowledge.id = users.length;
    delete userKnowledge.confirm;
    setIsLoggedIn(true);
    setCurrentUser(userKnowledge);
    setUsers((previous) => [...previous, userKnowledge]);
    localStorage.setItem("currentUser", JSON.stringify(userKnowledge));
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
