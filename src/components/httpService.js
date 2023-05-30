import axios from "axios";
const baseURL = "http://localhost:2450";
function get(url) {
  return axios.get(baseURL + url);
}
function post(url, obj) {
  return axios.post(baseURL + url, obj);
}
function put(url, obj) {
  return axios.put(baseURL + url, obj);
}
function deleteReq(url) {
  return axios.delete(baseURL + url);
}

export default { get, post, put, deleteReq };
