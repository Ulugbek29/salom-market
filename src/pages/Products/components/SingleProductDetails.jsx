import "./style.scss"
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import productsService from "../../../services/productServices"


//Icons
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import { useForm } from "react-hook-form";
import SelectComponents from "../../../components/SelectComponents/SelectComponents";

const arrayOfObjects = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" }
];

const phoneSizes = [
  { value: "small", label: "Small" },
  { value: "medium", label: "Medium" },
  { value: "large", label: "Large" },
  { value: "extra-small", label: "Extra Small" },
  { value: "extra-large", label: "Extra Large" }
];



function SingleProductDetails() {
    const [mainImage, setMainImage] = useState('/osh.jpg');
    const [singleProductData, setSingleProductData] = useState({})
    const {control, handleSubmit} = useForm()




useEffect(()=> {
    handleSingleProduct()
},[])


const onSubmit = (value) => {
    console.log(value);
}


    
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 900,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
            }
        },
        {
          breakpoint: 750,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          }
          
        },
        {
            breakpoint: 580,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
            
          },
    ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    customPaging: (i) => {
      return <div
         style={{
               width: "30px",
               height: "15px",
               borderRadius: "1rem",
         }}
       >
       </div>
     }
  };





  const handleSingleProduct = () => {
    productsService.getById("5f4f607f-2636-4165-bed9-4e3d69da0439")
    .then((res)=> setSingleProductData(res.data))
    .catch((err) => console.log(err))
  }




  const handleImageClick = (imageSrc) => {
    setMainImage(imageSrc);
  };

  console.log(singleProductData);
  return (
    <div className="single__product">
<div className="product__img__swipper">
        <div className="product__img">
          <img src={mainImage} alt="Main Product" />
        </div>
        <div className="image__swipper">
          <Slider 
          className='slider__container' 
          {...settings}
          >

            <div className="single__img" onClick={() => handleImageClick("/osh.jpg")}>
              <img src="/osh.jpg" alt="Product 1" />
            </div>
            <div className="single__img" onClick={() => handleImageClick("/osh.jpg")}>
              <img src="/osh.jpg" alt="Product 2" />
            </div>
            <div className="single__img" onClick={() => handleImageClick("/osh.jpg")}>
              <img src="/osh.jpg" alt="Product 3" />
            </div>
            <div className="single__img" onClick={() => handleImageClick("/osh.jpg")}>
              <img src="/osh.jpg" alt="Product 4" />
            </div>
            <div className="single__img" onClick={() => handleImageClick("/osh.jpg")}>
              <img src="/osh.jpg" alt="Product 4" />
            </div>
          </Slider>
        </div>
      </div>

        <div className="product__details">
          <div className="product__title">
            <h3>{singleProductData.name}</h3>
            <span>{singleProductData.price} som</span>
          </div>  
          <p className="product__description">{singleProductData.description}</p>

        <form className="form__container" onSubmit={handleSubmit(onSubmit)}>
          <div className="product__selectors">
          <h2>Size:</h2>
            <SelectComponents control={control} name="style" options={arrayOfObjects}/>
          </div>
          <div className="product__selectors">
          <h2>Portion:</h2>
            <SelectComponents control={control} name="portion" options={phoneSizes}/>
          </div>

          <div className="increment__decrement__btn">
            <span className="decrement__btn">
                <AddIcon fontSize="inherit"/>
            </span>
            <span>1</span>
            <span className="increment__btn">
                <RemoveIcon fontSize="inherit"/>
            </span>
          </div>
        </form>
        </div>


    </div>
  )
}

export default SingleProductDetails





function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className="right__arrow"
        onClick={onClick}
      >
          <ChevronRightIcon />
      </div>
    );
  }
  


  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="left__arrow"
        onClick={onClick}
      >
          <ChevronLeftIcon />
      </div>
    );
  }