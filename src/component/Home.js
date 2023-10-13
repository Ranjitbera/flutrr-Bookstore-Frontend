import React, { useEffect, useState } from 'react'
import './style.css'
import Register from './Register'
import { useSelector, useDispatch } from 'react-redux';
import Bookstore from './Bookstore'
import { bookAdd, getBooks, getSuggestedBook } from '../store/actions/bookAction';
import { BOOK_ADD_SUCCESS_CLEAR, BOOK_ADD_FAIL_CLEAR } from '../store/types/bookType';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const { bookSuccessMessage, BookErrorMessage, books, suggestedBooks} = useSelector((state) => state.book)


    const [loginToggle, setLoginToggle] = useState(localStorage.getItem('token'));
    const [bookToggle, setBookToggle] = useState(false);
    const [lrToggle, setLrToggle] = useState('');

    const itemsPerPage = 8;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage-1)*itemsPerPage;
    const endIndex = startIndex+itemsPerPage;

    const currentData = books.slice(startIndex,endIndex);

    const totalPages = Math.ceil(books.length/itemsPerPage);

    const handlePageChange = (data)=>{
        setCurrentPage(data)
    }
  
    const dispatch = useDispatch();
    const navigate1 = useNavigate();

    const name = localStorage.getItem('name')
    useEffect(()=>{
        dispatch(getBooks())
    },[])

    useEffect(()=>{
        dispatch(getSuggestedBook())
    },[])
    console.log('536546356',suggestedBooks)
    const logoutHandler = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to log out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
          }).then((result) => {
            if (result.isConfirmed) {

              Swal.fire(
                'Logged Out!',
                'You have successfully logged out.',
                'success'
              )
              localStorage.removeItem('token');
            setLoginToggle(false)
            }
          })
        
    }

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        url: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(bookAdd(formData))
    };


    useEffect(() => {
        if (bookSuccessMessage) {
            setFormData({
                title: '',
                author: '',
                url: '',
            })
            Swal.fire({
                icon: 'success',
                title: bookSuccessMessage,
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                dispatch({ type: BOOK_ADD_SUCCESS_CLEAR })
                setBookToggle(false)
            }).then(()=>{
                dispatch(getBooks())
            })
        }


        if(BookErrorMessage){
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: BookErrorMessage,
            }).then(()=>{
                dispatch({BOOK_ADD_FAIL_CLEAR})
            })
        }
    },[bookSuccessMessage,BookErrorMessage])


    return (
        // <Bookstore/>
        <div>
            {lrToggle ? <Register lrToggle={lrToggle} setLrToggle={setLrToggle} setLoginToggle={setLoginToggle} /> :
                <div className='home-main'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container">
                            <a className="navbar-brand" href="#"><span class="text-warning">BOOK.</span>Store</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {!loginToggle ? <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id='lg'>
                                    <li className="nav-item">
                                        <button type="button" onClick={() => setLrToggle('login')} class="btn btn-outline-success">Login</button>
                                    </li>

                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-info" onClick={() => setLrToggle('register')}>Register</button>
                                    </li>
                                </ul>
                            </div> : <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
                                    <li className="nav-item">
                                        <i className="fa fa-user" style={{ marginTop: '5px', fontSize: '22px', marginRight: '5px' }}></i>
                                    </li>

                                    <li className="nav-item">
                                        <span className="navbar-brand">{name}</span>
                                    </li>
                                    <li className='nav-item'>
                                        <button type="button" onClick={logoutHandler} class="btn btn-warning">Logout</button>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                    </nav>

                    {loginToggle &&
                        <div className="container">
                            <button type="button" onClick={()=>setBookToggle(!bookToggle)} class="btn btn-primary" style={{ marginTop: '3%' }}>{bookToggle?'close':'Add new Book'}</button>
                        </div>}
                    <div className="container">

                        {bookToggle && <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-center">Add New Book</h2>

                                    <div className="form-group">
                                        <label htmlFor="title">Title:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="title"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            placeholder="Enter title"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="author">Author:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="author"
                                            name="author"
                                            value={formData.author}
                                            onChange={handleInputChange}
                                            placeholder="Enter author"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="url">URL:</label>
                                        <input
                                            type="url"
                                            className="form-control"
                                            id="url"
                                            name="url"
                                            value={formData.url}
                                            onChange={handleInputChange}
                                            placeholder="Enter URL"
                                            required
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '3%', marginLeft: '44%' }}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>}
                    </div>

                    <div className="container-xxl" style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'flex-start',justifyContent:'space-between' }}>
                        {books && books.length>0?currentData.map((value)=>{
                            return   <div class="card" onClick={()=>navigate1(`/bookview?${value._id}`)} style={{ width: '18rem', marginTop: '3%',cursor:'pointer'}}>
                            <img src={value.url} class="card-img-top" alt="..." height='150px' />
                            <div class="card-body">
                                <h5 class="card-title">Tittle: {value.title}</h5>
                                <p class="card-text">Author: {value.author}</p>
                                <p class="card-text">Ratings: {value.overallRating}</p>
                            </div>
                        </div>
                        }):null
                      }
                
                    </div>
                </div>}
           {!lrToggle && <div className='container' style={{marginTop:'1%'}}>
                        <button onClick={()=>handlePageChange(currentPage-1)}
                        disabled={currentPage===1}
                        className="btn btn-primary btn-block"
                        >Previous </button>
                        <span> {currentPage} of {totalPages} </span>
                        <button onClick={()=>handlePageChange(currentPage+1)}
                        className="btn btn-primary btn-block"
                        disabled= {currentPage === totalPages}
                        >Next</button>
                    <hr/>
                    </div>}
                    
            {!lrToggle && <div className='container'>
                        <h2>Suggested Books</h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'flex-start',justifyContent:'space-between' }}>
                        
                        {suggestedBooks && suggestedBooks.length>0?suggestedBooks.map((value)=>{
                            return   <div class="card" onClick={()=>navigate1(`/bookview?${value._id}`)} style={{ width: '18rem', marginTop: '3%',cursor:'pointer'}}>
                            <img src={value.url} class="card-img-top" alt="..." height='150px' />
                            <div class="card-body">
                                <h5 class="card-title">Tittle: {value.title}</h5>
                                <p class="card-text">Author: {value.author}</p>
                                <p class="card-text">Ratings: {value.overallRating}</p>
                            </div>
                        </div>
                        }):null
                      }
                      </div>
                    </div>}
        </div>
    )
}
