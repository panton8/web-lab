import fs from "fs";
import slugify from "slugify";
import filmModel from "../models/filmModel.js";
import genreModel from "../models/genreModel.js";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";
import braintree from "braintree";

dotenv.config();

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const addFilmController = async (req, res) => {
  try {
    const { name, description, ticketPrice, genre, ticketsAmount} =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !ticketPrice:
        return res.status(500).send({ error: "Ticket price is Required" });
      case !genre:
        return res.status(500).send({ error: "Genre is Required" });
      case !ticketsAmount:
        return res.status(500).send({ error: "Amount of tickets is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const films = new filmModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
        films.photo.data = fs.readFileSync(photo.path);
        films.photo.contentType = photo.type;
    }
    await films.save();
    res.status(201).send({
      success: true,
      message: "Film Added Successfully",
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Film",
    });
  }
};

//get all films
export const getFilmController = async (req, res) => {
  try {
    const films = await filmModel
      .find({})
      .populate("genre")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: films.length,
      message: "All films ",
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting films",
      error: error.message,
    });
  }
};
// get single film
export const getSingleFilmController = async (req, res) => {
  try {
    const film = await filmModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("genre");
    res.status(200).send({
      success: true,
      message: "Single Film Fetched",
      film,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single film",
      error,
    });
  }
};

// get photo
export const filmPhotoController = async (req, res) => {
  try {
    const film = await filmModel.findById(req.params.fid).select("photo");
    if (film.photo.data) {
      res.set("Content-type", film.photo.contentType);
      return res.status(200).send(film.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete film
export const deleteFilmController = async (req, res) => {
  try {
    await filmModel.findByIdAndDelete(req.params.fid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Film Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting film",
      error,
    });
  }
};

//update film
export const updateFilmController = async (req, res) => {
  try {
    const { name, description, ticketPrice, genre, ticketsAmount} =
      req.fields;
    const { photo } = req.files;
    //validation
    switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !ticketPrice:
          return res.status(500).send({ error: "Ticket price is Required" });
        case !genre:
          return res.status(500).send({ error: "Genre is Required" });
        case !ticketsAmount:
          return res.status(500).send({ error: "Amount of tickets is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "Photo is required and should be less then 1mb" });
      }

    const films = await filmModel.findByIdAndUpdate(
      req.params.fid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      films.photo.data = fs.readFileSync(photo.path);
      films.photo.contentType = photo.type;
    }
    await films.save();
    res.status(201).send({
      success: true,
      message: "Film Updated Successfully",
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update Film",
    });
  }
};

// filters
export const filmFiltersController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.genre = checked;
    if (radio.length) args.ticketPrice = { $gte: radio[0], $lte: radio[1] };
    const films = await filmModel.find(args);
    res.status(200).send({
      success: true,
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Filtering Films",
      error,
    });
  }
};

// film count
export const filmCountController = async (req, res) => {
  try {
    const total = await filmModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in film count",
      error,
      success: false,
    });
  }
};

// film list base on page
export const filmListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page !== undefined ? req.params.page : 1;
    const films = await filmModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchFilmController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await filmModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Film API",
      error,
    });
  }
};

// similar films
export const realtedFilmController = async (req, res) => {
  try {
    const { fid, gid } = req.params;
    const films = await filmModel
      .find({
        genre: gid,
        _id: { $ne: fid },
      })
      .select("-photo")
      .limit(3)
      .populate("genre");
    res.status(200).send({
      success: true,
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related film",
      error,
    });
  }
};

// get film by genre
export const filmGenreController = async (req, res) => {
  try {
    const genre = await genreModel.findOne({ slug: req.params.slug });
    const films = await filmModel.find({ genre }).populate("genre");
    res.status(200).send({
      success: true,
      genre,
      films,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: `Error While Getting films`,
    });
  }
};


//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.ticketPrice;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            films: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};