import * as yup from "yup";
const Validation = yup.object().shape({
  fullname: yup
    .string()
    .min(3, "Fullname must be at least 3 characters.")
    .required("Fullname is required."),
  nickname: yup
    .string()
    .min(5, "Nickname must be at least 4 characters.")
    .required("Nickname is required."),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters.")
    .required("Password is required."),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match.")
    .required("Password confirm is required."),
});

export default Validation;
