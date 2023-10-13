import { REVIEW_ADD_FAIL, REVIEW_ADD_FAIL_CLEAR, REVIEW_ADD_SUCESS, REVIEW_ADD_SUCESS_CLEAR, REVIEW_GET_SUCCESS } from "../types/reviewType";


let reviewState = {
    reviewSuccessMessage:'',
    reviewErrorMessage:'',
    allreview:[],
}

export const reviewReducer = (state=reviewState,action)=>{
    const {type,payload} = action;
    if(type === REVIEW_ADD_SUCESS){
        return{
            ...state,
            reviewSuccessMessage:payload.message
        }
    }
    if(type === REVIEW_ADD_FAIL){
        return{
            ...state,
            reviewErrorMessage:payload.message
        }
    }
    if(type === REVIEW_ADD_SUCESS_CLEAR){
        return{
            ...state,
            reviewSuccessMessage:''
        }
    }
    if(type === REVIEW_ADD_FAIL_CLEAR){
        return{
            ...state,
            reviewErrorMessage:''
        }
    }
    if(type === REVIEW_GET_SUCCESS){
        return{
            ...state,
            allReview:payload.data
        }
    }
    return state
}