const Clarifai = require('clarifai') ;

const app = new Clarifai.App({
  apiKey: '46f39683ef22448abdcd5e1c84b17669'
});

const handleApiCall = (req, res) => {
	const { input } = req.body;
	app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
		.then(data => {
			res.json(data)
		})
		.catch(err => res.status(400).json('unable to work with API'))
}


const handleImage = (req, res, db) => {
	const { id } =req.body;
	db('users').where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(enteries => {
			res.json(enteries[0])
		})
		.catch(err => res.status(400).json('unable to get enteries'));	
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}