import React, { useContext } from "react";
import { Navbar, Button } from "react-bootstrap";
import { Web3Context } from "../../Contexts/Web3Context";

function Header() {
  const { currentAccount, setCurrentAccount } = useContext(Web3Context);

  const enableMetamask = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Account found! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" className="navBar">
      <Navbar.Brand href="/">NeoGigs</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        {currentAccount ? (
          <span style={{color: 'white'}}>Wallet Connected</span>
        ) : (
          <Button variant="warning" onClick={enableMetamask}>
            Connect wallet
          </Button>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
