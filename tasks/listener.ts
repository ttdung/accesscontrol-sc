import { task } from "hardhat/config";
import { CONTRACT_ADDRESS } from "../scripts/common";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("listener", "Listner by <account> have <attributes>")
.addParam("account", "account name")
.addParam("attribute", "attributes")
.setAction( async (taskArgs, hre) => {
    const [deployer, dev0, dev1, dev2] = await (hre as any).ethers.getSigners();

    var account = dev0
    switch (taskArgs.account) {
      case 'dev1':
        account = dev1;
        break;
      case 'dev2':
        account = dev2;
        break;
      default:
        break;
    }
    console.log(taskArgs.account,' address: ', account.address);

    const attr = taskArgs.attribute;//"student|CS";
    const uid = "du"; 
    console.log('Attributes: ', attr);
  
    const FileAccessControlFactory = await (hre as any).ethers.getContractFactory(
      "FileAccessControl"
    );
    const fileAc = FileAccessControlFactory.attach(CONTRACT_ADDRESS);

    fileAc.on('AddFile', (fileId, owner, name, readRule, writeList, threshold, eventData) => {
      let addFileEvent ={
          fileId, owner, name, readRule, writeList, threshold //, eventData
      }
      console.log("\nEvent AddFile:")
      console.log(JSON.stringify(addFileEvent, null, 4));
      
      var request = require('request');
      
      const options = {
        url: 'http://127.0.0.1:8081/matchpolicy',
        json: true,
        body: {
            uid: uid,
            policy: readRule,
            attr: attr,
            storeenckeyfile: name 
        }
    };
    
    request.post(options, (err, res, body) => {
        if (err) {
            return console.log(err);
        }
        console.log(`Status: ${res.statusCode}`);
        if (res.statusCode == 200) {
          console.log(body);
               
        }
  
    });
  
    });
  
  //   event UpdateProposal(bytes32 indexed fileId, string oldname, string newname);
    fileAc.on('UpdateProposal', (proposalId, fileId, oldname, newname, eventData) => {
      let updateFileEvent ={
          proposalId, fileId, oldname, newname, //, eventData
      }
      console.log("\nEvent Update Proposal:")
      console.log(JSON.stringify(updateFileEvent, null, 4));
  
      // TODO
      // 1. Check if this node has write permission
      // 2. check if proposal is valid
  
      // User Dev2: approve proposal to update file
      console.log("\nApproving proposal: ", proposalId)
      approveUpdate(hre, account, proposalId, fileAc);
    });
  
    //   event UpdateFile(bytes32 indexed fileId, string oldname, string newname);
    fileAc.on('UpdateFile', (proposalId, fileId, oldname, newname, eventData) => {
      let updateFileEvent ={
          fileId, oldname, newname, //, eventData
      }
      console.log("\nEvent UpdateFile:")
      console.log(JSON.stringify(updateFileEvent, null, 4));
    });

  
});

async function approveUpdate(hre, account, proposalId, fileAc) {
    const [deployer, dev0, dev1, dev2] = await (hre as any).ethers.getSigners();
    const approveProposal = await fileAc.connect(account).approveProposal(proposalId);
    const approveProposalTxReceipt =  await approveProposal.wait();
    console.log('uploadFileTxReceipt', Boolean(approveProposalTxReceipt.status), approveProposalTxReceipt.transactionHash);
  } 