import { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import CreateNew from "../Components/CreateNew";
import { useQuery } from "@tanstack/react-query";
import { getQuizes } from "../Endpoints/api";
import ViewQuiz from "../Components/ViewQuiz";

const Home = () => {
  const [show, setShow] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const handleClose = () => setShow(false);
  const handleCloseQuiz = () => setShowQuiz(false);
  const handleShow = () => setShow(true);

  const handleViewClick = (quizId) => {
    setSelectedQuizId(quizId);
    setShowQuiz(true);
  };
  const {
    data: quizzes,
    isLoading,
    isError,
    isFetched,
  } = useQuery(["quizzes"], getQuizes);

  return (
    <Container className="mt-5">
      <Row xs={1} md={2} className="g-4">
        {isFetched &&
          !isLoading &&
          !isError &&
          quizzes &&
          quizzes.map((quiz) => (
            <Col key={quiz.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{quiz.title}</Card.Title>
                  <Card.Text>{quiz.description}</Card.Text>
                  <Button
                    onClick={() => handleViewClick(quiz.id)}
                    variant="outline-dark"
                    className="me-2"
                  >
                    View
                  </Button>
                  <Button variant="dark">Edit</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        <Col>
          <Button variant="dark" onClick={handleShow}>
            New Quiz
          </Button>
        </Col>
      </Row>
      <CreateNew show={show} handleClose={handleClose} />
      <ViewQuiz
        quizId={selectedQuizId}
        show={showQuiz}
        handleClose={handleCloseQuiz}
      />
    </Container>
  );
};

export default Home;
