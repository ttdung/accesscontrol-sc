import { task } from "hardhat/config";
import { CONTRACT_ADDRESS } from "../scripts/common";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("updatedata", "Update file")
.addParam("account", "account name")
.addParam("oldfilename", "old file name")
.addParam("newfilename", "new file name")
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

    const FileAccessControlFactory = await await (hre as any).ethers.getContractFactory(
        "FileAccessControl"
      );
      const fileAc = FileAccessControlFactory.attach(CONTRACT_ADDRESS);
      
      const oldname = taskArgs.oldfilename;
      const fileId = await (hre as any).ethers.utils.keccak256((hre as any).ethers.utils.toUtf8Bytes(oldname));
     // const fileId = "0x74405ea03568a5286c93fdaf15fd483b3dbd704f04cdac36cf04fe389266ad30"
      console.log('fileId', fileId);
    
      const newname = taskArgs.newfilename;
    
      const proposalId = (hre as any).ethers.utils.keccak256((hre as any).ethers.utils.toUtf8Bytes(oldname+newname));
      console.log("proposalId: ", proposalId)
    
      // User Dev1: submit proposal to update "abc.txt" => "xyz.txt"
      const submitProposal = await fileAc.connect(account).submitUpdateFileProposal(proposalId, fileId, oldname, newname);
      const submitProposalTxReceipt =  await submitProposal.wait();
      console.log('uploadFileTxReceipt', Boolean(submitProposalTxReceipt.status), submitProposalTxReceipt.transactionHash);
    
});