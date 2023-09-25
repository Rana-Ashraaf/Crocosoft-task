import { useState } from "react";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import CreateNew from "../Components/CreateNew";

const Home = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className="mt-5">
      <Row xs={1} md={2} className="g-4">
        {/* replace with data binding */}
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
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
