import React, { useContext } from "react";
import { signUpConstants } from "../../constants/signUpConstants";
import UserContext from "../../context/UserContext";
import FormRenderer from "../FormRenderer";

const SignUp = () => {
  const { addNewUsers } = useContext(UserContext);

  return (
    <div>
      <FormRenderer
        constants={signUpConstants}
        handleClick={(values) => addNewUsers(values)}
      />
    </div>
  );
};

export default SignUp;
