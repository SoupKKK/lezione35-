import { useState, useEffect } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import CommentForm from "./CommentForm";

const SingleMovie = ({ data, selectedMovieId }) => {
  const [showModal, setShowModal] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const fetchMovieDetails = async () => {
    const API_KEY = "f99cfd22";
    const API_URL = `https://www.omdbapi.com/?i=${data.imdbID}&apikey=${API_KEY}`;

    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const movieData = await response.json();
        setMovieDetails(movieData);
        toggleModal();
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("There was a problem fetching the movie details:", error);
    }
  };

  return (
    <Col className="mb-2">
      <img
        className="img-fluid"
        src={data.Poster}
        alt="movie"
        onClick={fetchMovieDetails}
        style={{ border: selectedMovieId === data.imdbID ? "7px solid coral" : "" }}
      />
      <h2>{data.Title}</h2>

      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{movieDetails ? movieDetails.Title : "Loading..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {movieDetails ? (
              <>
              
              <p>Year: {movieDetails.Year}</p>
              <hr />
              <h1>Crict Comments:</h1>
              {movieDetails.Ratings.map((rating, index) => (
                <p key={index}> <b>{rating.Source} </b>- {rating.Value}</p>
              ))}
              <hr />
              <CommentForm imdbID={data.imdbID} />
              {/* Include qui gli altri dettagli del film che desideri mostrare */}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default SingleMovie;
