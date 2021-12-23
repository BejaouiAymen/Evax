import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router , Routes ,Route } from 'react-router-dom';
import Dashboard from './pages/AdminPage/Dashboard/Dashboard';
import VaccinationCenter from './pages/AdminPage/VaccinationCenter/VaccinationCenter'
import RendezVous from './pages/AdminPage/RendezVous/RendezVous'
import AdminSideBar from './pages/AdminPage/Vaccin/Vaccin'
import Jpo from './pages/AdminPage/JPO/Jpo'
import AddCenter from './pages/AdminPage/VaccinationCenter/AddCenter/AddCenter';
import CenterDetail from './pages/AdminPage/VaccinationCenter/CenterDetail/CenterDetail';
import Home from './pages/Visitor/Home/Home'
import Contact from './pages/Visitor/Contact/Contact'
import Inscription from './pages/Authentication/Inscription/Inscription';
import Login from './pages/Authentication/Login/Login';
import testtttt from "./components/Ville/AddVilleForm/Ville";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/vaccinationCenter" element={<VaccinationCenter/>}/>
        <Route path="/rendezvous" element={<RendezVous/>}/>
        <Route path="/vaccin" element={<AdminSideBar/>}/>
        <Route path="/jpo" element={<Jpo/>}/>
        <Route path="/addCenter" element={<AddCenter/>}/>
        <Route path="/centerDetail" element={<CenterDetail/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/contactUs" element={<Contact/>}/>
        <Route path="/inscription" element={<Inscription/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route exact path="/ville" component={testtttt} />

      </Routes>
    </Router>
      
    
  );
}

export default App;
