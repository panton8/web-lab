import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout.js";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [genres, setGenres] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all cat
  const getAllGenre = async () => {
    try {
      const { data } = await axios.get("/api/v1/genre/get-genre");
      if (data?.success) {
        setGenres(data?.genre);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllGenre();
    getTotal();
  }, []);

  //get films
  const getAllFilms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/film/film-list/${page}`);
      setLoading(false);
      setFilms(data.films);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get Total Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/film/film-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/film/film-list/${page}`);
      setLoading(false);
      setFilms([...films, ...data?.films]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by genre
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((g) => g !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllFilms();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterFilm();
  }, [checked, radio]);

  //get filtered films
  const filterFilm = async () => {
    try {
      const { data } = await axios.post("/api/v1/film/film-filters", {
        checked,
        radio,
      });
      setFilms(data?.films);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Films - Best offers "}>
      <div className="container-fluid row mt-3">
        <div className="col-md-2">
          <h4 className="text-center">Filter By Genre</h4>
          <div className="d-flex flex-column">
            {genres?.map((g) => (
              <Checkbox
                key={g._id}
                onChange={(e) => handleFilter(e.target.checked, g._id)}
              >
                {g.name}
              </Checkbox>
            ))}
          </div>
          {/* price filter */}
          <h4 className="text-center mt-4">Filter By Ticket price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Films</h1>
          <div className="row">
            {films?.map((f) => (
              <div key={f._id} className="col-md-4 mb-4">
                <div className="card" style={{ width: "18rem" }}>
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
                    <p className="card-text">$ {f.ticketPrice}</p>
                    <button className="btn btn-primary ms-1">More Details</button>
                    <button className="btn btn-secondary ms-1">Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="m-3 p-3">
            {films && films.length < total && (
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
