import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuiz } from "../Endpoints/api";

const CreateNew = ({ show, handleClose }) => {
  const [questions, setQuestions] = useState([
    { text: "", answers: [{ text: "", isCorrect: false }] },
  ]);
  const [title, setTitle] = useState("");
  const [score, setScore] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [validated, setValidated] = useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync, isLoading } = useMutation(createQuiz, {
    onMutate: () => {
      queryClient.invalidateQueries(["quizzes"]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["quizzes"], (prevData) => {
        return {
          ...prevData,
          quizes: [...prevData.quizes, data],
        };
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    const quizData = {
      title: title,
      score: parseInt(score),
      url: url,
      description: description,
      questions_answers: questions.map((question) => ({
        text: question.text,
        answers: question.answers.map((answer) => ({
          text: answer.text,
          is_true: answer.isCorrect,
        })),
      })),
    };

    try {
      await mutateAsync(quizData);
      handleClose();
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: "", answers: [{ text: "", isCorrect: false }] },
    ]);
  };

  const addAnswer = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.push({
      text: "",
      isCorrect: false,
    });
    setQuestions(updatedQuestions);
  };

  const removeAnswer = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(questionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers[answerIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers = updatedQuestions[
      questionIndex
    ].answers.map((answer, i) => ({
      ...answer,
      isCorrect: i === answerIndex,
    }));
    setQuestions(updatedQuestions);
  };

  const questionInputs = questions.map((question, questionIndex) => (
    <div className="border rounded  border-3 mb-5 p-3" key={questionIndex}>
      <Row className="mb-3 align-items-end">
        <Form.Group as={Col} md={6}>
          <Form.Label>{`Question ${questionIndex + 1}`}</Form.Label>
          <Form.Control
            type="text"
            placeholder={`Question ${questionIndex + 1} text`}
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(questionIndex, e.target.value)
            }
          />
        </Form.Group>
        <Col>
          <Button
            variant="outline-danger"
            onClick={() => removeQuestion(questionIndex)}
          >
            Remove Question
          </Button>
        </Col>
      </Row>
      {question.answers.map((answer, answerIndex) => (
        <Row key={answerIndex} className="mb-3 align-items-end">
          <Form.Group as={Col} md={6}>
            <Form.Label>{`Answer ${answerIndex + 1}`}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Answer ${answerIndex + 1} text`}
              value={answer.text}
              onChange={(e) =>
                handleAnswerChange(questionIndex, answerIndex, e.target.value)
              }
            />
          </Form.Group>
          <Col md={2}>
            <Form.Check
              type="radio"
              name={`correctAnswer${questionIndex}`}
              id={`correctAnswer${questionIndex}-${answerIndex}`}
              checked={answer.isCorrect}
              onChange={() =>
                handleCorrectAnswerChange(questionIndex, answerIndex)
              }
              label="Correct"
            />
          </Col>
          <Col>
            <Button
              variant="outline-danger"
              onClick={() => removeAnswer(questionIndex, answerIndex)}
            >
              Remove Answer
            </Button>
          </Col>
        </Row>
      ))}
      <Row className="mb-3">
        <Col md={6}>
          <Button variant="dark" onClick={() => addAnswer(questionIndex)}>
            Add Answer
          </Button>
        </Col>
      </Row>
    </div>
  ));

  return (
    <Modal fullscreen={true} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group className="mb-3" as={Col} md={4} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Quiz title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" as={Col} md={4} controlId="score">
              <Form.Label>Score</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quiz score"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a score.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a URL.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-4">
            <Form.Group as={Col} controlId="description">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Row>
            <Form.Label as="legend">Questions and Answers</Form.Label>
            {questionInputs}
            <Col md={6}>
              <Button variant="dark" onClick={addQuestion}>
                Add Question
              </Button>
            </Col>
          </Row>
          <Row className="mt-5 justify-content-end">
            <Col md={2}>
              {" "}
              <Button type="submit" variant="dark" disabled={isLoading}>
                {isLoading ? "Creating..." : "Save Quiz"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNew;
