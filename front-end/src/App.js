import './App.css';
import Nav from './components/nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/signup';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import ProfilePage from './components/Profilepage';
import UpdatePage from './components/updatepage';
function App() {
  return (
    <div className="App ">
      <div className='App-header'>
      <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<PrivateComponent />}>
        <Route path='/' element={<ProductList/>} />
        <Route path='/add' element={<AddProduct />} />
        <Route path='/update/:id' element={<UpdateProduct />} />
        <Route path='/update' element={<UpdatePage />} />
        <Route path='/logout' element={<h1>Logout Listing Component</h1>} />
        <Route path='/profile' element={<ProfilePage />} />
        </Route>
        <Route path='/login' element={< Login />}/>
        <Route path='/signup' element={< SignUp />}/>
      </Routes>
      </BrowserRouter>
      </div>
     
      <Footer/>
    </div>
  );
}

export default App;
