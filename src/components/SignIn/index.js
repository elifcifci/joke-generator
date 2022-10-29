import React, { useContext } from "react";
import FormRenderer from "../FormRenderer";
import { signInConstants } from "../../constants/signInConstants";
import UserContext from "../../context/UserContext";

const SignIn = () => {
  const { updateIsUserRegistered } = useContext(UserContext);

  const initialValue = {
    fullname: "",
    nickname: "",
    password: "",
  };
  return (
    <div>
      <h1>Sign Ip</h1>
      <FormRenderer
        constants={signInConstants}
        initialValue={initialValue}
        handleClick={(values) => console.log(values)}
      />
    </div>
  );
};

export default SignIn;
