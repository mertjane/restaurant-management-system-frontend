export interface OrderDetails {
  cold_starters: string[];
  hot_starters: string[];
  mains: string[];
  sides: string[];
  drinks: string[];
  total_price: number;
}

export interface OrdersResponseData {
  id: number;
  restaurantId: number;
  orderDetails: OrderDetails;
  status: string;
  createdAt: string;
  updatedAt: string;
}
