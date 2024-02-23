import axios from "axios";

export const api = axios.create({
  baseURL: "https://desafio-fullstack-mauriliotn.onrender.com/",
  timeout: 5 * 1000,
});
