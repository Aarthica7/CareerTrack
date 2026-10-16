
import { useState } from 'react';
import './Login.css';

function Login({ onLogin, onSwitchToSignup })  {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');


async function handleLogin(event) {
event.preventDefault();

try {
    const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email,
        password
    })
    });

    const data = await response.json();

    if (!response.ok) {
    alert(data.message);
    return;
    }

    alert(`Welcome, ${data.user.name}!`);
    onLogin();
} catch (error) {
    alert('Cannot connect to the server. Make sure the backend is running.');
}
}


return (
    <div className="login-page">
    <div className="login-card">
        <h1>CareerTrack</h1>
        <p>Welcome back! Please log in.</p>

        <form onSubmit={handleLogin}>
        <label>Email Address</label>
    <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
        />

    <label>Password</label>
        <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
/>

        <button type="submit">Login</button>
        </form>

        <p>
        Don't have an account?
<a
href="#signup"
onClick={(event) => {
    event.preventDefault();
    onSwitchToSignup();
}}
>
Sign up
</a>

        </p>
    </div>
    </div>
);
}

export default Login;
