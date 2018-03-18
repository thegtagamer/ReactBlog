var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/Blog';

module.exports = {
	signup: function(username, name, email, password){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('user').insertOne( {
				"username": username,
				"name": name,
				"email": email,
				"password": password
			},function(err, result){
				assert.equal(err, null);
		    	console.log("Saved the user sign up details.");
			});
		});
	},
	findByUsername: function(userurl, callback){
		MongoClient.connect(url, function(err, db){
			
			db.collection('user').findOne( { username : userurl 
			},function(err, result){
				if(result==null){
					callback(false)
				}
				else{
					callback(result);
				}
			});
		});
	},
	getUserInfo: function(usercred, callback){
		MongoClient.connect(url, function(err, db){
			
			db.collection('user').findOne( { email : usercred 
			},function(err, result){
				if(result==null){
					callback(false)
				}
				else{
					callback(result);
				}
			});
		});
	},
	updateProfile: function(username, name, password, usercred, callback){
		MongoClient.connect(url, function(err, db) {
		  	db.collection('user').updateOne( 
		  		{ "email": usercred },
		  		{ $set: 
					  {
					  "username" : username,
					  "name" : name,
		  			  "password" : password 
		  			}
		  		},function(err, result){
				
		    	if(err == null){
		    		callback(true)
		    	}
		    	else{
		    		callback(false)
		    	}
			});
		});
	},

	validateSignIn: function(usercred, password,callback){
		MongoClient.connect(url, function(err, db){
			
			db.collection('user').findOne( { email : usercred ,password: password 
			},function(err, result){
				if(result==null){
					console.log('returning false')
					callback(false)
				}
				else{
					console.log('returning true')
					callback(true)
				}
			});
		});
	}
}


