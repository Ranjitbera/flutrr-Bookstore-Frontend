import React, { useEffect ,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleBook } from '../store/actions/bookAction';
import { addReview, getAllReview } from '../store/actions/reviewAction';
import { REVIEW_ADD_FAIL_CLEAR, REVIEW_ADD_SUCESS_CLEAR } from '../store/types/reviewType';
import Swal from 'sweetalert2'

export default function Bookstore() {
  const {singleBook} = useSelector((state)=>state.book)
  const {reviewSuccessMessage,reviewErrorMessage,allReview} = useSelector((state)=>state.review)
  const dispatch = useDispatch()
  const currentURL = window.location.href;
  const [url,id] = currentURL.split('?')
const [feedbackOpen,setFeedbackOpen] = useState(false)
const isAuthenticate = localStorage.getItem('token')

useEffect(()=>{
  dispatch(getSingleBook(id))
},[reviewSuccessMessage])

useEffect(()=>{
  dispatch(getAllReview(id))
},[])

console.log('432432323',allReview)

useEffect(()=>{
  if(reviewSuccessMessage){
    Swal.fire({
  
      icon: 'success',
      title: reviewSuccessMessage,
      showConfirmButton: false,
      timer: 1500
    }).then(()=>{
      dispatch({type:REVIEW_ADD_SUCESS_CLEAR})
    }).then(()=>{
      setFeedbackOpen(false)
      window.location.reload()
    })
  }
  if(reviewErrorMessage){
    Swal.fire({
      icon: 'error',
      title: 'error',
      text: reviewErrorMessage,
    }).then(()=>{
      dispatch({type:REVIEW_ADD_FAIL_CLEAR})
    })
  }
},[reviewSuccessMessage,reviewErrorMessage])

  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fData = {
      name:formData.name,
      rating:formData.rating,
      comment:formData.comment,
      bookId:id
    }
   dispatch(addReview(fData))
  };

  console.log(id)
  return (
 <div className="container book-detail">
      <div className="row">
        <div className="col-md-4 book-image">
          <img src={singleBook.url} alt="Book Cover" className="img-fluid"/>
        </div>
        <div className="col-md-8 book-info">
          <h2 className="book-title">Book Title: {singleBook.title}</h2>
          <p className="book-author">Author: {singleBook.author}</p>
          <div className="book-rating">
            <span className="rating">Rating : {singleBook.overallRating}</span>
          </div>
{isAuthenticate && <button className="btn btn-primary btn-block" onClick={()=>setFeedbackOpen(true)} style={{marginTop:'3%',marginBottom:'1%'}}>Add New Review</button>}
    {feedbackOpen && <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h2 className="text-center">Feedback Form</h2>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <select
                className="form-control"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Comment:</label>
              <textarea
                className="form-control"
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Enter your feedback"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary btn-block" style={{marginTop:'3%',marginLeft:'40%'}}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>}
    <h3>Reviews</h3>
    {allReview && allReview.length>0?
      allReview.map((value)=>{
        return <div className="book-reviews">
            
            <ul>
              <li>Reviewer Name: {value.name}</li>
              <li>Rating: {value.rating}</li>
              <li>Comment: {value.comment}</li>
            </ul>
            <hr/>
          </div>
      }):null
    }

        </div>
      </div>
    </div>
  );
};




