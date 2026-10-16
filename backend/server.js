const bcrypt = require('bcryptjs');
const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
origin: ['http://localhost:5173', 'http://localhost:5174']
}));

// Allow the server to read JSON data
app.use(express.json());

// Open or create our database file
const dbPath = path.resolve('careertrack.db');
const db = new Database(dbPath);

console.log('Database file location:', dbPath);

const users = db.prepare(
'SELECT id, name, email FROM users'
).all();

console.log('Saved users:', users);


// Create a table to store user accounts
db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
`);

app.post('/signup', (req, res) => {
const { name, email, password } = req.body;

if (!name || !email || !password) {
    return res.status(400).json({
    message: 'Please fill in all fields.'
    });
}

if (password.length < 6) {
    return res.status(400).json({
    message: 'Password must be at least 6 characters.'
    });
}

try {
    const hashedPassword = bcrypt.hashSync(password, 12);

    const insertUser = db.prepare(`
    INSERT INTO users (name, email, password)
    VALUES (?, ?, ?)
    `);

    insertUser.run(name.trim(), email.trim().toLowerCase(), hashedPassword);

    res.status(201).json({
    message: 'Account created successfully!'
    });
} catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
return res.status(409).json({
        message: 'This email is already registered.'
    });
    }

    console.error(error);
    res.status(500).json({
    message: 'Something went wrong. Please try again.'
    });
}
});


app.post('/login', (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
    return res.status(400).json({
    message: 'Please enter your email and password.'
    });
}

const user = db.prepare(
    'SELECT * FROM users WHERE email = ?'
).get(email.trim().toLowerCase());

if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
    message: 'Invalid email or password.'
    });
}

res.json({
    message: 'Login successful!',
    user: {
    id: user.id,
    name: user.name,
    email: user.email
    }
});
});


app.get('/', (req, res) => {
res.send('CareerTrack backend and database are running!');
});

app.listen(PORT, () => {
console.log(`Backend running at http://localhost:${PORT}`);
console.log('Database connected successfully!');
});
