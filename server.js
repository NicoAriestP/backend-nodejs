const http = require("http");

const requestListener = (request, response) => {
  const { url, method } = request;

  response.setHeader("Content-Type", "text/html");
  response.statusCode = 200;
  //   response.end("<h1>Belajar membuat HTTP Server dengan Node.js</h1>");

  if (url === "/") {
    if (method === "GET") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.setHeader("X-Powered-By", "NodeJS");

      //   response biasa
      //   response.end("<h1>Ini adalah Homepage</h1>");
      //   response JSON
      response.end(
        JSON.stringify({
          message: "Ini adalah Homepage",
        })
      );
    }
    // else if (method === "POST") {
    //   response.end("<h1>Halaman tidak bisa diakses dengan POST request</h1>");
    // }
    // else if (method === "PUT") {
    //   response.end("<h1>Halaman tidak bisa diakses dengan PUT request</h1>");
    // }
    // else if (method === "DELETE") {
    //   response.end("<h1>Halaman tidak bisa diakses dengan DELETE request</h1>");
    // }
    else {
      response.statusCode = 400;
      // response biasa
      //   response.end(
      //     `<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`
      //   );
      // response JSON
      response.end(
        JSON.stringify({
          message: `Halaman tidak dapat diakses dengan ${method} request`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      response.end("<h1>Halo ! ini adalah halaman about</h1>");
    }
    if (method === "POST") {
      response.setHeader("Content-Type", "application/json");
      response.setHeader("X-Powered-By", "NodeJS");
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      });
      request.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name } = JSON.parse(body);
        response.end(`<h1>Salam Kenal ${name}!</h1>`);
      });
    }
    if (method === "PUT") {
      response.end("<h1>Halaman tidak bisa diakses dengan PUT request</h1>");
    }
    if (method === "DELETE") {
      response.end("<h1>Halaman tidak bisa diakses dengan DELETE request</h1>");
    }
  }
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
