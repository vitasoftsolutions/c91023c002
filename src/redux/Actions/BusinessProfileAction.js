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
