const express 		= require('express');
const employeemodel	= require.main.require('./models/employee-model');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/login');
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	employeemodel.validate(user, function(status){
		if(status){
			res.cookie('uname', req.body.username);
			res.redirect('/employee');
		}else{

			// res.redirect('/login');
			// res.send('Invalid');
			res.render('login/error')
            
		}
	});
}); 

module.exports = router;