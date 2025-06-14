import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserList from './pages/UserList.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/users" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
