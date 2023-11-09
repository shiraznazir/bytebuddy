import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const Port = process.env.PORT || 5000;
// connection and listeners

connectToDatabase()
  .then(() => {
    app.listen(Port, () => console.log("Server is up and connect to database"));
  })
  .catch((err) => {
    console.log("Error ", err);
  });
