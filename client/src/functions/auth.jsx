import axios from "axios";

export const register = async (data) => {
  return await axios.post(process.env.REACT_APP_API + "/register", data);
};

export const login = async (data) => {
  return await axios.post(process.env.REACT_APP_API + "/login", data);
};

