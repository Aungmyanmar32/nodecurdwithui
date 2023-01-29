const fs = require("fs");
const http = require("http");

const allUsers = [
  {
    name: "Aung Aung",
    email: "aung1@web.de",
  },

  {
    name: "Ko Ko",
    email: "koko2@web.de",
  },

  {
    name: "Bo Bo",
    email: "bobo3@web.de",
  },
];
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(data);
      return res.end();
    });
  } else if (req.url === "/allUsers") {
    const method = req.method;

    //Get method
    if (method === "GET") {
      //Get method
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(allUsers));
      return res.end();
    } else if (method === "POST") {
      //post method

      //get data from front-end
      let newData = "";
      req.on("data", (chunk) => {
        newData += chunk;
      });

      req.on("end", () => {
        //push new-data to allUsers array
        allUsers.push(JSON.parse(newData));
        console.log(allUsers);
        //response updated allUsers array to front-end
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(allUsers));
        return res.end();
      });
    } else if (method === "PUT") {
      //PUT method

      //get data from front-end
      let updateData = "";
      req.on("data", (chunk) => {
        updateData += chunk;
      });

      req.on("end", () => {
        //push new-data to allUsers array
        const updateUser = JSON.parse(updateData);
        //get email from request
        const updateEmail = updateUser.email;
        //find this email is matching with allUsers array items
        const isEmailexit = allUsers.find((user) => user.email === updateEmail);

        if (isEmailexit) {
          //update new name
          isEmailexit.name = updateUser.name;
        }
        // response updated allUsers array to front-end
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(allUsers));
        return res.end();
      });
    } else if (method === "DELETE") {
      //DELETE method

      //get data from front-end
      let updateData = "";
      req.on("data", (chunk) => {
        updateData += chunk;
      });

      req.on("end", () => {
        //push new-data to allUsers array
        const updateUser = JSON.parse(updateData);
        const updateEmail = updateUser.email;
        const isEmailexit = allUsers.find((user) => user.email === updateEmail);

        if (isEmailexit) {
          const deleteIndex = allUsers.indexOf(isEmailexit);
          allUsers.splice(deleteIndex, 1);
        }
        // response updated allUsers array to front-end
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(allUsers));
        return res.end();
      });
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 | Page Not Found!");
    return res.end();
  }
});

server.listen(3000, () => {
  console.log("Server started: Listening on port 3000");
});
