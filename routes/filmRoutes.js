import express from "express";
import {
  addFilmController,
  deleteFilmController,
  getFilmController,
  getSingleFilmController,
  filmPhotoController,
  updateFilmController,
  filmCountController,
  filmFiltersController,
  filmListController,
  searchFilmController,
  realtedFilmController,
  filmGenreController
} from "../controllers/filmController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/add-film",
  requireSignIn,
  isAdmin,
  formidable(),
  addFilmController
);
//routes
router.put(
  "/update-film/:fid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateFilmController
);

//get films
router.get("/get-film", getFilmController);

//single film
router.get("/get-film/:slug", getSingleFilmController);

//get photo
router.get("/film-photo/:fid", filmPhotoController);

//delete film
router.delete("/delete-film/:fid", deleteFilmController);

//filter films
router.post("/film-filters", filmFiltersController);

//product count
router.get("/film-count", filmCountController);

//product per page
router.get("/film-list/:page", filmListController);

//search product
router.get("/search/:keyword", searchFilmController);

//similar product
router.get("/related-film/:pid/:cid", realtedFilmController);

//category wise product
router.get("/film-genre/:slug", filmGenreController);

export default router;