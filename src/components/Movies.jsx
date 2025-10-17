import { useQuery, useQueryClient } from "@tanstack/react-query";
import Movie from "./Movie";
import MovieForm from "./MovieForm";
import { useState } from "react";

const Movies = () => {
  const API_URL = "https://express-mongo-backend-6nh9.onrender.com/api/movies";
  const queryClient = useQueryClient(); // 👈

  const [editingMovie, setEditingMovie] = useState(null);

  async function fetchMovies() {
    const res = await fetch(API_URL);
    return res.json();
  }

  async function addMovie(movie) {
    try {
      await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      // 👇 after adding movie, refresh data
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMovie(id) {
    const url = `${API_URL}/${id}`;
    await fetch(url, {
      method: "DELETE",
    });

    queryClient.invalidateQueries({ queryKey: ["movies"] });
  }

  async function editMovie(id, updatedData) {
    const url = `${API_URL}/${id}`;
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    queryClient.invalidateQueries({ queryKey: ["movies"] });
    setEditingMovie(null);
  }

  const {
    data: movies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movies"], // 👈 stable key
    queryFn: fetchMovies,
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <h1>something went wrong...</h1>;

  return (
    <div>
      {movies &&
        movies.map((movie) => (
          <Movie
            key={movie._id}
            movie={movie}
            deleteMovie={deleteMovie}
            setEditingMovie={setEditingMovie}
          />
        ))}
      <MovieForm
        addMovie={addMovie}
        editingMovie={editingMovie}
        editMovie={editMovie}
      />
    </div>
  );
};

export default Movies;

// You add a new movie to the database (via your POST API).

// The cache for ["movies"] is still holding the old movie list.

// invalidateQueries({ queryKey: ["movies"] }) tells React Query:

// “Mark this query as stale.”

// “Trigger a refetch of its data using the original queryFn.”

// React Query calls fetchMovies() again.

// The updated list (with the new movie) comes back.

// React Query updates the UI automatically ✅
