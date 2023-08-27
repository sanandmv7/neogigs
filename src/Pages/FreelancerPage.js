import React, { useState } from "react";
import Header from "../Components/Header/Header";

import { Container, Button, Form } from "react-bootstrap";
const { ethers } = require("ethers");

function FreelancerPage() {
  const [ escrowContractAddress, setEscrowContractAddress ] = useState("");

  const EscrowContractJson = require("../artifacts/contracts/NeoGigsEscrow.sol/NeoGigsEscrow.json");

  const submit = async (d) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(EscrowContractJson);
        const escrowContract = new ethers.Contract(escrowContractAddress, EscrowContractJson.abi, signer);

        const txn = await escrowContract.completeWork();

        await txn.wait();
        alert(`Work Submitted`);
      }
    } catch (error) {
      console.log("error from submit work", error);
    }
  };

  const withdraw = async (d) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(EscrowContractJson);
        const escrowContract = new ethers.Contract(escrowContractAddress, EscrowContractJson.abi, signer);

        const txn = await escrowContract.withdraw();

        await txn.wait();
        alert(`Withdraw Successful`);
      }
    } catch (error) {
      console.log("error from withdraw", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="App">
        <Form className="mt-5">
          <Form.Group className="mb-3 w-25" controlId="contractAddress">
            <Form.Label>Submit Work</Form.Label>
            <Form.Control type="text" placeholder="Enter address" onChange={e => setEscrowContractAddress(e.target.value)} />
            <Form.Text className="text-muted">
              Enter the address of escrow contract.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={submit}>
            Submit
          </Button>
          <Button className="mx-2" variant="primary" onClick={withdraw}>
            Withdraw
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default FreelancerPage;
