
 
import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addToCart(state, action) {
      const itemExists = state.items.some(
        (itemObj) => itemObj.item.id === action.payload.id
      );
      if (!itemExists) {
        state.items.push({ item: action.payload, quantity: 1, attributes: [] });
      } else {
        state.items = state.items.map((itemObj) =>
          itemObj.item.id === action.payload.id
            ? { ...itemObj, quantity: itemObj.quantity + 1 }
            : itemObj
        );
      }
    },

    removeOrder(state, action) {
      state.items = state.items.filter(
        (itemObj) => itemObj.item.id !== action.payload
      );
    },

    removeSingleOrder(state, action) {
      const itemIdToRemove = action.payload;
      const itemIndex = state.items.findIndex(
        (itemObj) => itemObj.item.id === itemIdToRemove
      );

      if (itemIndex !== -1) {
        const currentItem = state.items[itemIndex];

        if (currentItem.quantity > 1) {
          state.items[itemIndex] = {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          };
        } else {
          state.items.splice(itemIndex, 1);
        }
      }
    },

    removeAllOrders(state) {
      state.items = [];
      state.totalPrice = 0;
    },

    orderTotalCost(state) {
      state.totalPrice = state.items.reduce((acc, itemObj) => {
        // const attributeCost = itemObj.attributes.reduce((attAcc, att) => {
        //   return attAcc + att.selectedOption.price;
        // }, 0);
        // console.log(attributeCost);
        return acc + (itemObj.quantity * itemObj.item.price);
      }, 0);
      
      // state.items.map((order) => { 
      //   // console.log(current(order))
      //     const attributeCost = order.attributes.reduce((attAcc, att) => { 
      //         // console.log(current(att)); 
      //         return attAcc + att.selectedOption.price; 
      //       }, 0); 
      //       // console.log(attributeCost)
      //       return order.item.price + attributeCost
      //     })
    },
    
    addAttributes(state, { payload }) {
      console.log(payload);
      const itemIndex = state.items.findIndex(
        (itemObj) => {
          console.log(itemObj);
         return itemObj.id === payload.product.id
        } 
      );


      const selectedAttribute = payload.attribute;

      if (itemIndex === -1) {
        
        
        // Calculate the price with the selected option included
        const itemPrice = payload.product.price + (payload.selectedOption ? payload.selectedOption.price : 0);
        
        // console.log("itemPrice",itemPrice)
        state.items.push({
          item: { ...payload.product, price: itemPrice },
          quantity: 1,
          attributes: [{ ...selectedAttribute, selectedOption: payload.selectedOption }],
        });
      } else {
        const currentItem = state.items[itemIndex]

        const attributeIndex = currentItem.attributes.findIndex(
          (attr) => attr.id === selectedAttribute.id
        );
        
        
        if (attributeIndex === -1 && payload.selectedOption) {
          // If the attribute doesn't exist, add it
          currentItem.attributes.push({ ...selectedAttribute, selectedOption: payload.selectedOption });
        } else if (attributeIndex !== -1 && payload.selectedOption) {
          // If the attribute exists, update its selected option
          currentItem.attributes[attributeIndex] = { ...selectedAttribute, selectedOption: payload.selectedOption };
        } else if (attributeIndex !== -1 && !payload.selectedOption) {
          // If the attribute exists but no option is selected, remove the attribute

          // const removedOptionPrice = currentItem.attributes[attributeIndex].selectedOption.price || 0;
          currentItem.attributes.splice(attributeIndex, 1);

          // Deduct the price of the removed option from itemPrice
          // currentItem.item.price -= removedOptionPrice;
        }

         // Calculate the new price of the item considering the updated attributes
         currentItem.item.price = payload.product.price + calculateAttributesPrice(currentItem.attributes);

        state.items[itemIndex] = currentItem;
      }
    },
  },
});



// // Helper function to calculate the price of an item considering its attributes
// const calculateItemPrice = (item) => {
//   // Start with the base price of the item
//   let itemPrice = item.item.price;
//   console.log("dasd")
//   // Add the cost of each selected attribute option
//   item.attributes.forEach((attr) => {
//     if (attr.selectedOption) {
//       itemPrice += attr.selectedOption.price;
//     }
//   });

  

//   return itemPrice;
// };


