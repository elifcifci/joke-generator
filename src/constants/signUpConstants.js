export const signUpConstants = [
  {
    id: "sing-up-name",
    label: "Fullname",
    name: "name",
    rules: [{ required: true, message: "Please input your name!" }],
  },
  {
    id: "sing-up-username",
    label: "Username",
    name: "username",
    rules: [{ required: true, message: "Please input your username!" }],
  },
  {
    id: "sing-up-password",
    label: "Password",
    name: "password",
    rules: [{ required: true, message: "Please input your password!" }],
  },
  {
    id: "sing-up-password-confirm",
    label: "Confirm Password",
    name: "confirm",
    rules: [
      {
        required: true,
        message: "Please confirm your password!",
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error("The two passwords that you entered do not match!")
          );
        },
      }),
    ],
  },
];
