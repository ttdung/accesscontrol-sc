import { task } from "hardhat/config";
import { CONTRACT_ADDRESS } from "../scripts/common";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("setdo", "Update file")
.addParam("account", "account name")
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

    const FileAccessControlFactory = await (hre as any).ethers.getContractFactory(
        "FileAccessControl"
      );
      const fileAc = FileAccessControlFactory.attach(CONTRACT_ADDRESS);
      
      const setDataOwnerTx = await fileAc.connect(deployer).setDataOwner(account.address, true);
      const setDataOwnerTxReceipt =  await setDataOwnerTx.wait();
      console.log('setDataOwnerTxReceipt', Boolean(setDataOwnerTxReceipt.status), setDataOwnerTxReceipt.transactionHash);
    
      const isDataOwner = await fileAc.dataOwner(dev0.address);
      console.log('isDataOwner', isDataOwner); 
});