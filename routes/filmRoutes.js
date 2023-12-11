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
  filmGenreController,
  brainTreePaymentController,
  braintreeTokenController,
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

//film per page
router.get("/film-list/:page", filmListController);

//search film
router.get("/search/:keyword", searchFilmController);

//similar film
router.get("/related-film/:pid/:cid", realtedFilmController);

//genre wise film
router.get("/film-genre/:slug", filmGenreController);

//payments routes
//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);


export default router;