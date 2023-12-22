import { useState, useEffect } from "react";
import { Row, Spinner } from "react-bootstrap";
import SingleMovie from "./SingleMovie";

const API_URL = "https://www.omdbapi.com/?apikey=[f99cfd22]";

const MovieList = (props) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(false);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(API_URL + "&s=" + props.query);
      if (response.ok) {
        const data = await response.json();
        if (data.Response === "True") {
          setResults(data.Search);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
        console.log("An error occurred");
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.query) {
      fetchSearchResults();
    } else {
      setResults([]);
      setError(true);
    }
  }, [props.query]);

    const componentDidUpdate = async prevProps => {
    if (prevProps.searchString !== this.props.searchString) {
    if (this.props.searchString === "") {
      this.setState({ error: false, searchResults: [] });
    } else {
       this.fetchSearchResult();
    }
   }
  };

  return (
    <>
      <h3>{props.header}</h3>
      <Row className="row-cols-1 row-cols-sm-2 row-cols-lg-4 row-cols-xl-6 mb-4 text-center">
        {props.loading && [...Array(4).keys()].map((index) => (
          <div className="spinner-container" key={index}>
            <Spinner animation="border" variant="light" />
          </div>
        ))}
        {props.movies && props.movies.map((movie) => (
        <SingleMovie
            data={movie}
            key={movie.imdbID}
            selectedId={props.selectedId}
            changeSelectedId={props.changeSelectedId}
        />
        ))}
        {results.map(movie => (
          <SingleMovie
            data={movie}
            key={movie.imdbID}
            selectedId={props.selectedId}
            changeSelectedId={props.changeSelectedId}
          />
        ))}
      </Row>
    </>
  );
};

export default MovieList;
