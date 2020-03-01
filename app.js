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
app.use(require("express-session")({
	secret:"Ozymandias is the key",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/',(_, res)=>{
	res.render("home");

});

app.get("/secret",function(req, res){
	res.render("secret");
});
app.listen(process.env.PORT||3000, process.env.IP, ()=>{
	console.log("Server started");
});