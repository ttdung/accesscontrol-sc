// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FileAccessControl is Ownable {
  struct File {
    address owner;
    bytes32 name; // file url
    string readRule;
    address[] writers;
    uint threshold;
  }

  struct Proposal {
    bytes32 fileId;
    bytes32 newname;
    address[] proposer;
  }

  address public storageOwner;
  uint256 public percentage = 50; // 50% fee to Storage owner - 50% fee to Data owner
  mapping(address => bool) public dataOwner;
  mapping(bytes32 => File) public files;
  mapping(bytes32 => Proposal) public writeProposal;

  event AddFile(bytes32 indexed fileId, address owner, string readRule, address[] writeList, uint threshold);
  event UpdateFile(bytes32 indexed proposalId, bytes32 indexed newname);
  event UpdateProposal(bytes32 indexed proposalId, bytes32 indexed newname);
  event UpdateReadRule(bytes32 indexed newFileId, bytes32 indexed oldFileId, string readRule);
  event UpdateWriteList(bytes32 indexed newFileId, bytes32 indexed oldFileId, address[] writeList);
  event ReadFile(bytes32 indexed fileId);

  // constructor(address storeowner, uint per)  Ownable(msg.sender){ 
  //   storageOwner = storeowner;
  //   percentage = per;
  // }

  modifier onlyDataOwner(bytes32 fileId) {
    require(msg.sender == files[fileId].owner, "Only file owner");
    _;
  }

  function setDataOwner(address user, bool isDataOwner) external onlyOwner {
    dataOwner[user] = isDataOwner;
  }

  function addFile(
    bytes32 fileId,
    string calldata readRule,
    address[] calldata writeList,
    uint threshold
  ) external {
    // TODO: verify fileId existed or not

    require(dataOwner[msg.sender], "REQUIRE data owner");

    files[fileId].owner = msg.sender;
    files[fileId].name = fileId;
    files[fileId].readRule = readRule;
    _setWriteList(fileId, writeList);
    files[fileId].threshold = threshold;

    emit AddFile(fileId, msg.sender, readRule, writeList, threshold);
  }

  function readFile(bytes32 fileId, IERC20 token, uint256 amount) public {
    // TODO: verify fileId existed or not
        uint256 feeToStorage = (amount * percentage) / 100 ;
        uint256 feeToDataOwner = amount - feeToStorage;

        bool sent = token.transferFrom(msg.sender, storageOwner, feeToStorage);
        require(sent, "Payment failed!");
        

        // send 50% to data owner
        sent = token.transferFrom(msg.sender, files[fileId].owner, feeToDataOwner);
        require(sent, "Payment failed!");

    emit ReadFile(files[fileId].name);
  }

  function getDataOwner(bytes32 fileId) public view returns (address) {
        return files[fileId].owner ;
  }

  function isInList(address user, address[] memory list) public pure returns (bool) {
    for (uint256 i = 0; i < list.length; i++) {
      if (list[i] == user) {
        return true;
      }
    }
    return false;
  }

  function compare(string memory str1, string memory str2) public pure returns (bool) {
    return (keccak256(abi.encodePacked((str1))) == keccak256(abi.encodePacked((str2))));
  }

  function submitUpdateFileProposal(
    bytes32 fileId,
    bytes32 newname
  ) public {
    // string memory text = string.concat(oldname, newname);
    //  string memory msg3 = string.concat(msg2, string(abi.encodePacked(keccak256(abi.encodePacked(text)))));
    // require(fid == proposalId, "Invalid proposal ID");
    bytes32 proposalId = fileId;
    require(isInList(msg.sender, files[fileId].writers) == true, "NO write permission");
    require(files[fileId].name != newname, "REQUIRE new file name");

    if (isInList(msg.sender, writeProposal[fileId].proposer) == false) {
      writeProposal[proposalId].proposer.push(msg.sender);
      writeProposal[proposalId].fileId = fileId;
      writeProposal[proposalId].newname = newname;

      emit UpdateProposal(
        proposalId,
        writeProposal[proposalId].newname
      );

      // Check if ENOUGH Signatures
      if (writeProposal[proposalId].proposer.length >= files[writeProposal[proposalId].fileId].threshold) {
      // execute updated
      files[fileId].name = writeProposal[proposalId].newname;

      emit UpdateFile(
        proposalId,
        writeProposal[proposalId].newname
      );
    }

    }
  }

  function approveProposal(bytes32 proposalId) public {
    require(isInList(msg.sender, files[writeProposal[proposalId].fileId].writers) == true, "NO voting permission");

    require(isInList(msg.sender, writeProposal[proposalId].proposer) == false, "Already voted");

    writeProposal[proposalId].proposer.push(msg.sender);

    // Check if ENOUGH Signatures
    if (writeProposal[proposalId].proposer.length >= files[writeProposal[proposalId].fileId].threshold) {
      // execute updated
      files[writeProposal[proposalId].fileId].name = writeProposal[proposalId].newname;

      emit UpdateFile(
        proposalId,
        writeProposal[proposalId].newname
      );
    }
  }

  function _setWriteList(bytes32 fileId, address[] memory writeList) private {
    for (uint256 i = 0; i < writeList.length; i++) {
      files[fileId].writers.push(writeList[i]);
    }
  }
}
