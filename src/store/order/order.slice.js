import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    userData: {
        comment: "",
        company_id: "",
        customer_details: {
          address: {
            lat: 0,
            long: 0,
            name: "",
            district: ""
          },
          id: "",
          name: "",
          phone: ""
        },
        delivery_price: 0,
        order_products: {
          products: [
            {
              count: 0,
              product_id: "",
              product_name: "",
              product_price: 0,
              total_price: 0
            }
          ],
          total_price: 0
        },
        order_type: "",
        payment_details: {
          payment_type_id: ""
        },
        product_price: 0,
        total_price: 0
    }
       
  },
  reducers: {
    setUserOrder(state, { payload }) {
        return {
          ...state,
          userData: {
            ...state.userData,
            ...payload
          }
        };
      },
    clearUserData(state, {payload}) {
        state.userData = {
            comment: "",
        company_id: "",
        customer_details: {
          address: {
            lat: 0,
            long: 0,
            name: ""
          },
          id: "",
          name: "",
          phone: ""
        },
        delivery_price: 0,
        order_products: {
          products: [
            {
              count: 0,
              product_id: "",
              product_name: "",
              product_price: 0,
              total_price: 0
            }
          ],
          total_price: 0
        },
        order_type: "",
        payment_details: {
          payment_type_id: ""
        },
        product_price: 0,
        total_price: 0
        }
    }
}
});

export default orderSlice.reducer;

export const { setUserOrder,clearUserData } = orderSlice.actions;
