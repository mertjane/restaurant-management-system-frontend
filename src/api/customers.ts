import axios from "axios";
import { CustomerResponse } from "./types";

import * as dotenv from 'dotenv';

dotenv.config();



/** GET LOGGED IN USER CUSTOMERS FROM DB */
export const getCustomers = async (userId: number, page: number, size: number): Promise<CustomerResponse> => {

  
  try {
    const response = await axios.get(`${process.env.API_BASE_URL}/customers/user/${userId}?page=${page - 1}&size=${size}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch customers");
  }
};
