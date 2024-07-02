import { motion } from "framer-motion";
import foodIcon from "../../assets/icons/allFood.svg";
import cls from "./styles.module.scss";

export default function Category({ data, activeCategory, setActiveCategory }) {
  const item = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
    },
  };

  const toggleActiveCategory = () => {
    if (activeCategory) {
      setActiveCategory({ id: null, name: "All" });
    } else {
      setActiveCategory(data);
    }
  };

  // const toggleActiveCategory = () => {
  //   // Check if a category with the same id exists in activeCategory
  //   const isActive = activeCategory.some(category => category.id === data.id);
  
  //   // Toggle the category based on its presence in activeCategory
  //   if (isActive) {
  //     setActiveCategory(activeCategory.filter(category => category.id !== data.id));
  //   } else {
  //     setActiveCategory([...activeCategory, data]);
  //   }
  // };


  // array of active categ
  // const isActive = activeCategory.some(category => category.id === data.id);
  

  return (
    <motion.div
      variants={item}
      className={`${cls.category} ${activeCategory ? cls.active : ""}`}
      onClick={()=>toggleActiveCategory()}
    >
    {data.photo_url && (
      <img
        width={30}
        height={30}
        src={data.photo_url}
      />
    )}
      <span>{data.name}</span>
    </motion.div>
  );
}
