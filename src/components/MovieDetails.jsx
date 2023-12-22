import React, { useState, useEffect } from 'react';
import { Col, Modal, Button } from 'react-bootstrap';

const SingleMovie = ({ data, selectedMovieId, changeSelectedMovieId }) => {
  const [showModal, setShowModal] = useState(false);
  const [comments, setComments] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openModal = async () => {
    changeSelectedMovieId(data.imdbID);
    toggleModal();
    await getCommentsForMovie(data.imdbID); // Chiamata per ottenere i commenti
  };

  const getCommentsForMovie = async (movieId) => {
    try {
      const response = await fetch(`https://www.example.com/api/comments/${movieId}`);
      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData.comments); // Aggiorna lo stato con i commenti ottenuti dall'API
      } else {
        console.error('Errore durante il recupero dei commenti');
      }
    } catch (error) {
      console.error('Si è verificato un errore:', error);
    }
  };

  return (
    <Col className="mb-2">
      <img
        className="img-fluid"
        src={data.Poster}
        alt="movie"
      />
      <h2>{data.Title}</h2>
    </Col>
  );
};

export default SingleMovie;
