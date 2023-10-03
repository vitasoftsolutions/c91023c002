import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

export const fetchPhoneList = createAsyncThunk(
  "fetchPhoneList",
  async (page, { getState }) => {
    const { perPage } = getState().phoneReducers;

    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

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

  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");

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
export const createPhone = createAsyncThunk("createPhone", async (payload) => {
  try {
    const token = sessionStorage.getItem("jwt_token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${base_url}/phone/`, payload, {
      headers,
    });
    return response;
  } catch (error) {
    throw new Error("Failed to Create loan beneficiary");
  }
});

// update the phone
export const updatePhone = createAsyncThunk("createPhone", async (payload) => {
  try {
    const token = sessionStorage.getItem("jwt_token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.patch(
      `${base_url}/phone/${payload.id}/`,
      payload,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Create loan beneficiary");
  }
});

// Search by name
export const searchPhoneByName = createAsyncThunk(
  "searchPhoneByName",
  async (firstName) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/phone/?name=${firstName}`;
      
      // Make the Axios GET request with the headers
      const response = await axios.get(apiUrl, {
        headers,
      });

      const response_token = response.data.results.token;
      const result = jwtDecode(response_token);

      const data = result.data;
      // Return the data
      return data;
    } catch (error) {
      const massage = (error.response && error.response.data) || error.massage;
      return massage;
    }
  }
);

// Sort by date  
export const sortByDatePhone = createAsyncThunk(
  "sortByDatePhone",
  async (date) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/phone/`;

      // Check if date is not empty, then append the search query
      if (date) {
        apiUrl += `?created_at=${date}`;
      }
      
      // Make the Axios GET request with the headers
      const response = await axios.get(apiUrl, {
        headers,
      });

      const response_token = response.data.results.token;
      const result = jwtDecode(response_token);

      const data = result.data;
      // Return the data
      return data;
    } catch (error) {
      const massage = (error.response && error.response.data) || error.massage;
      return massage;
    }
  }
);

// Sort By A-Z Phone
export const sortByAZPhone = createAsyncThunk(
  "sortByAZPhone",
  async (sortOrder) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/phone/`;

      // Check if sortOrder is not empty, then append the search query
      if (sortOrder) {
        apiUrl += `?order=${sortOrder}`;
      }
      
      // Make the Axios GET request with the headers
      const response = await axios.get(apiUrl, {
        headers,
      });

      const response_token = response.data.results.token;
      const result = jwtDecode(response_token);

      const data = result.data;
      // Return the data
      return data;
    } catch (error) {
      const massage = (error.response && error.response.data) || error.massage;
      return massage;
    }
  }
);

