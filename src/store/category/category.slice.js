import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    activeCategory: { id: null, name: "All" }
  },
  reducers: {
    setActiveCategories(state, { payload }) {
       state.activeCategory = payload

    //   const filteredCategories = state.activeCategory.filter(
    //     (category) => category.name !== "All"
    //   );

    //   // Add or remove the selected category based on whether it's already in the state
    //   if (filteredCategories.some((category) => category.id === payload.id)) {
    //     state.activeCategory = filteredCategories.filter(
    //       (category) => category.id !== payload.id
    //     );
    //   } else if (
    //     state.activeCategory.some((category) => category.name === "All")
    //   ) {
    //     console.log("ads")
    //     state.activeCategory = [{ id: null, name: "All" }];
    //   } else {
    //     state.activeCategory = [...filteredCategories, payload];
    //   }
    // },
  },
}
});

export default categorySlice.reducer;

export const { setActiveCategories } = categorySlice.actions;
