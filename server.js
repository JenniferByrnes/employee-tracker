// Define paths to express and routes
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
//const htmlRoutes = require('./routes/htmlRoutes');

// Set port to be assigned or default to 3001
const PORT = process.env.PORT || 3004;
// Instantiate the server
const app = express();

// Connects our CSS and JavaScript files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', apiRoutes);
//app.use('/', htmlRoutes);

// Make express server listen - must be last
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});