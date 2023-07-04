import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";



const myStore = configureStore({
  reducer: {
    userSlice,
  }
})

export default myStore;