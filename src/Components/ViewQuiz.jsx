import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuizById } from "../Endpoints/api";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const ViewQuiz = ({ quizId, show, handleClose }) => {
  const {
    data: quiz,
    isLoading,
    isFetched,
    isError,
  } = useQuery(["quiz", quizId], () => getQuizById(quizId), {
    enabled: !!quizId,
  });

  if (isError) {
    return <Alert variant="danger">Error fetching quiz data</Alert>;
  }

  return (
    <>
      {isFetched && !isLoading && !isError && quiz && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{quiz.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Score: {quiz.score}</p>
            <p>Description: {quiz.description}</p>
            <h3>Questions and Answers</h3>
            {quiz.questions_answers.map((question, questionIndex) => (
              <div key={questionIndex}>
                <p>{`Question ${questionIndex + 1}: ${question.text}`}</p>
                <ListGroup>
                  {question.answers.map((answer, answerIndex) => (
                    <ListGroup.Item
                      key={answerIndex}
                      style={{
                        color: answer.is_true ? "green" : "black",
                      }}
                    >
                      {answer.text}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ViewQuiz;
