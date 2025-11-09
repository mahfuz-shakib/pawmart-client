import { toast } from "react-toastify";

export const formValidation = ({ name, email, password, confirmPassword }) => {
  let error = "";
  const namePattern = /^[A-Za-z_][A-Za-z0-9._\s]*$/;
  const upparCasePattern = /(?=.*[A-Z])/;
  const lowerCasePattern = /(?=.*[a-z])/;
  console.log(name,email,password);
  if (!name.trim()) {
    error = "Name is required";
  } else if (name.length < 3) {
    error = "Name must be at least 3 character";
  } else if (!namePattern.test(name)) {
    error = "Name must start with a letter or underscore";
  } else if (!email) {
    error = "Email is missing";
  } else if (password.length == 0) {
    error = "Password is missing";
  } else if (password.length < 6) {
    error = "Password must be 6 character or longer";
  } else if (!upparCasePattern.test(password)) {
    error = "Password must have atleast one uppercase letter";
  } else if (!lowerCasePattern.test(password)) {
    error = "Password must have atleast one lowercase letter";
  } else if (password !== confirmPassword) {
    error = "Confirmed Password not matched";
  }
console.log(error);
  if (error) {
    toast.error(error);
  }
  return error;
};
