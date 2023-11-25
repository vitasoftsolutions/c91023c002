import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { base_url } from "../../Components/shared/Url";

//
//
//
//
//
export const createLoanBen = createAsyncThunk(
  "createLoanBeneficiary",
  async (payload) => {
    // console.log(payload, "_____")
    try {
      const token = sessionStorage.getItem("jwt_token");
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        `${base_url}/incomes/`,
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
export const fetchLoanBeneList = createAsyncThunk(
  "fetchLoanBeneList",
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
      `${base_url}/incomes/?limit=${perPage}&offset=${(page - 1) * perPage
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
    console.log("responseddata", data)
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
export const fetchLoanBene = createAsyncThunk("fetchLoanBene", async (id) => {
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
  const response = await axios.get(`${base_url}/incomes/${id}/`, {
    headers,
  });

  const data = response.data;

  console.log(data, "data__");

  // Return the data 
  return { data };
});





export const contractorben = createAsyncThunk("contractorben", async () => {


  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");
  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios GET request with the headers
  const response = await axios.get(`${base_url}/incomes/`, {
    headers,
  });

  const response_token = response.data.results.token;

  const result = jwtDecode(response_token);

  const data = result.data;

  console.log(data, "data__");

  // Return the data 
  return { data };
});



export const projectlist = createAsyncThunk("projectlist", async () => {


  // Get the JWT token from session storage
  const token = sessionStorage.getItem("jwt_token");
  // Define the headers
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Make the Axios GET request with the headers
  const response = await axios.get(`${base_url}/projects/`, {
    headers,
  });

  const response_token = response.data.results.token;

  const result = jwtDecode(response_token);

  const data = result.data;

  console.log(data, "data__");

  //contractor
  const response2 = await axios.get(`${base_url}/contructor-beneficaries/`, {
    headers,
  });

  const response_token2 = response2.data.results.token;

  const result2 = jwtDecode(response_token2);

  const data2 = result2.data;
  console.log("data2: ",data2)
  // Return the data 
  return { 
    "project_data":data,
    "con_data":data2 
  };
});
//
//
//
//
export const deleteLoanBeneficiary = createAsyncThunk(
  "deleteLoanBeneficiary",
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
      `${base_url}/incomes/${payload}/`,
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
export const updateLoanBeneficiary = createAsyncThunk(
  "updateLoanBeneficiary",
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
      `${base_url}/incomes/${payload.id}/`,
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
export const searchLoanBeneficiaries = createAsyncThunk(
  "searchLoanBeneficiaries",
  async (firstName) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/incomes/`;

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
export const sortByDateLoanBen = createAsyncThunk(
  "sortByDateLoanBen",
  async (date) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/incomes/`;

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
export const sortByAZLoanBen = createAsyncThunk(
  "sortByAZLoanBen",
  async (sortOrder) => {
    try {
      // Get the JWT token from session storage
      const token = sessionStorage.getItem("jwt_token");

      // Define the headers
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      let apiUrl = `${base_url}/incomes/`;

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