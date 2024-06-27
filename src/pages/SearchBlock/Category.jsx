// import { motion } from "framer-motion";

// import cls from "./styles.module.scss";

// export default function Category(props) {
//   const { data, activeCategory, setActiveCategory } = props;

//   const item = {
//     hidden: { x: 20, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//     },
//   };

//   return (
//     <motion.div
//       variants={item}
//       className={`${cls.category} ${activeCategory ? cls.active : ""}`}
//       onClick={() => setActiveCategory(data)}
//     >
//       {/* <img width={30} height={30} src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png" /> */}
//       <span>{data.name}</span>
//     </motion.div>
//   );
// }
