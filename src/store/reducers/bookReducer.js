import { BOOK_ADD_SUCCESS,BOOK_ADD_FAIL,BOOK_ADD_SUCCESS_CLEAR,BOOK_ADD_FAIL_CLEAR, BOOK_GET_SUCCESS,GET_SINGLE_BOOK, GET_SUGGESTED_BOOK } from "../types/bookType";

const bookState ={
    bookSuccessMessage : '',
    bookErrorMessage :'',
    books:[],
    singleBook:{},
    suggestedBooks:[]
}

export const bookReducer = (state=bookState,action)=>{
    const {type,payload} = action;
    if(type === BOOK_ADD_SUCCESS){
        return{
            ...state,
            bookSuccessMessage:payload.message
        }
        
    }
    if(type === BOOK_ADD_FAIL){
        return{
            ...state,
            bookErrorMessage:payload.errorMessage
        }
    }
    if(type === BOOK_ADD_SUCCESS_CLEAR){
        return{
            ...state,
            bookSuccessMessage:''
        }
    }
    if(type === BOOK_ADD_FAIL_CLEAR){
        return{
            ...state,
            bookErrorMessage:''
        }
    }
    if(type === BOOK_GET_SUCCESS){
        return{
            ...state,
            books:payload.data
        }
    }
    if(type === GET_SINGLE_BOOK){
        return{
            ...state,
            singleBook:payload.data
        }
    }
    if(type === GET_SUGGESTED_BOOK){
        return{
            ...state,
            suggestedBooks:payload.data
        }
    }
    return state
}