import React from "react";
import "./order.component.scss";
import { useOrdersQuery } from "../../../lib/hooks/useOrdersQuery";

const OrdersLayer = () => {
  const { data: orders, isLoading, error } = useOrdersQuery();

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Failed to load orders.</p>;

  return (
    <>
      {orders?.map((o) => (
        <div className="orders-wrapper" key={o.id}>
          <h3 className="text-lg font-semibold">Order #{o.id}</h3>
          <p>Status: {o.status}</p>
          <p>Total: £{o.orderDetails.total_price.toFixed(2)}</p>
          <p>Created: {new Date(o.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </>
  );
};

export default OrdersLayer;
