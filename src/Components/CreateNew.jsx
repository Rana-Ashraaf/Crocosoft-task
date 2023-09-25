import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreateNew = ({ show, handleClose }) => {
  return (
    <Modal fullscreen={true} show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create new quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group className="mb-3" as={Col} md={4} controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Quiz title" />
            </Form.Group>
            <Form.Group className="mb-3" as={Col} md={4} controlId="score">
              <Form.Label>Score</Form.Label>
              <Form.Control type="text" placeholder="Quiz score" />
            </Form.Group>
            <Form.Group as={Col} md={4} controlId="url">
              <Form.Label>URL</Form.Label>
              <Form.Control type="text" placeholder="Video url" />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group as={Col} controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Row>
          <Row></Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-dark" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="dark" onClick={handleClose}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateNew;
