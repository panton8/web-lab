import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateGenre from './pages/Admin/CreateGenre';
import CreateFilm from './pages/Admin/CreateFilm';
import Users from './pages/Admin/Users';
import Tickets from './pages/user/Tickets';
import Profile from './pages/user/Profile';
import Films from "./pages/Admin/Films";
import UpdateFilm from "./pages/Admin/UpdateFilm";
import Search from './pages/Search';
import FilmDetails from './pages/FilmDetails';
import Genres from './pages/Genres';
import GenreFilm from './pages/GenreFilm';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/Admin/AdminOrders';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/film/:slug" element={<FilmDetails/>} />
      <Route path="/genres" element={<Genres/>} />
      <Route path="/genre/:slug" element={<GenreFilm/>} />
      <Route path="/cart" element={<CartPage/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/dashboard" element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/orders" element={<Tickets/>} />
        <Route path="user/profile" element={<Profile/>} />
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>} />
        <Route path="admin/add-genre" element={<CreateGenre/>} />
        <Route path="admin/add-film" element={<CreateFilm/>} />
        <Route path="admin/film/:slug" element={<UpdateFilm/>} />
        <Route path="admin/films" element={<Films />} />
        <Route path="admin/orders" element={<AdminOrders/>} />
      </Route>
      <Route path="/register" element={<Register/>} />
      <Route path="/forgot-password" element={<ForgotPasssword/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="/*" element={<Pagenotfound/>} />
    </Routes>
  
    </>
  );
}

export default App;