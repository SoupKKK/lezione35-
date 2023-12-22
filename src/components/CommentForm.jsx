import React, { useState, useEffect } from 'react';
import { Form, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

const CommentForm = ({ imdbID }) => {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  const [newComment, setNewComment] = useState({
    comment: '',
    rate: '1',
    elementId: imdbID
  });

  const fetchComments = async () => {
    try {
      let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/', {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1NmZlM2I5ODkwODAwMTg0ODg3MGEiLCJpYXQiOjE3MDMyNDM3NDcsImV4cCI6MTcwNDQ1MzM0N30.HgutiBh6pJndwig_bWeOQGtlxxb5TCIt6MScBz5LkZw'
        }
      });
      if (response.ok) {
        let comments = await response.json();
        setComments(comments);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [imdbID]);

  const submitComment = async (e) => {
    e.preventDefault();
    const COMMENTS_URL = 'https://striveschool-api.herokuapp.com/api/comments/';
    try {
      const response = await fetch(COMMENTS_URL, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg1NmZlM2I5ODkwODAwMTg0ODg3MGEiLCJpYXQiOjE3MDMyNDM3NDcsImV4cCI6MTcwNDQ1MzM0N30.HgutiBh6pJndwig_bWeOQGtlxxb5TCIt6MScBz5LkZw',
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        alert('Comment added');
        setComments([...comments, newComment]);
        setNewComment({
          comment: '',
          rate: '1',
          elementId: imdbID
        });
      } else {
        alert('An error has occurred');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRadioChange = (rating) => {
    setNewComment({ ...newComment, rate: rating });
  };

  const handleCommentText = (e) => {
    setNewComment({ ...newComment, comment: e.currentTarget.value });
  };

  return (
    <div className="my-3">
      {error && (
        <Alert variant="danger" className="text-center">
          Error fetching comments
        </Alert>
      )}
      <div className="text-center">
        <h5 className="my-3">Add a comment</h5>
        <Form onSubmit={submitComment}>
          <div className="my-3 text-center">
            {['1', '2', '3', '4', '5'].map((num) => (
              <Form.Check
                inline
                label={num}
                value={num}
                key={'n-' + num}
                type="radio"
                name="rating"
                defaultChecked={newComment.rate === num}
                onClick={() => handleRadioChange(num)}
              />
            ))}
          </div>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Write your comment"
              aria-label="comment"
              aria-describedby="basic-addon1"
              onChange={handleCommentText}
              value={newComment.comment}
              required
            />
          </InputGroup>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <div className="comments-section">
          {comments.map((comment, index) => (
            <div key={index}>
              <p>Rating: {comment.rate}</p>
              <p>Comment: {comment.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
