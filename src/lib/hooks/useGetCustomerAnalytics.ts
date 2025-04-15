import { CustomerAnalyticsData, GetCustomerAnalyticsParams } from './../types/customers.types';
import { useQuery } from '@tanstack/react-query';
import { getCustomerAnalytics } from '../api/customers.api';


export const useGetCustomerAnalytics = (
  params: GetCustomerAnalyticsParams,
  enabled: boolean = true
) => {
  return useQuery<CustomerAnalyticsData, Error>({
    queryKey: ['customerAnalytics', params.restaurantId, params.currentMonth],
    queryFn: () => getCustomerAnalytics(params),
    enabled,
  });
};
