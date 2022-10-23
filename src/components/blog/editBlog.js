import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    tittle: "",
    description: "",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      const response = await fetch(
        `http://localhost:8000/blog/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        return window.alert(message);
      }

      const selectedBlog = await response.json();
      if (!selectedBlog) {
        window.alert("Selected blog not found");
        return navigate("/");
      }

      setForm(selectedBlog);
    };

    fetchBlog();
  }, [params.id, navigate]);

  const updateForm = (value) =>
    setForm((prev) => {
      return { ...prev, ...value };
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      tittle: form.tittle,
      description: form.description,
    };

    await fetch(`http://localhost:8000/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  };

  return (
    <div>
      <h3>Update Blog</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="tittle">Tittle: </label>
          <input
            type="text"
            className="form-control"
            id="tittle"
            value={form.tittle}
            onChange={(e) => updateForm({ tittle: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </div>
        <br />

        <button type="submit" className="btn btn-dark btn-sm">
          Submit
        </button>
      </form>
    </div>
  );
}
