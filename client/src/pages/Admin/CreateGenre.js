import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import AdminMenu from "./../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import GenreForm from "../../components/Form/GenreForm";
import { Modal } from "antd";

function CreateGenre() {
  const [genres, setGenres] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
 //handle Form
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/v1/genre/add-genre", {
      name,
    });
    if (data?.success) {
      toast.success(`${name} is created`);
      getAllGenres();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong in input form");
  }
};

//get all cat
const getAllGenres = async () => {
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
  getAllGenres();
}, []);

//update genre
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `/api/v1/genre/update-genre/${selected._id}`,
      { name: updatedName }
    );
    if (data.success) {
      toast.success(`${updatedName} is updated`);
      setSelected(null);
      setUpdatedName("");
      setVisible(false);
      getAllGenres();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Somtihing went wrong");
  }
};
//delete genre
const handleDelete = async (pId) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/genre/delete-genre/${pId}`
    );
    if (data.success) {
      toast.success(`genre is deleted`);

      getAllGenres();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
};
return (
  <Layout title={"Dashboard - Create genre"}>
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Manage genre</h1>
          <div className="p-3 w-50">
            <GenreForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {genres?.map((g) => (
                  <>
                    <tr>
                      <td key={g._id}>{g.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(g.name);
                            setSelected(g);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(g._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <GenreForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </div>
  </Layout>
);
};

export default CreateGenre