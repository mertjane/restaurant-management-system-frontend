import { useQuery } from '@tanstack/react-query';
import { fetchRestaurant } from '../api/restaurant';


export const useRestaurant = (userId: number) => {

     return useQuery({
          queryKey: ['restaurant', userId],
          queryFn: () => fetchRestaurant(userId),
          enabled: !!userId, // avoids running if userId is undefined or 0
          staleTime: 1000 * 60 * 5, // 5 minutes
          retry: 1,
     });
};
