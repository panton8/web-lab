import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
    addGenreController,
    updateGenreController,
    genreControlller,
    deleteGenreController,
    singleGenreController,
} from "./../controllers/genreController.js";

const router = express.Router();

//routes
// create genre
router.post(
  "/add-genre",
  requireSignIn,
  isAdmin,
  addGenreController
);

//update genre
router.put(
  "/update-genre/:id",
  requireSignIn,
  isAdmin,
  updateGenreController
);

//get All genres
router.get("/get-genre", genreControlller);

//single genre
router.get("/single-genre/:slug", singleGenreController);

//delete genre
router.delete(
  "/delete-genre/:id",
  requireSignIn,
  isAdmin,
  deleteGenreController
);
export default router;