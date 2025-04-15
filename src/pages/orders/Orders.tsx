import React from "react";
import OrdersLayer from "../../components/dashboard/orders/OrdersLayer";
import "./orders.scss";
import OrderSummary from "../../components/dashboard/orders/OrderSummary";


const Orders = () => {
  return (
    <div className="order-container">
      <OrderSummary />
      <OrdersLayer />
    </div>
  );
};

export default Orders;
