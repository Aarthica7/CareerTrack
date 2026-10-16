
import { useState } from 'react';
import './Login.css';

function Signup({ onSignup, onSwitchToLogin }) {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');


async function handleSignup(event) {
event.preventDefault();

if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
}

try {
    const response = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name,
        email,
        password
    })
    });

    const data = await response.json();

    if (!response.ok) {
    alert(data.message);
    return;
    }

    alert('Account created successfully! Please log in.');
    onSignup();
} catch (error) {
    alert('Cannot connect to the server. Make sure the backend is running.');
}
}



return (
    <div className="login-page">
    <div className="login-card">
        <h1>CareerTrack</h1>
        <p>Create your account to get started.</p>

        <form onSubmit={handleSignup}>
        <label>Full Name</label>
        <input
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
    />

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
            placeholder="Create a password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
        />

        <label>Confirm Password</label>
        <input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
        />

        <button type="submit">Create Account</button>
        </form>

        <p>
        Already have an account?{' '}
        <a
            href="#login"
            onClick={(event) => {
            event.preventDefault();
            onSwitchToLogin();
            }}
        >
            Login
        </a>
        </p>
    </div>
    </div>
);
}

export default Signup;
