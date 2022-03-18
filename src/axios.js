import axios from "axios";

const instance = axios.create({
  baseURL: "https://immense-harbor-60117.herokuapp.com/",
});

export default instance;
