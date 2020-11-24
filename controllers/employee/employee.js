const express = require('express');
const router = express.Router();
const employeemodel	= require.main.require('./models/employee-model');


var name1;

router.get('*', function (req, res, next) {
	name1 = req.cookies['uname'];
	if (req.cookies['uname'] == null) {
		res.redirect('/login');
	} else {
		next();
	}
});

router.get('/', function (req, res) {
	
	res.render('employee/index', {name: name1});
	// employeemodel.getByUname(function(results){
	// 	res.render('employee/index', {
	// 		user: result
	// 	});
	// });
	// {name: name1}
	// req.cookies['uname']

	// userModel.getById(req.cookies['uname'], function (result){
	// 	res.render('user/edit', {
	// 		user: result
	// 	});
	// 	// res.redirect('home/userprofile');
	// });

	// res.render('employee/index', {name: name1});

	
});


router.get('/profile', function (req, res) {
	employeemodel.getByUname(req.cookies['uname'],function (result){
		res.render('employee/profile', {
			user: result
		});
	});
});

router.post('/profile', function (req, res) {
	
	var user = {
		username: req.body.username,
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone
	}

	employeemodel.updateProfile(user, function (status) {
		if (status) {
			res.redirect('/employee/profile');
		} else {
			res.redirect('/logout');
		}
	});

	

	
});

// /employee/profile/changepassword
	
router.get('/profile/changepassword', function (req, res) {
	employeemodel.getByUname(req.cookies['uname'],function (result){
		res.render('employee/changepassword', {
			user: result
		});
	});
});

router.post('/profile/changepassword', function (req, res) {
	name1 = req.cookies['uname']; 
	var user = {
		username: name1,
		oldpassword: req.body.oldpassword,
		newpassword: req.body.newpassword
	}

	// employeemodel.getPassword(req.cookies['uname'],function (result){
	// 	res.render( {
	// 		user: result
	// 	});
	// });

	if(user.newpassword == user.oldpassword){
		employeemodel.updatePassword(user, function (status) {
			if (status) {
				res.redirect('/employee/profile');
			} else {
				res.redirect('/employee.index');
			}
		});
	}else{
		res.redirect('/login')
		
	}


});


router.get('/product', function (req, res) {
	res.render('employee/addproduct', {name: name1});
});

// image file uploading is not working
router.post('/product', function (req, res) {
	// res.render('employee/addproduct', {name: name1});


// 	if (!req.files){
	
// 	var user = {
// 		post: req.body,
// 		id: req.body.product_id,
// 		name: req.body.product_name,
// 		description: req.body.product_description,
// 		price: req.body.price,
// 		category: req.body.product_category,
// 		stockalert: req.body.stock_alert,
// 		// file: req.files.uploaded_image,
// 		file: req.files.uploaded_image,
// 		img_name: file.name
// 	}
// 	return res.status(400).send('No files were uploaded.');
// }

// 	if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

// 		file.mv('public/img/upload_images/'+file.name, function(err) {
                             
// 			if (err)

// 			  return res.status(500).send(err);
// 			  employeemodel.addproduct(user, function (status) {
// 				if (status) {
// 					res.send('submitted');
// 				} else {
// 					res.redirect('/employee/product');
// 				}
// 			});

// 		 });
// 		} else {
// 	  message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
// 	  res.render('index.ejs',{message: message});
// 	}

		
var user = {
			id: req.body.product_id,
			name: req.body.product_name,
			description: req.body.product_description,
			price: req.body.price,
			category: req.body.product_category,
			stockalert: req.body.stock_alert

		}
		employeemodel.addproduct(user, function (status) {
				if (status) {
				res.send('submitted');

				} else {
				res.redirect('/employee/product');
				}
				});


});


router.get('/productlist', function (req, res) {
	employeemodel.getallproduct(function (results) {
		if (results.length > 0) {
			res.render('employee/viewproduct', {
				productlist: results
			});
		} else {
			res.render('employee/index', {
				userlist: results
			});
		}
	});
	
});











module.exports = router;
