import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://pawmart-server301.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};
export default useAxios;
