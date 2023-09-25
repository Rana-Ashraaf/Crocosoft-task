import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
const Navigation = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
