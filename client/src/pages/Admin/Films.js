import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Films = () => {
  const [films, setFilms] = useState([]);

  //get all films
  const getAllFilms = async () => {
    try {
      const { data } = await axios.get("/api/v1/film/get-film");
      setFilms(data.films);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //life cycle method
  useEffect(() => {
    getAllFilms();
  }, []);
  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Films List</h1>
          <div className="d-flex">
            {films?.map((f) => (
              <Link
                key={f._id}
                to={`/dashboard/admin/film/${f.slug}`}
                className="film-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`/api/v1/film/film-photo/${f._id}`}
                    className="card-img-top"
                    alt={f.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{f.name}</h5>
                    <p className="card-text">{f.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Films;