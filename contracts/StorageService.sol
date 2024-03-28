// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

event ReadFile(bytes32 indexed fileId);

interface ACInterface{
  function getDataOwner(bytes32 fileid) external view returns (address addr);
}

contract Storage{
    address public owner;
    address public constant AC_CONTRACT = 0x8016619281F888d011c84d2E2a5348d9417c775B;
    ACInterface ACContract = ACInterface(AC_CONTRACT);

    constructor() {owner = msg.sender;}

    function readFile(bytes32 fileid, IERC20 token, uint amount) public {
        
        // send 50% to storage service
        bool sent = token.transferFrom(msg.sender, owner, amount/2);
        require(sent, "Payment failed!");
        

        // send 50% to data owner
        address addr = ACContract.getDataOwner(fileid);
        sent = token.transferFrom(msg.sender, addr, amount/2);
        require(sent, "Payment failed!");

        emit ReadFile(fileid);
    }
}