import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface Movie {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [movieName, setMovieName] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMovieName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uri = `http://www.omdbapi.com/?apikey=${apiKey}&s=${movieName}`;
    await axios
      .get(uri)
      .then((response) => {
        const foundMovies = response.data.Search;
        setMovies(foundMovies);
        if (!foundMovies) {
          toast.error("Movie not found.", {
            position: "top-center",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form className="max-w-md mx-auto mt-5" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            name="movieName"
            value={movieName}
            onChange={handleChange}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search movies..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {movies &&
          movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
            >
              <div>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className="w-full h-56 object-cover rounded-md"
                />
              </div>
              <div className="flex justify-between mt-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {movie.Title}
                  </h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    Year: {movie.Year}
                  </p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-10 h-10"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
