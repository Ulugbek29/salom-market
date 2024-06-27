import cls from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, ShoppingBag } from "react-feather";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import productsService from "../../services/productServices";
import { setFilteredProducts } from "../../store/products/products.slice";
import { totalOrderQuantity } from "../../utils/totalOrderQuantity";

export default function SearchBlock() {
  const [value, setValue] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state) => state?.cart?.items);

  const { data: products, status } = useQuery({
    queryKey: ['products'], // Ensure this key is unique and specific
    queryFn: async () => {
      const response = await productsService.getList({});
      return response.data.products;
    },
    staleTime: 10 * 60 * 1000, // Increased to 10 minutes for example
    cacheTime: 60 * 60 * 1000, // Cached for 1 hour for example
  });
  
  useEffect(() => {
    if (status === 'success') {
      dispatch(setFilteredProducts({ filteredProducts: products, products: products }));
    }
  }, [products, status, dispatch]);

  const onChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setValue(searchValue);
  
    if (searchValue) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchValue)
      );
      dispatch(setFilteredProducts({ filteredProducts: filtered, products: products }));
    } else {
      dispatch(setFilteredProducts({ filteredProducts: products, products: products }));
    }
  };
  

  return (
    <div className={cls.wrapper}>
      <div className={cls.search}>
        <Search color="#707172" />
        <input placeholder="Qidirish..." value={value} onChange={onChange} />
      </div>

      <div className={cls.busket}>
        <div className={cls.inner} onClick={() => navigate(`/home/${id}/orders`)}>
          <ShoppingBag />
          <span>{totalOrderQuantity(items)}</span>
        </div>
      </div>
      <div className={cls.busket}>
        <div className={cls.inner} onClick={() => navigate(`/home/${id}/orders-history`)}>
          <PersonOutlineIcon fontSize="inherit" />
        </div>
      </div>
    </div>
  );
}






















//import cls from "./styles.module.scss";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { Search, ShoppingBag } from "react-feather";
// import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
// import { useDispatch, useSelector } from "react-redux";
// import {totalOrderQuantity} from "../../utils/totalOrderQuantity"
// import { setFilteredProducts,fetchProducts } from "../../store/products/products.slice";


// export default function SearchBlock() {
//   const [value, setValue] = useState("");
//   const {id} = useParams()
//   const navigate = useNavigate();
//   const dispatch = useDispatch()
//   const items = useSelector((state)=> state?.cart?.items)

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);
  



//   const onChange = (e) => {
//     setValue(e.target.value);
//     dispatch(setFilteredProducts(e.target.value))
//   };


//   return (
//     <div className={cls.wrapper}>
//       <div className={cls.search}>
//         <Search color="#707172" />
//         <input placeholder="Qidirish..." value={value} onChange={onChange} />
//       </div>

//       <div className={cls.busket}>
//         <div className={cls.inner} onClick={() => navigate(`/home/${id}/orders`)}>
//           <ShoppingBag />
//           <span>{totalOrderQuantity(items)}</span>
//         </div>
//       </div>
//       <div className={cls.busket}>
//         <div className={cls.inner} onClick={() => navigate(`/home/${id}/orders-history`)}>
//           <PersonOutlineIcon fontSize="inherit"/>
//         </div>
//       </div>
//     </div>
//   );
// }
