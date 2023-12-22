import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const SingleMovie = ({ data, selectedMovieId, changeSelectedMovieId }) => {


  return (
    <Col className="mb-2">
      <img
        className="img-fluid"
        src={data.Poster}
        alt="movie"
        onClick={() => {
          changeSelectedMovieId(data.imdbID);
        }}
        style={{ border: selectedMovieId === data.imdbID ? "7px solid coral" : "" }}
      />
      <h2>{data.Title}</h2>
    </Col>
  );
};

export default SingleMovie;
