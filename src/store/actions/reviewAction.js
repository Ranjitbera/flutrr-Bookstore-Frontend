import axios from 'axios'
import { REVIEW_ADD_FAIL, REVIEW_ADD_SUCESS,REVIEW_GET_SUCCESS } from '../types/reviewType';


export const addReview =(data)=>{
    return async(dispatch)=>{
        try{
            let response = await axios.post('http://localhost:8080/user/addreview',data);
            dispatch({
                type:REVIEW_ADD_SUCESS,
                payload:{
                    message:response.data.message
                }
            })

        }catch(error){
            let data = error.response.data.message;
            dispatch({
                type:REVIEW_ADD_FAIL,
                payload:{
                    message:data
                }
            })
        }
    }
}

export const getAllReview = (data)=>{
    return async(dispatch)=>{
        try{
            let response = await axios.get(`http://localhost:8080/user/get-all-review/${data}`)
            dispatch({
                type:REVIEW_GET_SUCCESS,
                payload:{
                    data:response.data.data
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}