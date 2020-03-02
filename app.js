const express= require("express"),
	app= express(),
	mongoose=require("mongoose"),
	passport=require("passport"),
	bodyParser=require("body-parser"),
	User=require("./models/user"),
	LocalStrategy=require("passport-local"),
	passportLocalMongoose=require("passport-local-mongoose");

	
mongoose.connect("mongodb://localhost:27017/authdemo",{useUnifiedTopology: true});
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
	secret:"Ozymandias is the key",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login")
}

//ROUTES==========
//======

app.get('/',(_, res)=>{
	res.render("home");

});
app.get("/secret",isLoggedIn,function(req, res){
	res.render("secret");
});

//AUTH ROUTES
app.get("/register", (req, res)=>{
	res.render("register");
});
app.post("/register", (req, res)=>{
	req.body.usernamebody
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
		});
	});
});

//LOGIN ROUTES
//render login page
app.get("/login", function(req, res){
	res.render("login");
});
//login logic
//middleware
app.post("/login", passport.authenticate("local",{
	successRedirect: "/secret",
	failureRedirect: "/login"
}),function(req, res){
});
//logout
app.get("/logout",function(req, res){
	req.logout();
	res.redirect("/");
});

app.listen(process.env.PORT||3000, process.env.IP, ()=>{
	console.log("Server started");
});