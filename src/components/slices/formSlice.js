import {createSlice} from "@reduxjs/toolkit"

const formSlice = createSlice({
    name:"form",
    initialState:{
        searchTerm:"",
        inputTerm:"",
        data:"",
        categories:""
    },
    reducers:{
        changeInputTerm(state,action){
            state.inputTerm =  action.payload;
        },
        changeSearchTerm(state,action){
            state.searchTerm = action.payload;
        },
        setData(state,action){
            state.data = action.payload;
        },
        setCategories(state,action){
            state.categories=  action.payload;
        },
    }
})

export const formReducer = formSlice.reducer;
export const {changeInputTerm,changeSearchTerm,setData,setCategories} = formSlice.actions;