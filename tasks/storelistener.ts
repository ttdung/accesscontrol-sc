import { task } from "hardhat/config";
import { STORE_CONTRACT_ADDRESS } from "../scripts/common";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("storelistener", "Listner read request tx")
.setAction( async (taskArgs, hre) => {

    const [deployer, dev0, dev1, dev2] = await (hre as any).ethers.getSigners();


    var request = require('request');
  
    const FileAccessControlFactory = await (hre as any).ethers.getContractFactory(
      "FileAccessControl"
    );
    const fileAc = FileAccessControlFactory.attach(STORE_CONTRACT_ADDRESS);


    fileAc.on('ReadFile', (fileId, eventData) => {
      let readFileEvent ={
          fileId, eventData
      }
      console.log("\nEvent ReadFile:")
      console.log(JSON.stringify(readFileEvent, null, 4));

      const options = {
        url: 'http://127.0.0.1:8082/txreadreq',
        json: true,
        body: {
            txid: readFileEvent.eventData.transactionHash,
            fileid: fileId
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

    await new Promise(res => setTimeout(() => res(null), 120*60000));
});