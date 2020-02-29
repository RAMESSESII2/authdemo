const express= require("express"),
	app= express();
app.set('view engine', 'ejs');

app.get('/',(_, res)=>{
	res.render("home");

});
app.listen(process.env.PORT||3000, process.env.IP, ()=>{
	console.log("Server started");
});
