import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_URL,checkUserToken , TOKEN_NAME } from "../services/service"



export const getUserInfo = createAsyncThunk(
    "user,getUserInfo", async (dispatch, getState) => {
        if (localStorage.getItem(TOKEN_NAME)) {
            let data = await checkUserToken()
            if (!data.err) {
                console.log(data)
                return data.data;
            } else {
                return null
            }

        } else {
            return null;
        }
    }
)
const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: null,
        loged:false

    },
    extraReducers(builder) {

        builder.
            addCase(getUserInfo.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.status = "success";
                console.log(action.payload);
                if (action.payload == null) {
                    state.status = "failed";
                    state.loged=false;
                    state.user = null
                    console.log("1");
                } else if (action.payload == null) {
                    state.user = null;
                    state.status = "failed";
                    state.loged=false;
                    console.log("2");
                }

                else {
                    state.user = { ...action.payload };
                    state.loged=true;
                    console.log("3");

                }
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.status = "failed";
                state.loged=false
                console.log("4");
            })
    },
    reducers: {
        logoutUser: (state, action) => {
            state.user = null
            state.loged=false
        },
        loginUser: (state, action) => {
            state.loged=true
        }
    }
})

export const { logoutUser,loginUser } = userSlice.actions



export default userSlice.reducer;