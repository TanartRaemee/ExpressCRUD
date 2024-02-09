import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { read, update } from "../functions/product";

const FromEditProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    detail: "",
    price: "",
  });

  useEffect(() => {
    loadData(params.id);
  }, []);

  const loadData = (id) => {
    read(id).then((res) => {
      setData(res.data);
    });
  };
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    update(params.id, data)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      FromEditProduct : {params.id}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => handleChange(e)}
          value={data.name}
        />
        <br />
        <input
          type="text"
          name="detail"
          placeholder="detail"
          onChange={(e) => handleChange(e)}
          value={data.detail}
        />
        <br />
        <input
          type="text"
          name="price"
          placeholder="price"
          onChange={(e) => handleChange(e)}
          value={data.price}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default FromEditProduct;
