import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = (props) => (
  <tr>
    <td>
      <h3>{props.blog.tittle}</h3>
      <p>{props.blog.description}</p>
      <div>
        <button
          type="button"
          class="btn btn-warning btn-sm me-2"
          onClick={() => props.deleteBlog(props.blog._id)}
        >
          DELETE BLOG
        </button>
        <button class="btn btn-primary btn-sm" type="button">
          <Link
            className="btn btn-link btn-sm text-light text-decoration-none p-0"
            to={`/edit/${props.blog._id}`}
          >
            UPDATE BLOG
          </Link>
        </button>
      </div>
    </td>
  </tr>
);

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:8000/blogs");

      if (!response.ok) {
        const message = `Oops something went wrong: ${response.statusText}`;
        return window.alert(message);
      }

      const blogs = await response.json();
      setBlogs(blogs);
    };

    fetchBlogs();
  }, [blogs.length]);

  const blogList = () =>
    blogs.map((blog) => (
      <Blog
        blog={blog}
        deleteBlog={() => deleteBlog(blog._id)}
        key={blog._id}
      />
    ));

  const deleteBlog = async (id) => {
    if (window.confirm("Are you sure?")) {
      await fetch(`http://localhost:8000/delete-blog/${id}`, {
        method: "DELETE",
      });

      setBlogs(blogs.filter((el) => el._id !== id));
    }
  };

  return (
    <div className="bg-light center p-2">
      <table className="table table-striped mt-4">
        <tbody>{blogList()}</tbody>
      </table>
    </div>
  );
}
