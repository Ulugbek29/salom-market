import { Minus, Plus } from "react-feather";
import { motion } from "framer-motion";

import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
import cls from "./styles.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeSingleOrder } from "../../store/carts/cart.slice";
import { Skeleton } from "@mui/material";





export default function Product({data, setPreviewItemId}) 
{
  const productQuantity = useSelector((store) => store?.cart?.items);
  const dispatch = useDispatch()

  const productInCart = productQuantity.find(pro => pro.item.id === data.id);

 




  const handleAddToCard = (e,product) => {
    e.stopPropagation();
    dispatch(addToCart(product))
  };

  const removeOrder = (e,id)=> {
    e.stopPropagation()
    dispatch(removeSingleOrder(id))
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleToBucketBtn = (e, data) => {
    e.stopPropagation();
  };



  return (
    <>

      <motion.div variants={item} className={cls.product} onClick={() => {
        setPreviewItemId(data.id)
        }}>
      <div className={cls.image}>
      {data.photo_url.length > 0 ?  (
       <img src={data.photo_url[0]}/>
      ):(
        <Skeleton variant="rectangular" animation="wave" height={300} />
      )}
      </div>

      <div className={cls.body}>
      {data.price && data.name ? (
      <div className={cls.text__box}>
        <p className={cls.price}>{formatNumbers(data.price)} so&apos;m</p>
        <p className={cls.title}>{data.name}</p>
      </div>
      ):(
        <div>
        <Skeleton width="60%" animation="wave"/>
        <Skeleton  animation="wave"/>
      </div>
      )}
        <div className={cls.footer}>
        {data ? (
          <>
          {productInCart && productInCart?.quantity > 0 ? (
            <>
              <RectangeIconButton size="lg" onClick={(e) => removeOrder(e, data.id)}>
                <Minus size={18} />
              </RectangeIconButton>
              <motion.span
                key={data.quantity}
                className={cls.count}
                animate={{ scale: 1, color: "#000" }}
                initial={{ scale: 1.2, color: "#1a5d1a" }}
              >
              {productInCart?.quantity}
                
              </motion.span>
              <RectangeIconButton size="lg" onClick={(e) => handleAddToCard(e,data)}>
                <Plus size={18} />
              </RectangeIconButton>
            </>
          ) : (
            <SecondaryButton
              fullWidth
              onClick={(e) => handleAddToCard(e,data)}
              styles={{ backgroundColor: "#eee", color: "#000", fontWeight: "400" }}
            >
              Savatga
            </SecondaryButton>
          )}
     
          </>
        ): (
          <Skeleton animation="wave" width="100%" height={50} />
          )}
        </div>
      </div>
    </motion.div>
  
  </>
  );
}
