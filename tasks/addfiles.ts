import { task } from "hardhat/config";
import { CONTRACT_ADDRESS } from "../scripts/common";
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("addfiles", "Add new files")
.addParam("account", "account name")
.addParam("filename", "file name")
.addParam("readrule", "access tree")
.setAction( async (taskArgs, hre) => {
    const [deployer, dev0, dev1, dev2] = await (hre as any).ethers.getSigners();
    // console.log('deployer address', deployer.address);

    console.log("filename: ",taskArgs.filename);
    console.log("read rules: ",taskArgs.readrule);

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

    const fileId = taskArgs.filename; 
    const filename = "data.dat";
    const readRule = taskArgs.readrule; //"student and (math or CS)";
    const writerList = [dev1.address, dev2.address];
    const threshold = 2;
  
    const FileAccessControlFactory = await (hre as any).ethers.getContractFactory(
      "FileAccessControl"
    );
    const fileAc = FileAccessControlFactory.attach(CONTRACT_ADDRESS);
    
    // const fileId = (hre as any).ethers.utils.keccak256((hre as any).ethers.utils.toUtf8Bytes(filename));
    // console.log('fileId', fileId);
  
  
    // addFile(bytes32 fileId, string calldata name, string calldata readRule, 
    // address[] calldata writeList, uint threshold)
  // console.log({fileId, filename, readRule, writerList, threshold})
    const uploadFileTx = await fileAc.connect(account).addFile(fileId, filename, readRule, writerList, threshold);
    const uploadFileTxReceipt =  await uploadFileTx.wait();
  
    console.log('uploadFileTxReceipt', Boolean(uploadFileTxReceipt.status), uploadFileTxReceipt.transactionHash);

});



























