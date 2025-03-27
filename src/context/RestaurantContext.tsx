import React, { createContext, useState, useEffect, useContext } from "react";
import { getRestaurantDetails } from "../api/restaurant";
import { Restaurant } from "../api/types";
import { AuthContext } from "./AuthContext"; // Import AuthContext to get user

interface RestaurantContextType {
  restaurants: Restaurant[];
  fetchRestaurants: () => void;
}

export const RestaurantContext = createContext<RestaurantContextType>({
    restaurants: [],
    fetchRestaurants: () => {}, // Default empty function, can be updated later
  });
  

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(AuthContext)!; // Get user from AuthContext
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const fetchRestaurants = async () => {
    if (!user) return; // Ensure user exists before fetching

    try {
      const data = await getRestaurantDetails(user.id); // Fetch user restaurants
      setRestaurants(data);
    } catch (error: any) {
      console.error("Error fetching restaurants:", error.message);
    }
  };

  useEffect(() => {
    fetchRestaurants(); // Fetch restaurants when user is available
  }, [user]);


  return (
    <RestaurantContext.Provider value={{ restaurants, fetchRestaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
