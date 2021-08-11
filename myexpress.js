const express = require('express');
const app = express();
var bodyParser = require('body-parser')
var cors = require('cors')
var jwt = require('jsonwebtoken');

let user_db = [{
    id: 1,
    email: "alimo@gmail",
    first_name: "ali",
    last_name: "mon",
    gender: "male"
}]

let store_tokan;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
})

function generateAccessToken(username) {
    return jwt.sign(username, "secract", { expiresIn: '1000s' });
}

function authenticateToken(req, res, next) {

    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, "secract", (err, decode) => {

            if (err) return res.sendStatus(403)

            if (decode) {
                console.log(decode);
                next()
            }

        })
    } else {
        // Forbidden
        res.sendStatus(403);
        res.json({ error: 'tokan invalide..' })
    }
}

app.post('/login', (req, res) => {
    if (req.body.username && req.body.password) {
        res.status(200);
        store_tokan = generateAccessToken({ name: req.body.username });
        res.json({ massage: 'Login sussfully..', tokan: store_tokan });
    } else {
        res.status(500);
        res.json({ massage: 'Login faild..' })
    }
})

app.get('/me', authenticateToken, (req, res) => {
    res.status(200).json({ massage: "Prfoile me suffuly..." })
})

app.get('/get', (req, res) => {
    // res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.end(JSON.stringify(user_db));
})

app.post('/post', (req, res) => {
    if (!req.body.first_name && !req.body.last_name) {
        res.status(400);
        return res.json({ error: "requed filed are missing" })
    }

    const user = {
        id: user_db.length + 1,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
    }
    console.log(user);
    user_db.push(user);
    res.json({ meassge: "Psot sussfully" });
})

app.put('/put/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    console.log(id);
    let index = user_db.findIndex(e => { return e.id == id })
    console.log(index);
    if (index < 0) {
        res.status(404)
        res.json({ massage: "error not found id" })
    } else {
        let userData = user_db[index];
        userData.email = req.body.email;
        userData.first_name = req.body.first_name;
        userData.last_name = req.body.last_name;

        res.status(200)

        console.log("index-->" + index);
        res.json({ message: "put sccesfully" })
    }

})

app.delete('/delete/:id', (req, res) => {
    const id = Number.parseInt(req.params.id);
    let index = user_db.findIndex(e => { return e.id == id })

    if (!index) {
        res.status(404)
        res.json({ massage: "not found detete id" })
    } else {
        user_db.splice(index, 1);
        res.status(200)
        res.json({ massage: "Sussfully deleted" })
    }

})

app.listen(3000, () => console.log('Server running on 3000'));