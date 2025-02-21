import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './auth/AuthContext';

const App = () => {
    const { token } = useContext(AuthContext);

    if (token) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <h1>Welcome to the App</h1>
            <p>Please login or register to continue.</p>
        </div>
    );
};

export default App;