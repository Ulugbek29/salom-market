
import cls from "./styles.module.scss";
import { useEffect, useRef, useState } from "react";
import { Minus, Plus, X } from "react-feather";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence, motion, useDragControls, useMotionValue } from "framer-motion";
// import PictureUrl from "../../assets/osh.jpeg";
import Product from "./Product";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatNumbers from "../../utils/formatNumbers";
import RectangeIconButton from "../../components/Buttons/RectangeIconButton";
import MainButton from "../../components/Buttons/MainButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";
// import { fetchProducts } from "../../store/products/products.slice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addAttributes,
  orderTotalCost,
  removeSingleOrder,
} from "../../store/carts/cart.slice";
import { totalOrderQuantity } from "../../utils/totalOrderQuantity";
import Slider from "react-slick";
import Selector from "../../components/FormElements/Selector/Selector";

export default function Products() {
  const [previewItemId, setPreviewItemId] = useState(null);
  const { id } = useParams();
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {filteredProducts, products} = useSelector(
    (store) => store?.products
  );
  const { items, totalPrice } = useSelector((store) => store?.cart);
  const { activeCategory } = useSelector((store) => store?.category);
  const controls = useDragControls()
  const y = useMotionValue(0)


  const slideSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  console.log(products);
  console.log(filteredProducts);


  // window.location.reload();
  // useEffect(() => {
  //   function success(pos) {
  //     const crd = pos.coords;
  //   //  console.log("Geolocation", crd);
  //   //  alert(`GeolocationCoordinates ${crd.longitude} ${crd.latitude}`)
  //   console.log(navigator.permissions.query({ name: 'geolocation' }));
  //   }
  //   function error(prop) {
  //     console.log("ERROR => ", prop);
  //   }
  //   navigator.geolocation.getCurrentPosition(success, error, {
  //     enableHighAccuracy: true,
  //     timeout: 5000,
  //     maximumAge: 0,
  //   });
  // }, []);

  //Fetching all products
  // useEffect(() => {
  //   dispatch(fetchProducts({}));
  // }, [dispatch]);

  // Redux ToatalPrice
  useEffect(() => {
    dispatch(orderTotalCost());
  }, [items,totalPrice]);

  useOutsideClick(ref, () => setPreviewItemId(null));

  // getCuurentItem
  const getCurrentItem = () => products.find((i) => i.id === previewItemId);

  // productInCart
  const productInCart = items.find((pro) => pro?.item?.id === previewItemId);


  //AddToCart
  const handleAddToCard = (product) => {
    dispatch(addToCart(product));
  };

  //Add Attributes
  // const handleAddAttributes = (attribute) => {

  //   const data = {
  //     product: getCurrentItem(),
  //     attribute: attribute
  //   }

  //   dispatch(addAttributes(data));
  // }

  //Remove Order
  const removeOrder = (id) => {
    dispatch(removeSingleOrder(id));
  };

  //Animation
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  //Filtering by Category
  const productsFilteredByCategory =
    activeCategory.id !== null
      ? filteredProducts.filter(
          (product) => product.category_id === activeCategory.id
        )
      : filteredProducts;

  // const isProductVisible = (product) => {
  //   return activeCategory.some(category => product.category_id === category.id);
  // };


  return (
    <div className={cls.products}>
      {filteredProducts?.length === 0 ? (
        <div className={cls.food__loader}>
          <img src="/menu.gif" />
        </div>
      ) : (
        <>
          <p className={cls.bigTitle}>{activeCategory.name}</p>
          <motion.div
            className={cls.inner}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {productsFilteredByCategory?.map((product) => {
              return (
                <Product
                  key={product.id}
                  setPreviewItemId={setPreviewItemId}
                  data={product}
                />
              );
            })}

            <AnimatePresence>
              {previewItemId && (
                <motion.div
                 className={cls.preview}
                 initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                 >
                  <motion.div
                    className={cls.previewInner}
                    ref={ref}
                    initial={{ bottom: "-100%" }}
                    animate={{ bottom: "0%" }}
                    exit={{ bottom: "-100%" }}
                    style={{ y }}
                    transition={{
                      ease: "easeInOut"
                    }}
                    drag="y"
                    dragControls={controls}
                    dragListener={false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={{
                      top: 0,
                      bottom: 0.5
                    }}
                    onDragEnd={() => {
                      if(y.get() >= 100) {
                        setPreviewItemId(null);
                      }
                    }}
                  >
                  <motion.div
                  className={cls.dragger__wrapper}
                  onPointerDown={(e)=> controls.start(e)}
                  style={{ touchAction: "none" }}
                  >
                  <button 
                    className={cls.dragger}
                  />
                  </motion.div>
                    <X
                      className={cls.close}
                      size={24}
                      onClick={() => {
                        setPreviewItemId(null);
                      }}
                    />
                    <div className={cls.previewInner__content}>
                    <div className={cls.image} 
                    >
                      <Slider {...slideSettings}>
                        {getCurrentItem().photo_url.map((productImage, i) => (
                          <div className={cls.preview__img}>
                            <img  key={i} src={productImage} />
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div 
                    className={cls.body}
                    >
                      <div className={cls.head}>
                        <h4 className={cls.price}>
                          Цена: {productInCart?.item?.price ? productInCart?.item?.price : getCurrentItem()?.price} so'm
                        </h4>
                        <p className={cls.title}>{getCurrentItem().name}</p>
                        <p className={cls.description}>
                          {getCurrentItem().description}
                        </p>
                      </div>

                          {getCurrentItem().attribute.length > 0 && (
                          <div className={cls.attributes}>
                              {getCurrentItem().attribute.map((att) => (
                                <Selector key={att.id} title={att.title} options={att.options} attribute={att} getCurrentItem={getCurrentItem()}/>
                              ))}
                          </div>
                          )}

                      <div className={cls.footer}>
                        <div className={cls.action}>
                          {productInCart?.quantity > 0 ? (
                            <>
                              <RectangeIconButton
                                size="lg"
                                onClick={() => removeOrder(getCurrentItem().id)}
                              >
                                <Minus size={18} />
                              </RectangeIconButton>
                              <motion.span
                                key={getCurrentItem().count}
                                className={cls.countPreview}
                                animate={{ scale: 1, color: "#000" }}
                                initial={{ scale: 1.2, color: "#14b706" }}
                              >
                                {productInCart.quantity}
                              </motion.span>
                              <RectangeIconButton
                                size="lg"
                                onClick={() =>
                                  handleAddToCard(getCurrentItem())
                                }
                              >
                                <Plus size={18} />
                              </RectangeIconButton>
                            </>
                          ) : (
                            <SecondaryButton
                              fullWidth
                              onClick={() => handleAddToCard(getCurrentItem())}
                              styles={{
                                backgroundColor: "#eee",
                                color: "#000",
                                fontWeight: "400",
                              }}
                            >
                              Savatga qo'shish
                            </SecondaryButton>
                          )}
                        </div>
                      </div>
                    </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <MainButton
            styles={{ backgroundColor: previewItemId ? "" : "" }}
            disabled={!(totalPrice > 0)}
            onClick={() => navigate(`/home/${id}/orders`)}
          >
            <span>Buyurtmaga o'tish</span>
            <p>
              <span className={cls.orderCount}>
                {totalOrderQuantity(items)}
              </span>
              <span>{formatNumbers(totalPrice)} so'm</span>
            </p>
          </MainButton>
        </>
      )}
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}`}
      style={{ ...style}}
      onClick={onClick}
    />
  );
}
