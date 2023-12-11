import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGenre from "../hooks/useGenre";
import Layout from "../components/Layout/Layout";
const Genres = () => {
  const genres = useGenre();
  return (
    <Layout title={"All Genres"}>
      <div className="container">
        <div className="row">
          {genres.map((g) => (
            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={g._id}>
              <Link to={`/genre/${g.slug}`} className="btn btn-primary">
                {g.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Genres;