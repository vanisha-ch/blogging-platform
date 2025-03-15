import { useEffect, useState } from "react";
import axios from "axios";
import "./BlogManager.css";

function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [formdata, setFormdata] = useState({ title: "", desc: "", id: "" });
  const [edit, setEdit] = useState(false);
  const [showForm, setShowForm] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:2000/api/blogs/");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (edit) {
      await axios.put(
        `http://localhost:2000/api/blogs/${formdata.id}`,
        formdata
      );
    } else {
      await axios.post("http://localhost:2000/api/blogs/", formdata);
    }
    fetchData();
    setEdit(false);
    setFormdata({ title: "", desc: "" });
    setShowForm(false);
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/api/blogs/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const editData = (blog) => {
    setFormdata({
      title: blog.title,
      desc: blog.desc,
      id: blog._id,
    });
    setEdit(true);
    setShowForm(true);
  };

  return (
    <div className="container">
      <button className="create-blog-btn" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Close" : "Create Blog"}
      </button>

      <form className={`blog-form ${showForm ? "show" : ""}`} onSubmit={handleSubmit}>
        <input
          type="text"
          className="blog-input"
          placeholder="Enter blog title"
          onChange={(e) => setFormdata({ ...formdata, title: e.target.value })}
          value={formdata.title}
          required
        />
        <textarea
          className="blog-textarea"
          placeholder="Enter blog content"
          onChange={(e) => setFormdata({ ...formdata, desc: e.target.value })}
          value={formdata.desc}
          required
        />
        <button type="submit" className="blog-button">
          {edit ? "Update Blog" : "Create Blog"}
        </button>
      </form>

      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.desc}</p>
            <button className="edit-button" onClick={() => editData(blog)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => deleteBlog(blog._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlogManager;
