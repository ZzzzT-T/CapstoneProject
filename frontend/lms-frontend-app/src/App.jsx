import { AuthProvider } from './components/AuthContext';
import Layout from './components/Layout';
import UserLogin from './components/UserLogin';
import RegistrationForm from './components/RegistrationForm';
import HomePage from './components/HomePage';
import Logout from './components/Logout';
import BookManagement from './components/BookManagement';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/bookmanagement" element={<BookManagement />} />
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;