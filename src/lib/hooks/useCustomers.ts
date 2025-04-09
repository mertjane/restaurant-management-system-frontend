import { useQuery } from "@tanstack/react-query";
import { getCustomersByUserId, searchCustomerByName, sortCustomers } from "../api/customers.api";
import { CustomerResponse } from "../types/customers.types";

import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useRestaurant } from "./useRestaurant";
import { getSortParams } from "../utils/customer.utils";

export const useCustomers = (page: number, size: number, searchTerm?: string) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const sort = useSelector((state: RootState) => state.sort.value);
  const { data: restaurant } = useRestaurant();
  const restaurantId = restaurant?.[0]?.id;

  

  return useQuery<CustomerResponse, Error>({
    queryKey: ["customers", restaurantId, userId, page, size, searchTerm, sort],
    queryFn: () => {
      if (searchTerm && searchTerm.trim() !== "") {
        return searchCustomerByName({
          restaurantId: restaurantId!,
          searchTerm,
          page,
          size,
        });
      } else if (sort) {
        const { sortBy, direction } = getSortParams(sort);
        return sortCustomers({
          userId: userId!,
          page,
          size,
          sortBy,
          direction,
        });
      } else {
        return getCustomersByUserId({
          userId: userId!,
          page,
          size,
        });
      }
    },
    enabled: !!userId,

  });
};
