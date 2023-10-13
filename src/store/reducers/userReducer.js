import {
    USER_CREATE_SUCCESS, USER_CREATE_FAIL, USER_CREATE_SUCCESS_CLEAR,
    USER_CREATE_FAIL_CLEAR,
    USER_GET_SUCCESS, USER_GET_FAIL, USER_GET_SUCCESS_CLEAR, USER_GET_FAIL_CLEAR
} from '../types/userType';

const userState = {
    successMessage:'',
    lsuccessMessage:'',
    errorMessage:'',
    lerrorMessage:'',
    token:'',
    name:''
}

export const userReducer = (state = userState, action)=>{
    const{payload,type} = action
    if(type === USER_CREATE_SUCCESS){
        return{
            ...state,
            successMessage:payload.successMessage
        }
    }
    if(type === USER_GET_SUCCESS){
        return{
            ...state,
            lsuccessMessage:payload.successMessage,
            token:payload.token,
            name:payload.nameData
        }
    }
    if(type === USER_CREATE_FAIL){
        return{
            ...state,
            errorMessage:payload.errorMessage
        }
    }
    if(type === USER_GET_FAIL){
        return{
            ...state,
            lerrorMessage:payload.errorMessage
        }
    }
    if(type === USER_CREATE_SUCCESS_CLEAR){
        return{
            ...state,
            successMessage:''

        }
    }
    if(type === USER_GET_SUCCESS_CLEAR){
        return{
            ...state,
            lsuccessMessage:''

        }
    }
    if(type === USER_CREATE_FAIL_CLEAR){
        return{
            ...state,
            errorMessage:''

        }
    }
    if(type === USER_GET_FAIL_CLEAR){
        return{
            ...state,
            lerrorMessage:''

        }
    }
    return state

}