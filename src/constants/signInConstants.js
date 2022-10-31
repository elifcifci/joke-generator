export const signInConstants = [
  {
    id: "sing-in-name",
    label: "Name",
    name: "username",
    rules: [{ required: true, message: "Please input your name!" }],
  },
  {
    id: "sing-in-surname",
    label: "Surname",
    name: "surname",
    rules: [{ required: true, message: "Please input your surname!" }],
  },
  {
    id: "sing-in-password",
    label: "Password",
    name: "password",
    rules: [{ required: true, message: "Please input your password!" }],
  },
];
