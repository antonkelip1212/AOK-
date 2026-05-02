const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Catch-all route is not needed for a simple static site
// express.static already handles serving index.html for the root path

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
