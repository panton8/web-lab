import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "../styles/FilmDetailsStyles.css";
const FilmDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [film, setFilm] = useState({});
  const [relatedFilms, setRelatedFilms] = useState([]);

  //initalp details
  useEffect(() => {
    if (params?.slug) getFilm();
  }, [params?.slug]);
  //getFilm
  const getFilm= async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/film/get-film/${params.slug}`
      );
      setFilm(data?.film);
      getSimularFilms(data?.film._id, data?.film.genre._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar film
  const getSimularFilms = async (fid, gid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/film/related-film/${fid}/${gid}`
      );
      setRelatedFilms(data?.films);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-6">
          <img
            src={`/api/v1/film/film-photo/${film._id}`}
            className="card-img-top"
            alt={film.name}
            height="300"
            width={"350px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Film Details</h1>
          <h6>Name : {film.name}</h6>
          <h6>Description : {film.description}</h6>
          <h6>Ticket Price : {film.ticketPrice}$</h6>
          <h6>Genre : {film?.genre?.name}</h6>
          <button class="btn btn-secondary ms-1" onClick={() => {
                                          setCart([...cart, film]);
                                          localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart,film])
                                          );
                                          toast.success("Item Added to cart");
                                        }}>Add to cart</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Films</h6>
        {relatedFilms.length < 1 && (
          <p className="text-center">No Similar Films found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedFilms?.map((f) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`/api/v1/film/film-photo/${f?._id}`}
                className="card-img-top"
                alt={f.name}
              />
              <div className="card-body">
                <h5 className="card-title">{f.name}</h5>
                <p className="card-text">{f.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {f.ticketPrice}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/film/${f.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1" onClick={() => {
                                          setCart([...cart, f]);
                                          localStorage.setItem(
                                            "cart",
                                            JSON.stringify([...cart,f])
                                          );
                                          toast.success("Item Added to cart");
                                        }}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default FilmDetails;