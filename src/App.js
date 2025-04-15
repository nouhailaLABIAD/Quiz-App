import Auth from './Components/Auth';
import './Styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardUser from './Components/User/DashboardUser';
import DashboardAdmin from './Components/Admin/DashboardAdmin';
function App() {
  return (
    // Dans App.js
<Router>
  <Routes>
    <Route path="/" element={<Auth />} />
    <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
    <Route path="/dashboardUser" element={<DashboardUser />} />
  </Routes>
</Router>
);
}

export default App;
