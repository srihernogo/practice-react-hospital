import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Banner from './Pages/Home/Banner/Banner';
import Doctors from './Pages/Doctors/Doctors/Doctors';
import Home from './Pages/Home/Home/Home';
import Patients from './Pages/Patients/Patients';
import Footer from './Pages/Shared/Footer/Footer';
import Header from './Pages/Shared/Header/Header';
import Staffs from './Pages/Staffs/Staffs';
import Appointment from './Pages/Appointments/Appointment';
import AddDoctor from './Pages/Doctors/AddDoctor/AddDoctor';
import Registration from './Pages/Login/Registration/Registration';
import PatientViewDoctor from './Pages/Doctors/Doctors/PatientViewDoctor';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="doctors" element={<PatientViewDoctor />} />
          <Route path="addDoctor" element={<AddDoctor />} />
          <Route path="patients" element={<Patients />} />
          <Route path="staffs" element={<Staffs />} />
          <Route path="appointment" element={<Appointment />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
