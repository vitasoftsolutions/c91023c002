import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

//
//
//
//
//
export const createFloor = createAsyncThunk("createFloor", async (payload) => {
  // console.log(payload, "_____")
  try {
    const token = sessionStorage.getItem("jwt_token");
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    };

    const submittedData = { ...payload, status: true };

    const response = await axios.post(`${base_url}/floor/`, submittedData, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to Create loan beneficiary");
  }
});
//
//
//
//
export const fetchFloors = createAsyncThunk(
  "fetchFloors",
  async (projectID) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/floor/?id=${projectID}&limit=9999&offset=0`,
      { headers }
    );

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;

    console.log(data, "data");

    const totalData = Math.ceil(response.data.count);

    // Return the data and pagination information
    return {
      data,
      totalData,
    };
  }
);
//
//
//
//
export const fetchFloor = createAsyncThunk("fetchFloor", async (id) => {
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
  const response = await axios.get(`${base_url}/floor/${id}/`, {
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
export const deleteFloor = createAsyncThunk("deleteFloor", async (payload) => {
  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");

  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios PUT request with the headers and payload
  const response = await axios.delete(`${base_url}/floor/${payload}/`, {
    headers,
  });

  // Return the data from the response
  return response.status;
});
//
//
//
//
export const updateFloor = createAsyncThunk("updateFloor", async (payload) => {
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
    `${base_url}/floor/${payload.id}/`,
    payload.data,
    { headers }
  );

  // Return the data from the response
  return response.data;
});
//
//
//
//
export const searchFloor = createAsyncThunk(
  "searchFloor",
  async (firstName) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/floor/`;

      // Check if firstName is not empty, then append the search query
      if (firstName) {
        apiUrl += `?first_name=${firstName}`;
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

//
//
//
//
export const sortByDateFloor = createAsyncThunk(
  "sortByDateFloor",
  async (date) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/floor/`;

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
//
//
//
//
export const sortByAZFloor = createAsyncThunk(
  "sortByAZFloor",
  async (sortOrder) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/floor/`;

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
