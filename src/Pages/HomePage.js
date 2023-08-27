import React, { useContext } from "react";
import Header from "../Components/Header/Header";

import { Row, Col, Container, Button, Stack } from "react-bootstrap";
import { Web3Context } from "../Contexts/Web3Context";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function HomePage() {
  const { currentAccount } = useContext(Web3Context);
  const history = useHistory();

  return (
    <>
      <Header />
      <Container className="App">
        <Row className="address">
          <Col className="m-12">
            <strong>Address: </strong>
            {currentAccount || "Wallet is not connected."}
          </Col>
        </Row>
        {currentAccount ? (
          <Stack gap={2} className="col-md-5 mx-auto">
            <Button onClick={()=>{history.push("/client")}}>Client</Button>
            <Button onClick={()=>{history.push("/freelancer")}}>Freelancer</Button>
            {/* <Button onClick={()=>{history.push("/validator")}}>Validator</Button> */}
          </Stack>
        ) : (
          <Row className="message">
            <Col className="m-12">Please connect your wallet first</Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default HomePage;
