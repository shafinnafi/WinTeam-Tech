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







module.exports = router;
