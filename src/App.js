import Auth from './Components/Auth';
import './Styles/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardUser from './Components/User/DashboardUser';
import DashboardAdmin from './Components/Admin/DashboardAdmin';
import UsersList from './Components/Admin/UsersManagement/usersList';
import EditUser from './Components/Admin/UsersManagement/editUser';
import AddUser from './Components/Admin/UsersManagement/addUser';
import QuizList from './Components/Admin/QuizManagement/QuizList';
import AddQuiz from './Components/Admin/QuizManagement/AddQuiz';
import EditQuiz from './Components/Admin/QuizManagement/EditQuiz';
import QuestionList from './Components/Admin/QuestionManagement/QuestionList';

function App() {
  return (
    // Dans App.js
<Router>
  <Routes>
    <Route path="/" element={<Auth />} />
    <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
    <Route path="/dashboardUser" element={<DashboardUser />} />
    <Route path="dashboardAdmin/users" element={<UsersList />} />
    <Route path="dashboardAdmin/users/addUser" element={<AddUser />} />
    <Route path="dashboardAdmin/users/editUser/:id" element={<EditUser />} />
    <Route path="/dashboardAdmin/quizzes" element={<QuizList />} />
    <Route path="/dashboardAdmin/quizzes/add" element={<AddQuiz />} />
    <Route path="/dashboardAdmin/quizzes/edit/:quizId" element={<EditQuiz />} />
    <Route path="/dashboardAdmin/quizzes/:quizId/questions" element={<QuestionList />} />
    


  </Routes>
</Router>
);
}

export default App;
