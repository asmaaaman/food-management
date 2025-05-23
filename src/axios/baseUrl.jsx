import axios from "axios";
export const base_url = "https://upskilling-egypt.com:3006/api/v1";

export const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const USER_URLS = {
  login: `${base_url}/Users/login`,
  register: `${base_url}/Users/register`,
  users: base_url,
  delete: (id) => `${base_url}/Users/${id}`,
};

export const Categories_URLS = {
  categories: `${base_url}/Category`,
  delete: (id) => `${base_url}/Category/${id}`,
  update: (id) => `${base_url}/Category/${id}`,
};
