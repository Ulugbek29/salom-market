import React from 'react'
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import cls from "./style.module.scss"

export default function index({...props}) {
  return (
    <IconButton {...props} aria-label="back button" className={cls.button}>
        <ArrowBackIcon />
    </IconButton>
  )
}
