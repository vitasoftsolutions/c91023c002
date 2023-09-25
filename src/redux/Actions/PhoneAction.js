import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

// Get the JWT token from session storage
const token = sessionStorage.getItem("jwt_token");

export const fetchPhoneList = createAsyncThunk(
  "fetchPhoneList",
  async (page, { getState }) => {
    const { perPage } = getState().phoneReducers;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/phone/?limit=${perPage}&offset=${(page - 1) * perPage}`,
      {
        headers,
      }
    );

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;
    console.log(data, "phone data");
    const totalData = Math.ceil(response.data.count);
    const totalPages = Math.ceil(totalData / perPage);

    // Return the data and pagination information
    return {
      data,
      currentPage: page,
      totalPages,
      totalData,
    };
  }
);

// delete phone action
export const deletePhone = createAsyncThunk("deletePhone", async (payload) => {
  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const response = await axios.delete(`${base_url}/phone/${payload}/`, {
    headers,
  });

  // Return the data from the response
  return response.data;
});


// create the phone 
export const createPhone = createAsyncThunk(
    "createPhone",
    async (payload) => {
      try {
        const token = sessionStorage.getItem("jwt_token");
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
  
        const response = await axios.post(
          `${base_url}/phone/`,
          payload,
          { headers }
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to Create loan beneficiary");
      }
    }
  );