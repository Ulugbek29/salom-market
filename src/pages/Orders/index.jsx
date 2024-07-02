import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Minus, Plus } from "react-feather";
import { AnimatePresence, motion } from "framer-motion";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import formatNumbers from "../../utils/formatNumbers.js";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton/index.jsx";
import MainButton from "../../components/Buttons/MainButton/index.jsx";
import useTelegram from "../../hooks/useTelegram";
import Modal from "../../components/Modal/Modal.jsx";
import cls from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  orderTotalCost,
  removeAllOrders,
  removeSingleOrder,
} from "../../store/carts/cart.slice.js";
import { setUserOrder } from "../../store/order/order.slice.js";


export default function Orders() {
  const { items, totalPrice } = useSelector((state) => state?.cart);
  const {comment} = useSelector((state) => state?.order?.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tg } = useTelegram();
  const [dragXStart, setDragXStart] = useState(0);
  const [dragXEnd, setDragXEnd] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const {id} = useParams()

 
  // tg.onEvent("backButtonClicked", () => navigate("/"));

  // ToatalPrice
  useEffect(() => {
    dispatch(orderTotalCost());
  }, [items]);

  useEffect(() => {
    if (dragXEnd - dragXStart > 100) {
      navigate("/");
    }
  }, [dragXStart, dragXEnd]);

  // useEffect(() => {
  //   tg.BackButton.();
  // }, []);

  //AddToCart
  const handleAddToCard = (product) => {
    dispatch(addToCart(product));
  };

  //RemoveSingleOrder
  const removeSingleItem = (id) => {
    dispatch(removeSingleOrder(id));
  };

  //Remove all Orders
  const removeAllItems = () => {
    dispatch(removeAllOrders());
  };

  //Add user Order
  const addOrder = (userObj)=> {
    dispatch(setUserOrder(userObj))
  }

  const disableButtonIsCartEmpty = items.length === 0 ? true : false


console.log(items);
  return (
    <>
      <AnimatePresence>
        {dragXEnd - dragXStart < 100 && (
          <motion.div
            // initial={{ x: "100%" }}
            // animate={{ x: 0 }}
            // exit={{ x: "100%" }}
            // drag="x"
            // dragConstraints={{ left: 0, right: 0 }}
            // onDragStart={(_, i) => setDragXStart(i.point.x)}
            // onDragEnd={(_, i) => setDragXEnd(i.point.x)}
            // className={cls.wrapper}
          >
          <div className={cls.wrapper}>
          <div className={cls.orderContainer}>
          <div className={cls.bigTitle}>
              <p className={cls.title}>Buyurtmangiz</p>
              {items.length > 0 && (
                <div className={cls.btns}>
                  <p
                    className={cls.editBtn}
                    onClick={() => setShowModal((p) => !p)}
                  >
                    Tozalash
                  <DeleteOutlineOutlinedIcon />
                  </p>
                </div>
              )}
            </div>
            <div className={cls.orders}>
              {items.length > 0 ? (
                items.map((order) => (
                  <div className={cls.order} key={order.item.id}>
                    <div className={cls.left}>
                      <img src={order.item.photo_url[0]} />
                      <div className={cls.text}>
                        <p className={cls.top}>
                          <span className={cls.title}>{order.item.title}</span>
                          <span className={cls.count}>{order.quantity}x</span>
                        </p>
                        <h4 className={cls.hint}>{order.item.name}</h4>
                      </div>
                    </div>
                    <div className={cls.right}>
                      <p>
                        {formatNumbers(order.quantity * order.item.price)}{" "}
                        so&apos;m
                      </p>
                      <div className={cls.buttons}>
                        <RectangeIconButton
                          onClick={() => removeSingleItem(order.item.id)}
                        >
                          <Minus size={18} />
                        </RectangeIconButton>
                        <RectangeIconButton
                          onClick={() => handleAddToCard(order.item)}
                        >
                          <Plus size={18} />
                        </RectangeIconButton>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className={cls.noOrder}>Buyurtma mavjud emas</p>
              )}
            </div>
          </div>

            <div className={cls.requestsBlock}>
              <h4>Taklif, talab va shikoyatlar uchun</h4>
              <textarea value={comment} onChange={(e)=> addOrder({comment: e.target.value})}  placeholder="Komment..." className={cls.textarea} />
            </div>
            <MainButton disabled={disableButtonIsCartEmpty} fullWidth onClick={() => navigate(`/home/${id}/payment`)}>
              <span>To'lovga o'tish</span>
              <span>{formatNumbers(totalPrice)} so'm</span>
            </MainButton>
          </div>
            
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showModal && (
          <Modal setShowModal={setShowModal} removeAllItems={removeAllItems} />
        )}
      </AnimatePresence>
    </>
  );
}
