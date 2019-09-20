const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const server = http.createServer(app);
const publicPath = path.join(__dirname, "../Client");
const port = process.env.PORT || 3000;
app.use(express.static(publicPath));
server.listen(port, () => console.log(`Starting server on port ${port}`));
