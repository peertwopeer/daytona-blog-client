import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tittle: "",
    description: "",
  });

  const updateForm = (value) =>
    setForm((prev) => {
      return { ...prev, ...value };
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = { ...form };

    await fetch("http://localhost:8000/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => window.alert(error));

    setForm({ name: "", position: "", level: "" });
    navigate("/");
  };

  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="tittle">Tittle</label>
          <input
            type="text"
            className="form-control"
            id="tittle"
            value={form.tittle}
            onChange={(e) => updateForm({ tittle: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <br />

        <button type="submit" className="btn btn-dark btn-sm ">
          Submit
        </button>
      </form>
    </div>
  );
}
