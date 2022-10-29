import React, { useContext } from "react";
import { signUpConstants } from "../../constants/signUpConstants";
import UserContext from "../../context/UserContext";
import FormRenderer from "../FormRenderer";

const SignUp = () => {
  const { addNewUsers } = useContext(UserContext);
  const initialValue = {
    fullname: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <FormRenderer
        constants={signUpConstants}
        initialValue={initialValue}
        handleClick={(values) => addNewUsers(values)}
      />
    </div>
  );
};

export default SignUp;
