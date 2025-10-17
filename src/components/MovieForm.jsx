import { useEffect, useState } from "react";
import "./MovieForm.css";

const MovieForm = ({ addMovie, editingMovie, editMovie }) => {
  const [form, setForm] = useState({});

  const movieFormObj = {
    name: "",
    genre: "",
    director: "",
    leadActor: "",
    leadActress: "",
    rating: "",
    imageUrl: "",
    yearOfRelease: "",
  };

  useEffect(() => {
    if (editingMovie) {
      console.log(editingMovie);
      setForm(editingMovie);
    } else {
      setForm(movieFormObj);
    }
  }, [editingMovie]);
  // const keys = Object.keys(form);
  // console.log(keys);

  function handleChange(e) {
    const newMovieObject = {
      ...form,
      [e.target.name]: e.target.value,
    };
    // console.log(newMovieObject);
    setForm(newMovieObject);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // addMovie(form);
    if (editingMovie) {
      editMovie(editingMovie._id, form);
    } else {
      addMovie(form);
    }
    setForm(movieFormObj);
  }

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          type="text"
          name={key}
          placeholder={key}
          value={form[key]}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">{editingMovie ? "edit movie" : "add movie"}</button>
    </form>
  );
};

export default MovieForm;

// 👉 What’s happening:

// form is a React state object.

// Each input’s value comes directly from form[key].

// When you type something, handleChange updates the state, and React re-renders with the new value.

// So your inputs don’t rely on the actual DOM values, only on form.

// 👉 When you submit the form:

// setForm(movieFormObject);

// You set the state back to this empty object with empty strings.

// 👉 React re-renders the component,
// 👉 The value of each input becomes "" (empty string),
// 👉 That makes all the fields visually clear automatically.
