const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from employee where username=? and password=?";
		db.getResults(sql, [user.username, user.password], function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getByUname: function(username, callback){
		var sql = "select * from employee where username=?";

		db.getResults(sql, [username], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},
	// updateProfile: function (user, callback) {
	// 	var sql = "update employee set  name=? ,email=?, phone=?  where username=? ";
	// 	db.execute(sql, [ user.name, user.email, user.phone,  user.username  ], function (status) {
	// 		if (status) {
	// 			callback(true);
	// 		} else {
	// 			callback(false);
	// 		}
	// 	});
	// },

	updatePassword: function (user, callback) {
		var sql = "update employee set password=?  where username=? ";
		db.execute(sql, [ user.newpassword, user.username ], function (status) {
			if (status) {
				callback(true);
			} else {
				callback(false);
			}
		});
	},

	getPassword: function (user, callback) {
		var sql = " select password from employee where username=?";
		db.execute(sql, [ user.username ], function (results) {
			if (results.length > 0) {
				callback(results[0]);
			} else {
				callback(null);
			}
		});
	},




	getAll: function(callback){
		var sql = "select * from employee";
		db.getResults(sql, null, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){

	},
	update:function(user, callback){

	},
	delete: function(id, callback){

	}
}