import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

//
//
//
//
//
export const createBusinessProfile = createAsyncThunk(
  "createBusinessProfile",
  async (payload) => {
    // console.log(payload, "_____")
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${base_url}/____/`,
        payload,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to Create loan beneficiary");
    }
  }
);
//
//
//
//
export const fetchBusinessProfileList = createAsyncThunk(
  "fetchBusinessProfileList",
  async (page, { getState }) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    const { perPage } = getState().loanBeneficiary;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/loan-beneficaries/?limit=${perPage}&offset=${
        (page - 1) * perPage
      }`,
      {
        headers,
      }
    );

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;

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
//
//
//
//
export const fetchBusinessProfile = createAsyncThunk("fetchBusinessProfile", async (id) => {
  console.log("getState()");
  console.log(id, "getState()");

  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");
  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios GET request with the headers
  const response = await axios.get(`${base_url}/loan-beneficaries/${id}/`, {
    headers,
  });

  const data = response.data;

  console.log(data, "data__");

  // Return the data 
  return { data };
});

//
//
//
//
export const deleteBusinessProfile = createAsyncThunk(
  "deleteBusinessProfile",
  async (payload) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios PUT request with the headers and payload
    const response = await axios.delete(
      `${base_url}/loan-beneficaries/${payload}/`,
      { headers }
    );

    // Return the data from the response
    return response.status;
  }
);
//
//
//
//

export const updateBusinessProfile = createAsyncThunk(
  "updateBusinessProfile",
  async (payload) => {
    console.log(payload, "payload");
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios PUT request with the headers and payload
    const response = await axios.patch(
      `${base_url}/loan-beneficaries/${payload.id}/`,
      payload.data,
      { headers }
    );

    // Return the data from the response
    return response.data;
  }
);
//
//
//
//