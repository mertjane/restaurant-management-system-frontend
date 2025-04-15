import { CustomerAnalyticsData, GetCustomerAnalyticsParams } from './../types/customers.types';
import { useMutation } from '@tanstack/react-query';
import { postCustomerAnalytics } from '../api/customers.api';

export const useGenerateCustomerAnalytics = () => {
  return useMutation<CustomerAnalyticsData[], Error, GetCustomerAnalyticsParams>({
    mutationFn: postCustomerAnalytics,
  });
};
