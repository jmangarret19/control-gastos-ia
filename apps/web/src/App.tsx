import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const { isAuthenticated } = useAuth();
    return !isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        </Routes>
    )
}

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <Router>
                    <AppRoutes />
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
