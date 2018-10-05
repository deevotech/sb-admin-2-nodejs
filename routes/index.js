var Bbs = require('../persister/bbs');

module.exports = function(app, passport){
	
	 /* GET home page. */
	app.get('/',isAuthenticated, function(req, res) {
	   res.redirect('/readme');
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/readme',
		failureRedirect: '/login',
		failureFlash : true 
	}));

	app.get('/login', function(req, res) {
	   res.render('template/login', { message: req.flash('message') });
	});

	app.get('/logout', function(req, res) {
	   req.logout();
  	   res.redirect('/');
	});
	
	
	app.get('/signup', function(req, res){
		res.render('template/signup',{ message: req.flash('message') });
	});

	/* Handle Registration POST */
	app.post('/signup', passport.authenticate('signup', {
		successRedirect: '/login',
		failureRedirect: '/signup',
		failureFlash : true 
	}));
	app.get('/readme',isAuthenticated, function(req, res) {
	   res.render('template/readme', {});
	});
	app.get('/dashboard',isAuthenticated, function(req, res) {
	   res.render('template/index', {});
	});
	app.get('/flot',isAuthenticated, function(req, res) {
	   res.render('template/flot', {});
	});
	app.get('/morris',isAuthenticated, function(req, res) {
	   res.render('template/morris', {});
	});
	app.get('/tables',isAuthenticated, function(req, res) {
	   res.render('template/tables', {});
	});
	app.get('/forms',isAuthenticated, function(req, res) {
		res.render('template/forms', {});
	 });
	app.get('/create_log',isAuthenticated, function(req, res) {
	   res.render('template/create_log', {});
	});
	app.get('/init_log',isAuthenticated, function(req, res) {
		res.render('template/init_log', {});
	 });
	app.get('/panelswells',isAuthenticated, function(req, res) {
	   res.render('template/panelswells', {});
	});
	app.get('/buttons',isAuthenticated, function(req, res) {
	   res.render('template/buttons', {});
	});
	app.get('/notifications',isAuthenticated, function(req, res) {
	   res.render('template/notifications', {});
	});
	app.get('/typography',isAuthenticated, function(req, res) {
	   res.render('template/typography', {});
	});
	app.get('/icons',isAuthenticated, function(req, res) {
	   res.render('template/icons', {});
	});
	app.get('/grid',isAuthenticated, function(req, res) {
	   res.render('template/grid', {});
	});
	app.get('/blank',isAuthenticated, function(req, res) {
	   res.render('template/blank', {});
	});
	
  	app.get('/bbs',isAuthenticated, function(req, res) {
	   res.render('template/bbs', {});
	});

	app.get('/org',isAuthenticated, function(req, res) {
		res.render('template/org', {});
	});

	app.get('/party_api',isAuthenticated, function(req, res) {
		res.render('template/party_api', {});
	});

	app.get('/location_api',isAuthenticated, function(req, res) {
		res.render('template/location_api', {});
	});

	app.get('/product_api',isAuthenticated, function(req, res) {
		res.render('template/product_api', {});
	});

	app.get('/asset_api',isAuthenticated, function(req, res) {
		res.render('template/asset_api', {});
	});
	
	app.get('/supplychain_api',isAuthenticated, function(req, res) {
		res.render('template/supplychain_api', {});
	});

	app.get('/log_api',isAuthenticated, function(req, res) {
		res.render('template/log_api', {});
	});

	app.get('/auditor_api',isAuthenticated, function(req, res) {
		res.render('template/auditor_api', {});
	});

	app.get('/audit_action_api',isAuthenticated, function(req, res) {
		res.render('template/audit_action_api', {});
	});

	app.get('/bbs/list',isAuthenticated, function(req, res) {
		 Bbs.find({}, 
	      function(err, bbs) {
	        // In case of any error, return using the done method
	        if (err)
	          return done(err);
	        // Username does not exist, log error & redirect back
	        res.send(bbs);
	      }
	    );
	});

	app.post('/bbs/create',isAuthenticated, function(req, res) {
		
		var newBbs = new Bbs();
		// set the user's local credentials
		newBbs.content = req.param('content');
		newBbs.vote = 0;
		newBbs.username = req.user.username;
		
		// save the user
		newBbs.save(function(err) {
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}
			res.send({"result":true});
		});
	});

	app.post('/bbs/delete',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');
		Bbs.findByIdAndRemove(id,function(err){
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}


			res.send({"result":true});
		})

		
	});
	app.post('/bbs/update',isAuthenticated, function(req, res) {
		// set the user's local credentials
		var id = req.param('id');

		Bbs.findById(id,function(err,bbs){
			if (err){
			  console.log('Error in Saving bbs: '+err);  
			  res.send({"result":false});
			}
			bbs.vote +=1;
			bbs.save(function(){
				res.send({"result":true});	
			})
			
		})
	});
}
	// As with any middleware it is quintessential to call next()
	// if the user is authenticated
	var isAuthenticated = function (req, res, next) {
	  if (req.isAuthenticated())
	    return next();
	  res.redirect('/login');
	}



