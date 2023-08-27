import React, { useState } from "react";
import Header from "../Components/Header/Header";

import { Container, Button, Form } from "react-bootstrap";
import { ContractFactory } from "ethers";
const { ethers } = require("ethers");

function ClientPage() {
  const [ freelancerAddress, setFreelancerAddress ] = useState("");
  const [ depositAmount, setDepositAmount ] = useState(0);
  const [ contractAddress, setContractAddress ] = useState("");

  const EscrowContractJson = require("../artifacts/contracts/NeoGigsEscrow.sol/NeoGigsEscrow.json");

  const deploy = async (d) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(EscrowContractJson);
        const EscrowContractFactory = new ContractFactory(
          EscrowContractJson.abi,
          EscrowContractJson.bytecode,
          signer
        );

        const contract = await EscrowContractFactory.deploy(
          freelancerAddress,
          "0xa40F7C1a7AdcF84888f80762408D238B8d6194BA"
        );

        await contract.deployTransaction.wait();

        setContractAddress(contract.address);
        alert(`Succesfully deployed to: ${contract.address}`);
      }
    } catch (error) {
      console.log("error from deploy", error);
    }
  };

  const deposit = async (d) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(EscrowContractJson);
        const escrowContract = new ethers.Contract(contractAddress, EscrowContractJson.abi, signer);

        const txn = await escrowContract.deposit({value: depositAmount.toString()});

        await txn.wait();
        alert(`Deposit Successful`);
      }
    } catch (error) {
      console.log("error from deposit", error);
    }
  };

  const approve = async (d) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        // console.log(EscrowContractJson);
        const escrowContract = new ethers.Contract(contractAddress, EscrowContractJson.abi, signer);

        const txn = await escrowContract.approveWork();

        await txn.wait();
        alert(`Approve Successful`);
      }
    } catch (error) {
      console.log("error from approve", error);
    }
  };

  return (
    <>
      <Header />
      <Container className="App">
        <Form className="mt-5">
          <Form.Group className="mb-3 w-25" controlId="freelancerAddress">
            <Form.Label>Deploy Escrow Contract</Form.Label>
            <Form.Control type="text" placeholder="Enter address" onChange={e => setFreelancerAddress(e.target.value)} />
            <Form.Text className="text-muted">
              Enter the wallet address of the freelancer.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={deploy}>
            Deploy
          </Button>
        </Form>
        <Form className="mt-5">
          <Form.Group className="mb-3 w-25" controlId="formAmount">
            <Form.Label>Deposit</Form.Label>
            <Form.Control type="number" placeholder="Enter amount" onChange={e => setDepositAmount(e.target.value)} />
            <Form.Text className="text-muted">
              Enter the amount you want to deposit.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={deposit}>
            Deposit
          </Button>
        </Form>
        <Form className="mt-5">
          <Form.Group className="mb-3 w-25" controlId="approveWork">
            <Form.Label>Approve Work</Form.Label>
            <Form.Control type="text" placeholder="Enter address" onChange={e => setContractAddress(e.target.value)} />
            <Form.Text className="text-muted">
              Enter the escrow contract address.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" onClick={approve}>
            Approve
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default ClientPage;
