import React, { createContext, useState, useEffect, useContext } from "react";
import { message } from "antd";
import FactsContext from "./FactsContext";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { factsInSaved, setFactsInSaved } = useContext(FactsContext);

  useEffect(() => {
    //If there is a registered user so that users do not return to initial, I pull data from localStorage.
    JSON.parse(localStorage.getItem("users")) &&
      setUsers([...JSON.parse(localStorage.getItem("users"))]);

    //isLoggedIn should be true as long as currentUser is registered in localStorage.
    //CurrentUser is deleted from localStorage only when the user clicks logout.
    if (localStorage.getItem("currentUser")) {
      setCurrentUser({ ...JSON.parse(localStorage.getItem("currentUser")) });
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    users.forEach((item, index) => {
      if (item.username === currentUser.username) {
        //All users except the current user.
        let temporary = [
          ...users.slice(0, index),
          ...users.slice(index + 1, users.length),
        ];

        //Added joke list to copy of currentUser. (Not saved in localStorage.)
        let copyCurrent = { ...currentUser };
        copyCurrent.savedFacts = factsInSaved;

        //jokes recorded by the current user, added users state
        temporary.push(copyCurrent);
        setUsers(temporary);
        localStorage.setItem("users", JSON.stringify(temporary));

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

    if (filteredUser[0].savedFacts) {
      setFactsInSaved([...filteredUser[0].savedFacts]);
    }
  };

  const signUp = (userKnowledge) => {
    userKnowledge.id = users.length;
    delete userKnowledge.confirm;
    setIsLoggedIn(true);
    localStorage.setItem("currentUser", JSON.stringify(userKnowledge));
    localStorage.setItem("users", JSON.stringify([...users, userKnowledge]));
    setCurrentUser(userKnowledge);
    setUsers((previous) => [...previous, userKnowledge]);
  };

  // This is where it's decided whether to signIn or signUp.
  const checkUserRegistered = (userKnowledge, target, setIsModalOpen) => {
    const isSignIn = target === "signIn";
    const isSignUp = target === "signUp";

    const filteredUser = users.filter((user) => {
      return isSignIn
        ? user.username === userKnowledge.username &&
            user.password === userKnowledge.password
        : user.username === userKnowledge.username;
    });

    if (isSignIn && filteredUser[0]) {
      setIsModalOpen(false);
      signIn(userKnowledge);
    } else if (isSignIn && !filteredUser[0]) {
      message.error("Your name or password is incorrect.");
    }

    if (isSignUp && !filteredUser[0]) {
      setIsModalOpen(false);
      signUp(userKnowledge);
    } else if (isSignUp && filteredUser[0] > 0) {
      message.error("This username is taken. Try another username.");
    }
  };

  const values = {
    isLoggedIn,
    currentUser,
    users,
    signIn,
    logout,
    checkUserRegistered,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export default UserContext;
