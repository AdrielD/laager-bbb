const express = require('express');
const app = express();
const path = require('path');
const port = 3000

app.use(express.static(path.join(__dirname, 'dist')));

app.listen(port, '0.0.0.0', () => {
  console.log(`Web server started at http://0.0.0.0:${port}`)
});
