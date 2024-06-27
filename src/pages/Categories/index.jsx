import { motion } from "framer-motion";
import Category from "./Category";
import cls from "./styles.module.scss";
import categoryService from "../../services/categoryServices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCategories } from "../../store/category/category.slice";
import { Skeleton } from "@mui/material";

export default function Categories() {
  const [categories,setCategories] = useState([]) 
  const dispatch = useDispatch()
  const {activeCategory} = useSelector((state)=> state?.category)



 

  const setActiveCategoryFunction = (data)=> {
      dispatch(setActiveCategories(data))
  }


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

  useEffect(()=> {
    fetchCategory()
  },[])


  const fetchCategory = () => {
    categoryService.getList({})
    .then((res)=> activeCategories(res.data.categories))
  }



// Filtering Active categories 
const activeCategories = (categoriesList) => {
  
  const formattedCategories = categoriesList
    .filter((category)=> category.status === "active")
    // .map((category)=> ({id: category.id, name: category.name.charAt().toUpperCase() + category.name.slice(1).toLowerCase()}))

    const allFilteredCategories = [{id: null, name: "All"},...formattedCategories]
    
    setCategories(allFilteredCategories)
  }


 


  return (
    <motion.div className={cls.categories} variants={container} initial="hidden" animate="visible">
      {categories.length ? (
        categories.map((data) => (
          <Category
            key={data.id}
            activeCategory={activeCategory.id === data.id}
            // activeCategory={activeCategory}
            setActiveCategory={setActiveCategoryFunction}
            data={data}
          />
        ))
      ) : (

        <div className={cls.skelleton__list}>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
          <Skeleton width={80} height={60}/>
        </div>
      )}
    </motion.div>
  );
}
