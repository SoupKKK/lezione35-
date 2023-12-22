import { useEffect, useState } from "react";
import { Container, Alert, Dropdown, Row, Col } from "react-bootstrap";
import MyNavbar from "./MyNavbar";
import MovieList from "./MovieList";

const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey=f99cfd22";

const HomePage = () => {
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [error, setError] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");

  const fetchMovieLists = () => {
    Promise.all([
      fetch(API_URL + "&s=matrix")
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "True") {
            setList1(data.Search);
          } else {
            setError(true);
          }
        }),
      fetch(API_URL + "&s=inception")
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "True") {
            setList2(data.Search);
          } else {
            setError(true);
          }
        }),
      fetch(API_URL + "&s=joker")
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "True") {
            setList3(data.Search);
          } else {
            setError(true);
          }
        })
    ]).catch((err) => {
      setError(true);
      console.log("An error occurred:", err);
    });
  };

  useEffect(() => {
    fetchMovieLists();
  }, []);

  return (
    <div>
     <MyNavbar
        showSearchResult={searchString => {
          setSearchString(searchString);
        }}/>
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h2 className="mb-4">Movies</h2>
            <div className="ml-4 mt-1">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "#221f1f" }}
                  id="dropdownMenuButton"
                  className="btn-secondary btn-sm dropdown-toggle rounded-2 mx-3"
                >
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu bg="dark">
                  <Dropdown.Item href="#">Viva</Dropdown.Item>
                  <Dropdown.Item href="#">l'esatate</Dropdown.Item>
                  <Dropdown.Item href="#">!!</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div>
            <i className="fa fa-th-large icons"></i>
            <i className="fa fa-th icons"></i>
          </div>
        </div>
        <Row>
          <Col lg={12}>
            {error && (
              <Alert variant="danger" className="text-center">
                Oops! Something went wrong. Please try again!
              </Alert>
            )}
            {searchString.length > 0 && (
              <MovieList
                title="Search results"
                searchString={searchString}
                selectedMovieId={selectedMovieId}
                changeSelectedMovieId={(movieId) => setSelectedMovieId(movieId)}
              />
            )}
            {!error && !searchString.length > 0 && (
              <>
              <h1>Matrix</h1>
                <MovieList
                  title="Matrix"
                  movies={list1.slice(0, 4)}
                  selectedMovieId={selectedMovieId}
                  changeSelectedMovieId={(movieId) => setSelectedMovieId(movieId)}
                />
                <h1>Inception</h1>
                <MovieList
                  title="Inception"
                  movies={list2.slice(0, 4)}
                  selectedMovieId={selectedMovieId}
                  changeSelectedMovieId={(movieId) => setSelectedMovieId(movieId)}
                />
                <h1>Joker</h1>
                <MovieList
                  title="Joker"
                  movies={list3.slice(0, 4)}
                  selectedMovieId={selectedMovieId}
                  changeSelectedMovieId={(movieId) => setSelectedMovieId(movieId)}
                />
              </>
            )}
          </Col>
          {/* <Col md={4}>
            {selectedMovieId ? (
              <CommentArea movieId={selectedMovieId} />
            ) : (
              <Alert variant="info">Select a movie to give it a rating</Alert>
            )}
          </Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
