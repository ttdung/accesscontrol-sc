import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@openzeppelin/hardhat-upgrades";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";
import "hardhat-contract-sizer";
import "hardhat-finder";
// import "@dlsl/hardhat-gobind";

import "./tasks/accounts";
import "./tasks/addfiles";

dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const deployerKey = process.env.PRIVATE_KEY_DEV || "";
const dev0Key = process.env.PRIVATE_KEY_DEV0 || '';
const dev1Key = process.env.PRIVATE_KEY_DEV1 || '';
const dev2Key = process.env.PRIVATE_KEY_DEV2 || '';
const devNetAccounts = [deployerKey, dev0Key, dev1Key, dev2Key];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.19",
        settings: {
          optimizer: { enabled: true, runs: 200 },
          outputSelection: {
            "*": {
              "*": [
                "storageLayout",
                "metadata",
                "devdoc",
                "userdoc",
                "evm.methodIdentifiers",
                "evm.gasEstimates",
              ],
            },
          },
        },
      },
    ],
  },
  defaultNetwork: "devnet",
  networks: {
    hardhat: {
      gas: 20000000,
      gasPrice: 100000000000, // 50 Gwei
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: [
        process.env.PRIVATE_KEY_DEV ? process.env.PRIVATE_KEY_DEV : "",
      ],
      timeout: 8000000,
      gasPrice: 20000000000, // 50 Gwei
    },
    devnet: {
      url: process.env.RPC_URL_DEV || "",
      accounts: devNetAccounts,
      timeout: 8000000,
      gasPrice: 2000000000000, // 20 Gwei
    },
  },
  gasReporter: {
    enabled: !!process.env.REPORT_GAS,
    currency: "USD",
  },
  abiExporter: {
    path: "./build/abi",
    clear: true,
    flat: true,
    spacing: 2,
  },
  // gobind: {
  //   outdir: "./go-types/contract",
  //   deployable: false,
  //   runOnCompile: false,
  //   verbose: false,
  //   onlyFiles: ["contracts/<contract.sol>"],
  // },
  mocha: {
    timeout: 30000,
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHERSCAN_API_KEY || "",
      devnet: "abc",
      prodnet: "abc",
    },
  },
};

export default config;
