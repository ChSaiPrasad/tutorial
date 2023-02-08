const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "moviesData.db");
let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000);
  } catch (e) {
    console.log("sai");
    console.log(`DB Error:${e.message}`);
  }
};
initializeDBAndServer();
const convertDbObjectToResponseObjectMovie = (dbObject) => {
  return {
    movieId: dbObject.movie_id,
    directorId: dbObject.director_id,
    movieName: dbObject.movie_name,
    leadActor: dbObject.lead_actor,
  };
};

//getDetails
app.get("/movies/", async (request, response) => {
  const query = `
    select
    *
    from movie;
    `;
  const movieDetails = await db.all(query);
  response.send(
    movieDetails.map((each) => {
      convertDbObjectToResponseObjectMovie(each);
    })
  );
});
module.exports = app;
