import { Route,Routes,HashRouter} from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import Cart from './components/Cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Footer from './components/Footer';
import User from './pages/User';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const {drawer} = useSelector(state => state.drawer);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);
  return (
    <div>
      <HashRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='detail/:id' element={<Detail/>}/>
        <Route path='login' element={<SignIn/>}/>
        <Route path='signup' element={<SignUp/>}/>
        {user && <Route path='user' element={<User/>}/>}
        
      </Routes>
      {drawer && <Cart/>}
      <Footer/>
      </HashRouter>
    </div>
  )
}

export default App
