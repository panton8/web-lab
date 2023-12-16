import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

function CreateFilm() {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ticketPrice, setticketPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [ticketsAmount, setticketsAmount] = useState("");
  const [photo, setPhoto] = useState("");

  //get all genre
  const getAllFilms = async () => {
    try {
      const { data } = await axios.get("/api/v1/genre/get-genre");
      if (data?.success) {
        setGenres(data?.genre);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting genre");
    }
  };

  useEffect(() => {
    getAllFilms();
  }, []);

  //create film function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const filmData = new FormData();
      filmData.append("name", name);
      filmData.append("description", description);
      filmData.append("ticketPrice", ticketPrice);
      filmData.append("ticketsAmount", ticketsAmount);
      filmData.append("photo", photo);
      filmData.append("genre", genre);
      const { data } = axios.post(
        "/api/v1/film/add-film",
        filmData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/films");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Add Film"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Add Film</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a genre"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setGenre(value);
                }}
              >
                {genres?.map((g) => (
                  <Option key={g._id} value={g._id}>
                    {g.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={ticketPrice}
                  placeholder="write a ticket price"
                  className="form-control"
                  onChange={(e) => setticketPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={ticketsAmount}
                  placeholder="write amount of tickets"
                  className="form-control"
                  onChange={(e) => setticketsAmount(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  Add Film
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default CreateFilm