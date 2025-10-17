const Movie = ({ movie, deleteMovie,setEditingMovie }) => {
 
  return (
    <div>
      <h1>{movie.name}</h1>
      <img src={movie.imageUrl} width="200px" />
      <button onClick={() => setEditingMovie(movie)}>Edit</button>
      <button onClick={() => deleteMovie(movie._id)}>delete</button>
    </div>
  );
};

export default Movie;
