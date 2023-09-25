const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const cors = require('cors')
const { Pool } = require('pg')
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Handle cors error
app.use(cors())

// Parse request body
app.use(express.json())

// --------------------

const { DATABASE_URL, SECRET_KEY } = process.env;

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function getPostgresVersion() {
    const client = await pool.connect();
    try {
        const res = await client.query('SELECT version()');
        console.log(res.rows[0]);
    } finally {
        client.release();
    }
}

getPostgresVersion();

// ----------------

app.post('/login', async (req, res) => {
    const client = await pool.connect()
    try {
        const result = await client.query('SELECT * FROM usersdb WHERE email = $1', [req.body.email])

        const user = result.rows[0]

        if (!user.email && !user.password) return res.status(400).json({ message: "Email or password is incorrect" })

        const passwordIsInvalid = await bcrypt.compare(req.body.password, user.password)
        if (!passwordIsInvalid) return res.status(401).json({ auth: false, token: null })

        let token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: 86400 })
        res.status(200).json({ auth: true, token: token })
        console.log(user)
    } catch (error) {
        console.error('Error: ', error.message)
        res.status(500).json({ error: error.message })
    } finally {
        client.release()
    }
})

//------------->
app.post('/signup', async (req, res) => {
    const client = await pool.connect()
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            created_at: new Date().toISOString()
        }

        const hashedPassword = await bcrypt.hash(data.password, 12)

        const userResult = await client.query('SELECT * FROM usersdb WHERE email = $1', [data.email])

        if (userResult.rows.length > 0) {
            return res.status(400).json({ message: "Username is already taken." })
        }

        await client.query('INSERT INTO usersdb (name, email, password, created_at) VALUES ($1, $2, $3, $4)', [data.name, data.email, hashedPassword, data.created_at])

        res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        console.error('Error: ', err.message)
        res.status(500).json({ error: err.message })
    } finally {
        client.release()
    }
})

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname + '/404.html'))
})

app.listen(port, () => {
    console.log(`App is alive at ${port}`);
})
