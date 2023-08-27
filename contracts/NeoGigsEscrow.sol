// SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.18;

contract NeoGigsEscrow {
    enum ContractState {
        INITIALIZED,
        DEPOSITED,
        APPROVED,
        REQUESTCANCEL,
        CANCELLED,
        INDISPUTE,
        REJECTED,
        COMPLETED,
        DISPUTESETTLED,
        PAID
    }

    address public client;
    address public freelancer;
    address public validator;

    ContractState public contractState;

    uint256 amountLocked;

    constructor(address _freelancer, address _validator) {
        freelancer = _freelancer;
        validator = _validator;
        client = msg.sender;
    }

    modifier onlyClient() {
        require(msg.sender == client, "caller is not client");
        _;
    }
    
    modifier onlyFreelancer() {
        require(msg.sender == freelancer, "caller is not freelancer");
        _;
    }

    modifier onlyValidator() {
        require(msg.sender == validator, "caller is not freelancer");
        _;
    }

    function deposit() public payable onlyClient {
        require(contractState == ContractState.INITIALIZED, "invalid state");
        amountLocked = msg.value;
        contractState = ContractState.DEPOSITED;
    }

    function withdraw() public payable onlyFreelancer {
        require(contractState == ContractState.APPROVED, "invalid state");
        payable(freelancer).transfer(amountLocked);
        contractState = ContractState.PAID;
    }

    function cancel() public onlyClient {
        require(contractState == ContractState.DEPOSITED, "invalid state");
        contractState = ContractState.REQUESTCANCEL;
    }

    function approveCancel() public onlyFreelancer {
        require(contractState == ContractState.REQUESTCANCEL, "invalid state");
        contractState = ContractState.CANCELLED;
        payable(client).transfer(amountLocked);
    }

    function completeWork() public onlyFreelancer {
        require(contractState == ContractState.DEPOSITED, "invalid state");
        contractState = ContractState.COMPLETED;
    }

    function approveWork() public onlyClient {
        require(contractState == ContractState.COMPLETED, "invalid state");
        contractState = ContractState.APPROVED;
    }

    function raiseDispute() public {
        require(msg.sender == client || msg.sender == freelancer, "not authorized");
        contractState = ContractState.INDISPUTE;
    }

    function settleDispute(address to) public onlyValidator {
        require(contractState == ContractState.INDISPUTE, "invalid state");
        require(to == client || to == freelancer, "to address invalid");
        payable(to).transfer(amountLocked);
        contractState = ContractState.DISPUTESETTLED;
    }
}