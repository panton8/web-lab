import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Films Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((f) => (
              <div className="card m-2" style={{ width: "18rem" }}>
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
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;