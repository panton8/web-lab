import genreModel from "../models/genreModel.js";
import slugify from "slugify";

export const addGenreController = async (req, res) => {
    try{
        const {name} = req.body;
        if(!name) {
            return res.status(401).send({message:"Name is required"})
        }
        const existingGenre = await genreModel.findOne({name});
        if(existingGenre){
            return res.status(200).send({
                success: true,
                message: "Genre already exists",
            });
        }
        const genre = await new genreModel({name, slug:slugify(name)}).save()
        res.status(200).send({
            success: true,
            message: "New genre created",
            genre,
        });
    } catch(error){
        console.log(error)
            res.status(500).send({
                success: false,
                error,
                message: "Error in genre"
        })
    }
};

//update genre

export const updateGenreController = async (req, res) => {
    try {
      const { name } = req.body;
      const { id } = req.params;
      const genre = await genreModel.findByIdAndUpdate(
        id,
        { name, slug: slugify(name) },
        { new: true }
      );
      res.status(200).send({
        success: true,
        messsage: "Genre Updated Successfully",
        genre,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating genre",
      });
    }
  };

  // get all genres
export const genreControlller = async (req, res) => {
    try {
      const genre = await genreModel.find({});
      res.status(200).send({
        success: true,
        message: "All Genres List",
        genre,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while getting all genres",
      });
    }
  };
  
  // single genre
  export const singleGenreController = async (req, res) => {
    try {
      const genre = await genreModel.findOne({ slug: req.params.slug });
      res.status(200).send({
        success: true,
        message: "Get Single genre Successfully",
        genre,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error While getting Single Genre",
      });
    }
  };
  
  //delete genre
  export const deleteGenreController = async (req, res) => {
    try {
      const { id } = req.params;
      await genreModel.findByIdAndDelete(id);
      res.status(200).send({
        success: true,
        message: "Genre Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "error while deleting genre",
        error,
      });
    }
  };