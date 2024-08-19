import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Test from './Pages/Test';
import ProtectedRoute from './Routes/ProtectedRoute';





function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Test" element={<Test/>} />
        <Route path="/Dashboard" element={<ProtectedRoute element={Home} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
