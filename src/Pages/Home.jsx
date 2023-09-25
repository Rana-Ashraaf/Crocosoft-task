import { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import CreateNew from "../Components/CreateNew";
import { useQuery } from "@tanstack/react-query";
import { getQuizes } from "../Endpoints/api";

const Home = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    data: quizzes,
    isLoading,
    isError,
    error,
  } = useQuery(["quizzes"], getQuizes);

  if (isLoading) {
    return (
      <div className="mt-5 d-flex justify-content-center">
        <Spinner animation="grow" />
      </div>
    );
  }

  if (isError) {
    return <Alert variant="danger">Error: {error.message}</Alert>;
  }

  return (
    <Container className="mt-5">
      <Row xs={1} md={2} className="g-4">
        {quizzes.map((quiz) => (
          <Col key={quiz.id}>
            <Card>
              <Card.Body>
                <Card.Title>{quiz.title}</Card.Title>
                <Card.Text>{quiz.description}</Card.Text>
                <Button variant="outline-dark" className="me-2">
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
    </Container>
  );
};

export default Home;
