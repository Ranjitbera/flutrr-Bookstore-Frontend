import { BOOK_ADD_SUCCESS,BOOK_ADD_FAIL ,BOOK_GET_SUCCESS, GET_SINGLE_BOOK, GET_SUGGESTED_BOOK} from "../types/bookType";
import axios from 'axios'

export const bookAdd = (data)=>{
    return async(dispatch)=>{
        try{
            let response = await axios.post('http://localhost:8080/user/addbook',data)
            dispatch({
                type:BOOK_ADD_SUCCESS,
                payload:{
                    message:response.data.message
                }
            })

        }
        catch(error){
            let data = error.response.data.message
            dispatch({
                type: BOOK_ADD_FAIL,
                payload:{
                    errorMessage:data
                }
            })
        }
    }
}

export const getBooks = ()=>{
    return async(dispatch)=>{
        try{
            let response = await axios.get('http://localhost:8080/user/getbooks')
            dispatch({
                type:BOOK_GET_SUCCESS,
                payload:{
                    data:response.data.data
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const getSingleBook = (data) =>{
    return async(dispatch)=>{
        try{
            let response = await axios.get(`http://localhost:8080/user/get-single-book/${data}`)
            dispatch({
                type:GET_SINGLE_BOOK,
                payload:{
                    data:response.data.data
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const getSuggestedBook = () =>{
    return async(dispatch)=>{
        try{
            let response = await axios.get(`http://localhost:8080/user/get-suggested-book`)
            dispatch({
                type:GET_SUGGESTED_BOOK,
                payload:{
                    data:response.data.data
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}