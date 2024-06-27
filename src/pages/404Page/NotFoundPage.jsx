import cls from "./style.module.scss"
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";

function NotFoundPage() {
const navigate = useNavigate()
const {id} = useParams()


    const navigateBack = ()=>{ 
        navigate(-1)
    }
  return (
    <div className={cls.page__not__found}>
        <div className={cls.header__title}>
            <h2>4</h2>
            <span className={cls.donut}>
                <img src="/donut.gif"/>
            </span>
            <h2>4</h2>
        </div>
        <h2 className={cls.header__subtitle}>Page Not Found</h2>
        <button
        onClick={navigateBack}
         className={cls.back__btn}>
        <ArrowBackIcon color="inherit"/>
        Back to Main Page</button>
    </div>
  )
}

export default NotFoundPage