const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require("node-localstorage").LocalStorage;
    localStorage = new LocalStorage("./scratch");
  }

  if (url === "/tasks" && method === "GET") {
    req.on("data", (chunk) => {
      console.log(chunk);
    });

    return req
      .on("end", () => {
        const existingTasks = JSON.parse(localStorage.getItem("tasks"));
        if (existingTasks) {
          res.statusCode = 200;
          res.write(JSON.stringify(existingTasks));
        }
        return res.end();
      })
      .on("error", (err) => {
        res.statusCode = 500;
        throw err;
      });
  }
  if (url === "/add-task" && (method === "OPTIONS" || method === "POST")) {
    let data = '';
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    return req
      .on("end", () => {
        let existingTasks = [];
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
          existingTasks = tasks;
        }
        existingTasks.push(JSON.parse(data));
        localStorage.setItem('tasks', JSON.stringify(existingTasks));
        res.statusCode = 200;
        res.write(JSON.stringify(data));
        return res.end();
      })
      .on("error", (err) => {
        res.statusCode = 500;
        throw err;
      });
  }
};

module.exports = requestHandler;
