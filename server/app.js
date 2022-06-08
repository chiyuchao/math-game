const express = require("express");
const db = require("./config/db");
const app = express();
const port = 7000;
app.use(express.json());
app.listen(port, () => {
  console.log(`RUN http://localhost:${port}`);
});
db.query("select * from account", function(err, rows) {
  if (err) throw err;
  console.log("Response: ", rows);
});
