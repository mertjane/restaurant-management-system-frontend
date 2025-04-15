import React from "react";
import "./order.component.scss";
import { IoReceiptOutline } from "react-icons/io5";
import { GiSandsOfTime } from "react-icons/gi";
import { FaMedal } from "react-icons/fa";
import { MdOutlineFastfood } from "react-icons/md";

const OrderSummary = () => {
  return (
    <div className="summary-wrapper">
      <div className="active-orders-container">
        <div className="icon-wrapper">
          <IoReceiptOutline size={40} className="order-icon" />
        </div>
        <div className="description">
          <h4>Active Orders</h4>
          <strong>5</strong>
        </div>
      </div>
      <div className="pending-orders-container">
        <div className="icon-wrapper">
          <GiSandsOfTime size={40} className="pending-icon" />
        </div>
        <div className="description">
          <h4>Pending Orders</h4>
          <strong>3</strong>
        </div>
      </div>
      <div className="top-item-container">
        <div className="icon-wrapper">
          <FaMedal size={40} className="medal-icon" />
        </div>
        <div className="description">
          <h4>Top Items</h4>
          <strong>Burger</strong>
        </div>
      </div>
      <div className="total-container">
        <div className="icon-wrapper">
          <MdOutlineFastfood size={40} className="total-icon" />
        </div>
        <div className="description">
          <h4>Today's Total</h4>
          <strong>16</strong>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
