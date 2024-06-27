import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import productSlice from "./products/products.slice";
// import authSlice from "./auth/auth.slice";
import cartSlice from "./carts/cart.slice";
import categorySlice from "./category/category.slice";
import orderSlice from "./order/order.slice";

// const persistAuthConfig = {
//     key: "auth",
//     storage
// }

const persistCartConfig = {
    key: "cart",
    storage
}

const persistCategoryConfig ={
    key: "category",
    storage
}

const persistOrderConfig ={
    key: "order",
    storage
}

export const rootReducer = combineReducers({
    // auth: persistReducer(persistAuthConfig, authSlice),
    cart: persistReducer(persistCartConfig, cartSlice),
    category: persistReducer(persistCategoryConfig, categorySlice),
    products:  productSlice,
    order: persistReducer(persistOrderConfig, orderSlice)
})