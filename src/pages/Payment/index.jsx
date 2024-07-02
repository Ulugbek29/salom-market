import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import useTelegram from "../../hooks/useTelegram";
import MainButton from "../../components/Buttons/MainButton";
import UserInfo from "./UserInfo";
import DeliveryTabs from "./DeliveryTabs";
import DeliveryMap from "./DeliveryMap";
import DeliveryBranches from "./DeliveryBranches";
import cls from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import orderServices from "../../services/orderServices";
import { clearUserData } from "../../store/order/order.slice";
import { removeAllOrders } from "../../store/carts/cart.slice";
import ConfirmModal from "../../components/ConfirmModal";
import telegramIdService from "../../services/telegramIdService";

export default function Payment() {
  const [open, setOpen] =  useState(false);
  const [activeTabId, setActiveTabId] = useState(1);
  const [customerData, setCustomerData] = useState({});

  const {handleSubmit, control, reset, setValue, watch, getValues} = useForm({ defaultValues: {
    phone: ""
  } });
  const { tg } = useTelegram();
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userData = useSelector((store)=> store?.order?.userData)
  const cart = useSelector((store) => store?.cart)
  const {id} = useParams()  
  
  // useEffect(() => {
  //   tg.BackButton.show();
  // }, []);

  // tg.onEvent("backButtonClicked", () => navigate("/orders"));

  
  useEffect(()=> {
    fetchUserTelegramId()
  },[])
  
  
  
  const handleOpen = () => setOpen(true)
    const handleClose = () => {
      setOpen(false)
      dispatch(clearUserData())
      dispatch(removeAllOrders())
      reset()
      navigate(`/home/${id}`)
    }


  const fetchUserTelegramId = () => {
    if(id === "undefined") return
    telegramIdService.getById(id)
    .then((res)=> {
        setCustomerData(res.data)
        setValue("phone", res.data.phone); 
        setValue("name", res.data.name)
    })
    .catch((err) => console.log(err))
  }
  
  console.log("cart",cart)
  console.log(userData);
  const onSubmit = (data) => {
    const productsArray = cart.items.map((order) => {

      const attributes = order?.attributes.map((att) => ({
          created_at: att.created_at,
          id: att.id,
          product_id: att.product_id,
          title: att.title,
          updated_at: att.updated_at,
          options: [att.selectedOption]
      }))

      return {
        attributes: attributes,
        count: order.quantity,
        product_id: order.item.id,
        product_name: order.item.name,
        product_price: order.item.price,
        total_price: order.item.price * order.quantity,
        category_id: order.item.category_id
      };
    });
  
    // console.log(productsArray);
    const orderData = {
      comment: userData.comment, // Assuming comment is collected from the form
      company_id: "c6440797-dc74-4054-a0f0-2a4d3e6d3867",
      customer_details: {
        address: {
          lat: data.placemark[1], // Accessing address from form data
          long: data.placemark[0],
          name: data.address,
          district: userData.district[0]
        },
        id: customerData.id,
        name: data.name, 
        phone: data.phone,
        telegram_id: id
      },
      order_products: {
        products: productsArray,
        total_price: cart.totalPrice
      },
      order_type: "delivery",
      delivery_price: 0,
      payment_details: {
        payment_type_id: "8e85e55f-bcd8-4225-9ae9-ec9ded4787ae"
      },
      product_price: cart.totalPrice,
      total_price: cart.totalPrice
    };
  
    console.log(orderData)
    // navigate("card-page")
    orderServices.create(orderData)
      .then((res) => {
        handleOpen()
      })
      .catch((err) => console.log(err));
  };

  
  return (
    <div className={cls.wrapper}>
    <form className={cls.main__form} onSubmit={handleSubmit(onSubmit)}>
      <UserInfo control={control} watch={watch} getValues={getValues}/>
      <div className={cls.tabsWrapper}>
        <DeliveryTabs setActiveTabId={setActiveTabId} activeTabId={activeTabId} />
        <div className={cls.tabPanels}>{activeTabId === 1 ? <DeliveryMap control={control} watch={watch} setValue={setValue}/> : <DeliveryBranches />}</div>
      </div>
      <MainButton center type="submit" onClick={() => {}}>
        Keyingi bosqich
      </MainButton>
    </form>
    {open && <ConfirmModal open={open} handleClose={handleClose} cart={cart}/>}
    </div>
  );
}
