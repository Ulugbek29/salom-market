import cls from "./style.module.scss";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderServices from "../../services/orderServices";
import Stepper from "../../components/Stepper";

// Icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ClearIcon from "@mui/icons-material/Clear";
import formatNumbers from "../../utils/formatNumbers";

function SingleOrder() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState([]);
  console.log(orderData);
  useEffect(() => {
    fetchCustomerOrdersHistory();
  }, [orderId]);

  const fetchCustomerOrdersHistory = () => {
    orderServices
      .getById(orderId)
      .then((res) => setOrderData(res.data))
      .catch((err) =>
        console.error("Error fetching customer orders history:", err)
      );
  };

  const orderStatus = () => {
    const status = orderData.order_status;
    let statusNumber = 0;
    switch (status) {
      case "preparing":
        statusNumber = 1;
        break;
      case "ready_for_delivering":
        statusNumber = 2;
        break;
      case "on_the_way":
        statusNumber = 3;
        break;
      case "delivered":
        statusNumber = 4;
        break;
      default:
       break;
    }
    return statusNumber
  };

  return (
    <div className={cls.single__order__container}>
      <div className={cls.single__order}>
        <div className={cls.status__stepper}>
          <h4>Status</h4>
          <Stepper orderStatus={orderStatus}/>
        </div>
        <div className={cls.single__order__title}>
          <h4>Company name</h4>
          <p>
            {orderData.created_at} & {orderData.order_status}
          </p>
        </div>
        <div className={cls.single__order__products}>
          {orderData?.order_products?.products?.length > 0 &&
            orderData.order_products.products.map((order) => (
              <div key={order.product_id} className={cls.product}>
                <div className={cls.product__count}>
                  <h5>{order.count} шт</h5>
                  <span>
                    <ClearIcon fontSize="inherit" />
                  </span>
                  <p>{order.product_name}</p>
                </div>
                <h4>{formatNumbers(order.total_price)} so&apos;m</h4>
              </div>
            ))}
        </div>

        <div className={cls.order__details__wrapper}>
          <div>
            <div className={cls.order__details}>
              <h3>Детали доставки</h3>
              <div className={cls.details__list}>
                <div className={cls.detail}>
                  <span className={cls.detail__logo}>
                    <LocationOnIcon color="inherit" />
                  </span>
                  <div className={cls.details__text}>
                    <h4>
                      Address: {orderData.customer_details?.address?.district}
                    </h4>
                    <p>{orderData.customer_details?.address.name}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={cls.order__details}>
              <h3>Способ оплаты</h3>
              <div className={cls.details__list}>
                <div className={cls.detail}>
                  <span className={cls.detail__logo}>
                    <CreditCardIcon color="inherit" />
                  </span>
                  <div className={cls.details__text}>
                    <h4>{orderData.payment_details?.type}</h4>
                    <p>Uzcard, Humo, Visa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={cls.order__total__price}>
            <div className={cls.total__price}>
              <h3>К оплате</h3>
              <h2>{formatNumbers(orderData.total_price)} so&apos;m</h2>
            </div>
            <div className={cls.delivery__price}>
              <p>Доставка</p>
              <span>{formatNumbers(orderData.delivery_price)} so&apos;m</span>
            </div>

            <h4 className={cls.logo}>
              Bot<span>m</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrder;
