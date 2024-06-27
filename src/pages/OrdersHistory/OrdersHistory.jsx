import cls from "./style.module.scss";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderServices from "../../services/orderServices";
import telegramIdService from "../../services/telegramIdService";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import formatNumbers from "../../utils/formatNumbers";
import { useQuery } from "react-query";


const fetchCustomerDetails = async (id) => {
  const response = await telegramIdService.getById(id);
  return response.data;
}

const fetchCustomerOrdersHistory = async (customerId) => {
  const response = await orderServices.getList({ customerId })
  return response.data 
}

function OrdersHistory() {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [customerDetails, setCustomerDetails] = useState([]);
  // const [customerOrdersHistory, setCustomerOrdersHistory] = useState([]);



  const {data: customerDetails, status: customerDetailsStatus}  = useQuery({
    queryKey: ["customerDetails", id],
    queryFn: () => fetchCustomerDetails(id),
     staleTime: 3000,
     enabled: !!id
  })


  const {data: customerOrdersHistory, status: customerOrdersHistoryStatus}  = useQuery({
    queryKey: ["customerOrdersHistory", customerDetails?.id],
    queryFn: () =>  fetchCustomerOrdersHistory(customerDetails.id),
     staleTime: 3000,
     enabled: !!customerDetails?.id
  })

  // useEffect(() => {
  //   fetchCustomerDetails();
  // }, [id]);

  // useEffect(() => {
  //     fetchCustomerOrdersHistory();
  // }, [customerDetails]);

  // const fetchCustomerDetails = () => {
  //   telegramIdService
  //     .getById(id)
  //     .then((res) => setCustomerDetails(res.data))
  //     .catch((err) => console.error("Error fetching customer details:", err));
  // };

  // const fetchCustomerOrdersHistory = () => {
  //   const {id} = customerDetails
  //   if(id) {
  //     orderServices
  //       .getList({ customerId: id })
  //       .then((res) => setCustomerOrdersHistory(res.data))
  //       .catch((err) =>
  //         console.error("Error fetching customer orders history:", err)
  //       );
  //   }
  // };
  // Active Orders
  const activeOrders = customerOrdersHistory?.orders?.length > 0 &&  customerOrdersHistory.orders.filter(
    (order) => order.order_status !== "delivered"
  );

  // Finished Orders
  const finishedOrders = customerOrdersHistory?.orders?.length > 0 && customerOrdersHistory?.orders?.filter(
    (order) => order.order_status === "delivered"
  );


  return (
    <div className={cls.orders__history}>
      <div className={cls.all__orders}>
      <div className={cls.title}>
        <h4>Заказы</h4>
      </div>
      <div className={cls.orders}>
        <h4 className={cls.order__title}>Активный Заказы:</h4>
        <div className={cls.orders__list}>
          {activeOrders.length > 0 ?  activeOrders.map((order) => (
              <div
                onClick={() => navigate(`${order.id}`)}
                key={order.id}
                className={cls.order}
              >
                <div className={cls.order__text}>
                  <h4 className={cls.company__name}>Company Name</h4>
                  <p className={cls.ordered__date}>
                    {order.created_at} {order.order_status}
                  </p>
                </div>
                <div className={cls.order__price__wrapper}>
                  <h4 className={cls.order__price}>
                    {formatNumbers(order.total_price)} so&apos;m
                  </h4>
                  <ChevronRightIcon color="inherit" fontSize="small" />
                </div>
              </div>
            )): (
              <div>Not active orders</div>
            )}
        </div>
      </div>

      <div className={cls.orders}>
        <h4 className={cls.order__title}>Доставленные заказы:</h4>
        <div className={cls.orders__list}>
          {finishedOrders.length > 0 ?
            finishedOrders.map((order) => (
              <div
                onClick={() => navigate(`${order.id}`)}
                key={order.id}
                className={cls.order}
              >
                <div className={cls.order__text}>
                  <h4 className={cls.company__name}>Company Name</h4>
                  <p className={cls.ordered__date}>
                    {order.created_at} {order.order_status}
                  </p>
                </div>
                <div className={cls.order__price__wrapper}>
                  <h4 className={cls.order__price}>
                    {formatNumbers(order.total_price)} so&apos;m
                  </h4>
                  <ChevronRightIcon color="inherit" fontSize="small" />
                </div>
              </div>
            )) : (
              <div>No finished orders</div>
            )}
        </div>
      </div>

      </div>
    </div>
  );
}

export default OrdersHistory;
