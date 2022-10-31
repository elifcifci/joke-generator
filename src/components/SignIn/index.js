import React, { useContext } from "react";
import FormRenderer from "../FormRenderer";
import { signInConstants } from "../../constants/signInConstants";
import UserContext from "../../context/UserContext";

const SignIn = () => {
  const { updateIsUserRegistered } = useContext(UserContext);

  return (
    <div>
      <FormRenderer
        constants={signInConstants}
        handleClick={(values) => console.log(values)}
      />
    </div>
  );
};

export default SignIn;
