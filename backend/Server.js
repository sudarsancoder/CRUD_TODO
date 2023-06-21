const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT | 5000;
const routes = require("./routes/TaskRoute");

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Mongo db is connected"))
.catch((err)=> console.log(err));

app.use("/api",routes);

app.listen(PORT, () => console.log(`listen at ${PORT}`));


/**
 * 1.The cors middleware package provides a convenient way to enable Cross-Origin Resource Sharing in Node.js applications. 
  It adds the necessary HTTP headers to the server's responses to allow cross-origin requests from specified origins.
 
 * Cross-origin requests occur when a web page from one domain makes a request to a server 
 hosted on a different domain. By default, web browsers enforce a security policy known as 
 the Same-Origin Policy, which prevents these requests for security reasons.
However, there are legitimate cases where cross-origin requests need to be allowed,
such as when building APIs or implementing client-server architectures. 
  
2. app.use() is an Express method used to register middleware functions in 
the application's request processing pipeline. Middleware functions have access to 
the request (req) and response (res)
 objects, and they can perform operations such as modifying the request or response, handling routing, and more.
 */