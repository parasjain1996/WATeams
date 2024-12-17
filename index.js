const express = require('express'); // Import express
const app = express();              // Create an express application
const PORT = 3000;                  // Define the port to run the server

// Define a GET route
app.get('/', (req, res) => {
    res.send('Hello, World!');      // Send response
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
