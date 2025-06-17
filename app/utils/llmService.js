// Note: Code taken from the frontend file services.js and
//  modified to send REST API requests to the LLM service
const axios = require("axios");

var baseurl = "https://api.cohere.com/v2/";

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // "X-Requested-With": "XMLHttpRequest",
    // "Access-Control-Allow-Origin": "*",
    "Authorization": "bearer " + process.env.COHERE_API_KEY,
    crossDomain: true,
  },
});


module.exports = apiClient;