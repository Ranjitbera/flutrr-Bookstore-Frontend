import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Bookstore from './component/Bookstore';

function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route exact path="/" element={<Home/>}/>
        <Route path="/bookview" element={<Bookstore/>} />
    </Routes>
   
    </BrowserRouter>
    
  
  );
}

export default App;
