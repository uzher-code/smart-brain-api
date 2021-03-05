const jwt = require('jsonwebtoken');
const redis = require('redis');
const redisClient = require('./redisClient').redisClient;

const handleRegister = (req, res, db, bcrypt) => {
	const { email, password, name } = req.body;
	if (!email || !name || !password) {
		return Promise.reject('incorrect form submission');
	}
	const hash = bcrypt.hashSync(password)
	return db.transaction(trx => {
		trx('login')
			.insert({
				email: email,
				hash: hash
			})
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						email: loginEmail[0],
						name: name,
						joined: new Date()
					})
					.then(user => user[0])
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
	.catch(err => Promise.reject('Can not register'));
}

const getAuthTokenId = (req, res) => {
	const { authorization } = req.headers;
	return redisClient.get(authorization, (err, reply) => {
		if (err || !reply) {
			return res.status(400).json('Unauthorized')
		}
		return res.json({id: reply});
	})
}

const signToken = (email) => {
	const jwtPayload = { email };
	return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days'});
}


const setToken = (key, value) =>  {
	return Promise.resolve(redisClient.set(key, value))
}

const createSessions = (user) => {
	const { email, id } = user;
	const token = signToken(email);
	return setToken(token, id)
		.then(() => {
			console.log("REGISTER!!!!!", redisClient); 
			return { success: 'true', id: id, token: token}
		})
		.catch(console.log)
}

const registerAuthentication = (req,res,db,bcrypt ) => {
	const { authorization } = req.headers;
	return authorization ? getAuthTokenId(req, res):
		handleRegister(req,res,db,bcrypt)
			.then(data => {
				return data.id && data.email ? createSessions(data) : Promise.reject(data)})
			.then(session => res.json(session))
			.catch(err=> res.status(400).json(err))

}
module.exports = {
	registerAuthentication: registerAuthentication
}