import { ethers } from "hardhat";
import { STORE_CONTRACT_ADDRESS } from "../scripts/common";

import * as dotenv from "dotenv";
dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

async function main() {

    const [deployer, dev0, dev1, dev2] = await ethers.getSigners();


    var request = require('request');
  
    const FileAccessControlFactory = await ethers.getContractFactory(
      "FileAccessControl"
    );
    const fileAc = FileAccessControlFactory.attach(STORE_CONTRACT_ADDRESS);


    fileAc.on('ReadFile', (fileId, eventData) => {
      let readFileEvent ={
          fileId, eventData
      }
      console.log("\nEvent ReadFile:")
      console.log(JSON.stringify(readFileEvent.fileId, null, 4));

      const options = {
        url: 'http://127.0.0.1:8082/txreadreq',
        json: true,
        body: {
            txid: readFileEvent.eventData.transactionHash,
            fileid: fileId,
            value: 0
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

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});