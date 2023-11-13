import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

// List Projects
export const fetchTypes = createAsyncThunk("fetchTypes", async (payload) => {
  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");

  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios GET request with the headers
  const response = await axios.get(
    `${base_url}/types/?label_name=${payload}`,
    {
      headers,
    }
  );

  console.log(response);

  const response_token = response.data.results.token;
  const result = jwtDecode(response_token);

  const data = result.data;

  console.log(data, "data from type");

  // Return the data and pagination information
  return {
    data,
  };
});
