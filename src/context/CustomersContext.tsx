// src/context/CustomersContext.tsx

import React, { createContext, useState, useEffect, useContext } from "react";
import { getCustomers } from "../api/customers";
import { Customer } from "../api/types";
import { AuthContext } from "./AuthContext";

interface CustomersContextType {
  customers: Customer[];
  totalPages: number;
  loading: boolean;
  error: string | null;
  fetchCustomers: (page: number) => void;
}

export const CustomersContext = createContext<CustomersContextType | null>(
  null
);

export const CustomersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const authContext = useContext(AuthContext);

  const fetchCustomers = async (page: number) => {
    // Ensure authContext and user exist before making a request
    if (!authContext?.user?.id) {
      setError("User not found. Please log in.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const data = await getCustomers(authContext.user.id, page, 15); // Fetch customers with 15 per page
      setCustomers(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage); // Fetch customers when component mounts
  }, [currentPage]);

  return (
    <CustomersContext.Provider
      value={{
        customers,
        totalPages,
        loading,
        error,
        fetchCustomers,
      }}
    >
      {children}
    </CustomersContext.Provider>
  );
};
