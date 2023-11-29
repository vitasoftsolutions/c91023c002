import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

//
//
//
// https://erpcons.vitasoftsolutions.com/warehouse-items/
//
export const createWarehouseItems = createAsyncThunk(
  "createWarehouseItems",
  async (payload) => {
    // console.log(payload, "_____")
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const submittedData = { ...payload, status: true };

      const response = await axios.post(
        `${base_url}/warehouse-items/`,
        submittedData,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to Create WarehouseItems");
    }
  }
);
//
//
//
//
export const fetchWarehouseItemsList = createAsyncThunk(
  "fetchWarehouseItemsList",
  async (page, { getState }) => {
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    const { perPage } = getState().warehouseItemsReducer;

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/warehouse-items/?limit=${perPage}&offset=${
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
export const fetchWarehouseItemsAllList = createAsyncThunk(
  "fetchWarehouseItemsAllList",
  async (payload) => {
    console.log(payload, "payload")
    // Get the JWT token from session storage
    const token = sessionStorage.getItem("jwt_token");

    // Define the headers
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    // Make the Axios GET request with the headers
    const response = await axios.get(
      `${base_url}/warehouse-items/`,{headers});

    const response_token = response.data.results.token;
    const result = jwtDecode(response_token);

    const data = result.data;
    // Return the data and pagination information
    return {
      data,
    };
  }
);

//
//
//
//
export const fetchWarehouseItems = createAsyncThunk("fetchWarehouseItems", async (id) => {
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
  const response = await axios.get(`${base_url}/warehouse-items/${id}/`, {
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
export const deleteWarehouseItems = createAsyncThunk(
  "deleteWarehouseItems",
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
      `${base_url}/warehouse-items/${payload}/`,
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
export const updateWarehouseItems = createAsyncThunk(
  "updateWarehouseItems",
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
      `${base_url}/warehouse-items/${payload.id}/`,
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
export const searchWarehouseItems = createAsyncThunk(
  "searchWarehouseItems",
  async (firstName) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/warehouse-items/`;

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
export const sortByDateWarehouseItems = createAsyncThunk(
  "sortByDateWarehouseItems",
  async (date) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/warehouse-items/`;

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
export const sortByAZWarehouseItems = createAsyncThunk(
    "sortByAZWarehouseItems",
    async ({ sortOrder, page }, { getState }) => {
      const { perPage } = getState().loanBeneficiary;
      try {
        // Get the JWT token from session storage
        const token = sessionStorage.getItem("jwt_token");
  
        // Define the headers
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
  
        // Build the API URL with sorting and pagination parameters
        const apiUrl = `${base_url}/warehouse-items/?order=${sortOrder}&limit=${perPage}&offset=${(page - 1) * perPage}`;
  
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
        // Handle errors and return an appropriate message
        const errorMessage = (error.response && error.response.data) || error.message;
        throw new Error(errorMessage);
      }
    }
  );
  