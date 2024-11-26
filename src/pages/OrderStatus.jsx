import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrderStatus } from "../Redux/orderStatusSlice";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
export const OrderStatus = () => {
  const navigate = useNavigate();
  const orderStatus = useSelector((state) => state.orderStatus);
  const dispatch = useDispatch();
  const clearStatus = () => {
    if (orderStatus === "success") {
      navigate("/orders");
    } else {
      navigate("/models");
    }
    dispatch(clearOrderStatus());
  };
  return (
    <div className="h-[100vh] flex items-center justify-center bg-[#e6e6e6]">
      {orderStatus.status === "success" && (
        <div className="flex flex-col items-center">
          <p className="text-center text-xl font-bold">{orderStatus.message}</p>
          <p className="text-sm text-red-600">
            Our team will contact you soon.
          </p>

          <div className="w-[70%] m-auto">
            <img src="/images/success.webp" className="w-full" />
          </div>

          <Button onClick={clearStatus} colorScheme="orange" marginTop={"15px"}>
            Go to Orders
          </Button>
        </div>
      )}
      {orderStatus.status === "error" && (
        <div>
          <p>{orderStatus.message}</p>
          <button onClick={clearStatus}>Try Again</button>
        </div>
      )}
      {/* Your other component code */}
    </div>
  );
};
