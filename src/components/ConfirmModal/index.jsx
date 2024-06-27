import React, { useState } from 'react'
import cls from "./style.module.scss"
import Modal from '@mui/material/Modal';
import {motion} from "framer-motion"


const svgVariants = {
    hidden: {
      opacity: 0,
      rotate: "-180deg"
    },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    }
  }
  
  
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  }

export default function index({handleClose, open, cart}) {



  const formattedTotalPrice = cart.totalPrice.toLocaleString().replace(/,/g, ' ');

  return (
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={cls.modal__container}
      >
      <div className={cls.modal}>
      <motion.svg
      width="170px"
      height="170px"
      viewBox="0 0 24.00 24.00"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#028a00"
      variants={svgVariants}
      initial="hidden"
      animate="visible"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.192" />
      <g id="SVGRepo_iconCarrier">
        {/* Animate the first path */}
        <motion.path
          variants={pathVariants}
          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
          stroke="#2ca300"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Animate the second path */}
        <motion.path
          variants={pathVariants}
          d="M7.75 12L10.58 14.83L16.25 9.17004"
          stroke="#2ca300"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </motion.svg>
          <h4>
             Заказ успешно создан
          </h4>
          <p>
            Итоговая цена: <span>{formattedTotalPrice} so'm</span>
          </p>
      </div>
      </Modal>
  )
}