// Helper function to calculate the total price of all selected attributes
const calculateAttributesPrice = (attributes) => {
  return attributes.reduce((acc, attr) => {
    return acc + (attr.selectedOption ? attr.selectedOption.price : 0);
  }, 0);
};

export default cartSlice.reducer;

export const { addToCart, removeSingleOrder, removeOrder, removeAllOrders, orderTotalCost, addAttributes } = cartSlice.actions;




















































































































// import { createSlice,current } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     totalPrice: 0,
//   },
//   reducers: {
//     addToCart(state, action) {
//       const itemExists = state.items.some(
//         (itemObj) => itemObj.item.id === action.payload.id
//       );
//       if (!itemExists) {
//         state.items.push({ item: action.payload, quantity: 1, attributes: [] });
//       } else {
//         state.items = state.items.map((itemObj) =>
//           itemObj.item.id === action.payload.id
//             ? { ...itemObj, quantity: itemObj.quantity + 1 }
//             : itemObj
//         );
//       }
//       state.totalPrice = calculateTotalPrice(state.items);
//     },

//     removeOrder(state, action) {
//       state.items = state.items.filter(
//         (itemObj) => itemObj.item.id !== action.payload
//       );
//       state.totalPrice = calculateTotalPrice(state.items);
//     },

//     removeSingleOrder(state, action) {
//       const itemIdToRemove = action.payload;
//       const itemIndex = state.items.findIndex(
//         (itemObj) => itemObj.item.id === itemIdToRemove
//       );

//       if (itemIndex !== -1) {
//         const currentItem = state.items[itemIndex];

//         if (currentItem.quantity > 1) {
//           state.items[itemIndex] = {
//             ...currentItem,
//             quantity: currentItem.quantity - 1,
//           };
//         } else {
//           state.items.splice(itemIndex, 1);
//         }

//         state.totalPrice = calculateTotalPrice(state.items);
//       }
//     },

//     removeAllOrders(state) {
//       state.items = [];
//       state.totalPrice = 0;
//     },

//     addAttributes(state, { payload }) {
//       const itemIndex = state.items.findIndex(
//         (itemObj) => itemObj.item.id === payload.product.id
//       );

//       const selectedAttribute = payload.attribute;

//       if (itemIndex === -1) {
//         state.items.push({
//           item: payload.product,
//           quantity: 1,
//           attributes: [{ ...selectedAttribute, selectedOption: payload.selectedOption }],
//         });
//       } else {
//         const currentItem = state.items[itemIndex];
//         const attributeIndex = currentItem.attributes.findIndex(
//           (attr) => attr.id === selectedAttribute.id
//         );

//         if (attributeIndex === -1 && payload.selectedOption) {
//           // If the attribute doesn't exist, add it
//           currentItem.attributes.push({ ...selectedAttribute, selectedOption: payload.selectedOption });
//         } else if (attributeIndex !== -1 && payload.selectedOption) {
//           // If the attribute exists, update its selected option
//           currentItem.attributes[attributeIndex] = { ...selectedAttribute, selectedOption: payload.selectedOption };
//         } else if (attributeIndex !== -1 && !payload.selectedOption) {
//           // If the attribute exists but no option is selected, remove the attribute
//           currentItem.attributes.splice(attributeIndex, 1);
//         }

//         // Calculate the new price of the item considering the updated attributes
//         currentItem.item.price = calculateItemPrice(currentItem);

//         state.items[itemIndex] = currentItem;
//       }

//       state.totalPrice = calculateTotalPrice(state.items);
//     },
//   },
// });

// // Helper function to calculate the total price of all items in the cart
// const calculateTotalPrice = (items) => {
//   console.log(current(items))
//   return items.reduce((acc, itemObj) => {
//     const itemTotal = itemObj.item.price * itemObj.quantity;
//     return acc + itemTotal;
//   }, 0);
// };

// // Helper function to calculate the price of an item considering its attributes
// const calculateItemPrice = (item) => {
//   // Start with the base price of the item
//   let itemPrice = item.item.price;

//   // Add the cost of each selected attribute option
//   item.attributes.forEach((attr) => {
//     if (attr.selectedOption) {
//       itemPrice += attr.selectedOption.price;
//     }
//   });

//   return itemPrice;
// };

// export default cartSlice.reducer;

// export const { addToCart, removeSingleOrder, removeOrder, removeAllOrders, addAttributes } = cartSlice.actions;
