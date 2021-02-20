const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcryptjs');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const morgan = require('morgan');
const auth = require('./controllers/authorization');


const db = knex({
  client: 'pg',
  connection: process.env.POSTGRES_URI
});

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(cors());


app.get('/', (req, res) =>{
	res.send('success');
})

app.post('/signin', (req, res) => { signin.signinAuthentication(req, res, db, bcrypt) });

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) });

app.get('/profile/:id',  auth.requireAuth, (req, res) => { profile.handleProfileGet(req, res, db) });

app.post('/profile/:id', auth.requireAuth, (req, res) => { profile.handleProfileUpdate(req, res, db) });

app.put('/image', auth.requireAuth, (req, res) => { image.handleImage(req, res, db) });

app.post('/imageurl', auth.requireAuth, image.handleApiCall);

app.listen(3000,() => {
	console.log('app is running on port 3000')
})