const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.ygmxs.mongodb.net/mongoclass?retryWrites=true&w=majority')

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const Url = require('./Url');
const router = express.Router();
router.get('/', (req,res)=>{
	res.json({message:'Hooray! welcome to my API!'});
})

router.get('/new/:new_url', (req,res)=>{
	// todo

	// It will add a new url inside the database

	Url.count((err,count)=>{
		if (err) res.json({message:'Something is wrong try again!'})
		var url = new Url();
		url.originalUrl = req.params.new_url;
		url.shortUrl = count++;
		url.save((err)=>{
			res.json({
				"short_url":"http://localhost:8080/"+url.shortUrl,
				"original_url":url.originalUrl});
	})
})

	// It will give you the url of the database, which is it's count
	// If the url exists alrady .. it will give you whatever number that is 
	// inside db
	// 1) facebook 2) google 3) anak2u 4) facebook - 1
	// Fix the https:// issue
})

	// you check the database.. -> return the number first 
	// check for the number and (redirect)
	// to that page
router.get('/:short_url', (req,res)=>{
	// to do 
	// Return an object, find is return an array
	Url.findOne({shortUrl:req.params.short_url}, (err,url)=>{
	if (err) res.json({message:"Something went wrong"})
		console.log(url)
		res.redirect("https://"+url.originalUrl);
})


})

app.use(router);

app.listen(port);
console.log("Running on port "+port)
