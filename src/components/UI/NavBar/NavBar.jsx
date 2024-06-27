import cls from "./style.module.scss"
import React from 'react'
import BackButton from "../../Buttons/BackButton"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import Logo from "/logo.png"


function NavBar() {
const navigate = useNavigate()
const location = useLocation()
const {id} = useParams()

 // Regular expression to match the base path pattern /home/[userId]
const basePathPattern = /^\/home\/[^/]+$/;

    // Check if the current path matches the base path pattern
    const showBackButton = !basePathPattern.test(location.pathname);

  return (
    <div className={cls.navbar}>
        {showBackButton && (
        <div className={cls.back__btn}> 
            <BackButton onClick={()=> navigate(-1)}/>
        </div>
        )}
        <div className={cls.logo}
          onClick={() => navigate(`home/${id}`)}
        >
            <img src={Logo}/>
        </div>
    </div>
  )
}

export default NavBar