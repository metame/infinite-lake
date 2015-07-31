var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 8000;

// Place all angular files in /app directory
app.use(express.static(path.join(__dirname,'/app')));
// Require any bower dependencies in html files at 'localhost:port/bower_components/*'
app.use('/bower_components', express.static(path.join(__dirname,'/bower_components')));

app.listen(port, function(){
    console.log('Server started at %s', port);
});