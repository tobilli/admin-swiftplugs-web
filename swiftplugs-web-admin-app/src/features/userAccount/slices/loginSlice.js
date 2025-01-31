import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
    name:"auth",
    initialState:{
        user: null,
        firstName:null,
        email: null,
    },
    reducers:{
        setUserProfile:(state,action)=>{
            sessionStorage.setItem('user', JSON.stringify(action.payload));
            state.user = action.payload || JSON.parse(sessionStorage.getItem('user'));
        },
        setFirstName:(state, action)=>{
            state.firstName = action.payload;
        }
    }
});

export const {setFirstName, setUserProfile} = loginSlice.actions;

export default loginSlice.reducer;

export const selectCurrentUser = state => state.auth.user;
export const selectCurrentFirstName = state => state.auth.firstName;