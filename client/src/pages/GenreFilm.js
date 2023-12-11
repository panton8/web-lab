import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
const GenreFilm = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [films, setFilms] = useState([]);
  const [genre, setGenre] = useState([]);

  useEffect(() => {
    if (params?.slug) getFilmByGenre();
  }, [params?.slug]);
  const getFilmByGenre = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/film/film-genre/${params.slug}`
      );
      setFilms(data?.films);
      setGenre(data?.genre);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <h4 className="text-center">Genre - {genre?.name}</h4>
        <h6 className="text-center">{films?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {films?.map((f) => (
                <div
                  className="card m-2"
                  style={{ width: "18rem" }}
                  key={f._id}
                >
                  <img
                    src={`/api/v1/film/film-photo/${f._id}`}
                    className="card-img-top"
                    alt={f.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{f.name}</h5>
                    <p className="card-text">
                      {f.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> $ {f.ticketPrice}</p>
                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => navigate(`/film/${f.slug}`)}
                    >
                      More Details
                    </button>
                    <button className="btn btn-secondary ms-1">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GenreFilm;