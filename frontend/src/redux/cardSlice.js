import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  userInfo: [],
  products: [],
  checkedBrands: [],
  checkedCategorys: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      state.products.push(item);
      toast.success("Product added to wishlist");
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        toast.success("Quantity increased");
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        toast.success("Quantity decreased");
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      toast.error("Product removed from wishlist");
    },
    resetCart: (state) => {
      state.products = [];
      toast.info("Wishlist reset");
    },
    toggleBrand: (state, action) => {
      const brand = action.payload;
      const isBrandChecked = state.checkedBrands.some(
        (b) => b._id === brand._id
      );

      if (isBrandChecked) {
        state.checkedBrands = state.checkedBrands.filter(
          (b) => b._id !== brand._id
        );
      } else {
        state.checkedBrands.push(brand);
      }
    },
    toggleCategory: (state, action) => {
      const category = action.payload;
      const isCategoryChecked = state.checkedCategorys.some(
        (b) => b._id === category._id
      );

      if (isCategoryChecked) {
        state.checkedCategorys = state.checkedCategorys.filter(
          (b) => b._id !== category._id
        );
      } else {
        state.checkedCategorys.push(category);
      }
    },
    updateQuantity: (state, action) => {
      const { _id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === _id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const {
  addToWishlist,
  increaseQuantity,
  decreaseQuantity, // Make sure this is included
  deleteItem,
  resetCart,
  toggleBrand,
  toggleCategory,
  updateQuantity,
} = cardSlice.actions;
export default cardSlice.reducer;
