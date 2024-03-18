/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type {
  FileAccessControl,
  FileAccessControlInterface,
} from "../../contracts/FileAccessControl";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "readRule",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "writeList",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    name: "AddFile",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "proposalId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oldname",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newname",
        type: "string",
      },
    ],
    name: "UpdateFile",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "proposalId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "oldname",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "newname",
        type: "string",
      },
    ],
    name: "UpdateProposal",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "newFileId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "oldFileId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "readRule",
        type: "string",
      },
    ],
    name: "UpdateReadRule",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "newFileId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "oldFileId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "writeList",
        type: "address[]",
      },
    ],
    name: "UpdateWriteList",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "readRule",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "writeList",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    name: "addFile",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposalId",
        type: "bytes32",
      },
    ],
    name: "approveProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str1",
        type: "string",
      },
      {
        internalType: "string",
        name: "str2",
        type: "string",
      },
    ],
    name: "compare",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "dataOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "files",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "readRule",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "threshold",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "list",
        type: "address[]",
      },
    ],
    name: "isInList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isDataOwner",
        type: "bool",
      },
    ],
    name: "setDataOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "proposalId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "oldname",
        type: "string",
      },
      {
        internalType: "string",
        name: "newname",
        type: "string",
      },
    ],
    name: "submitUpdateFileProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "writeProposal",
    outputs: [
      {
        internalType: "bytes32",
        name: "fileId",
        type: "bytes32",
      },
      {
        internalType: "string",
        name: "oldname",
        type: "string",
      },
      {
        internalType: "string",
        name: "newname",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001a3361001f565b61006f565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b61176b8061007e6000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c80639503cf88116100715780639503cf881461014f57806398c9adff14610171578063a890b7be14610194578063f20b5b2c146101a7578063f2fde38b146101ba578063f8790b20146101cd57600080fd5b8063042a312a146100b95780633a96fdd7146100ce578063407acf57146100f65780634d627d8814610109578063715018a61461012c5780638da5cb5b14610134575b600080fd5b6100cc6100c7366004610e9b565b6101e0565b005b6100e16100dc36600461102f565b610324565b60405190151581526020015b60405180910390f35b6100cc610104366004611093565b61037e565b6100e1610117366004611132565b60016020526000908152604090205460ff1681565b6100cc610740565b6000546040516001600160a01b0390911681526020016100ed565b61016261015d366004611154565b610754565b6040516100ed939291906111bd565b61018461017f366004611154565b610887565b6040516100ed94939291906111f2565b6100e16101a236600461123a565b6109ca565b6100cc6101b5366004611154565b610a2f565b6100cc6101c8366004611132565b610c79565b6100cc6101db3660046112fa565b610cef565b3360009081526001602052604090205460ff166102365760405162461bcd60e51b815260206004820152600f60248201526e27b7363c903230ba309037bbb732b960891b60448201526064015b60405180910390fd5b600088815260026020526040902080546001600160a01b031916331781556001016102628789836113be565b506000888152600260208190526040909120016102808587836113be565b506102be88848480806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250610d2292505050565b600088815260026020526040908190206004018290555188907f3e0642ed2c9a291f129ce3736d8e28d75b6665fb730bb7c2116082e34ffd13ed906103129033908b908b908b908b908b908b908b906114a8565b60405180910390a25050505050505050565b6000816040516020016103379190611532565b604051602081830303815290604052805190602001208360405160200161035e9190611532565b604051602081830303815290604052805190602001201490505b92915050565b600084848484604051602001610397949392919061154e565b60405160208183030381529060405290506000816040516020016103bb9190611532565b6040516020818303038152906040528051906020012090508781146104185760405162461bcd60e51b8152602060048201526013602482015272125b9d985b1a59081c1c9bdc1bdcd85b081251606a1b604482015260640161022d565b61049033600260008a815260200190815260200160002060030180548060200260200160405190810160405280929190818152602001828054801561048657602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610468575b50505050506109ca565b15156001146104d75760405162461bcd60e51b81526020600482015260136024820152722727903bb934ba32903832b936b4b9b9b4b7b760691b604482015260640161022d565b600087815260026020526040902060010180546105b291906104f890611336565b80601f016020809104026020016040519081016040528092919081815260200182805461052490611336565b80156105715780601f1061054657610100808354040283529160200191610571565b820191906000526020600020905b81548152906001019060200180831161055457829003601f168201915b505050505087878080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061032492505050565b15156001146105fc5760405162461bcd60e51b81526020600482015260166024820152754e6f74206d61746368696e672066696c65206e616d6560501b604482015260640161022d565b61067233600360008a8152602001908152602001600020600301805480602002602001604051908101604052809291908181526020018280548015610486576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116104685750505050506109ca565b1515600003610736576000888152600360208181526040832091820180546001818101835591855291842090910180546001600160a01b03191633179055918a9052888155016106c38688836113be565b5060008881526003602052604090206002016106e08486836113be565b5060008881526003602052604090819020805491518a917fae0ecc26408637002f5d1e9f1143095aef0d20bd60fe289a7df720f50a0217919161072d9160018101916002909101906115ed565b60405180910390a35b5050505050505050565b610748610da8565b6107526000610e02565b565b6003602052600090815260409020805460018201805491929161077690611336565b80601f01602080910402602001604051908101604052809291908181526020018280546107a290611336565b80156107ef5780601f106107c4576101008083540402835291602001916107ef565b820191906000526020600020905b8154815290600101906020018083116107d257829003601f168201915b50505050509080600201805461080490611336565b80601f016020809104026020016040519081016040528092919081815260200182805461083090611336565b801561087d5780601f106108525761010080835404028352916020019161087d565b820191906000526020600020905b81548152906001019060200180831161086057829003601f168201915b5050505050905083565b600260205260009081526040902080546001820180546001600160a01b0390921692916108b390611336565b80601f01602080910402602001604051908101604052809291908181526020018280546108df90611336565b801561092c5780601f106109015761010080835404028352916020019161092c565b820191906000526020600020905b81548152906001019060200180831161090f57829003601f168201915b50505050509080600201805461094190611336565b80601f016020809104026020016040519081016040528092919081815260200182805461096d90611336565b80156109ba5780601f1061098f576101008083540402835291602001916109ba565b820191906000526020600020905b81548152906001019060200180831161099d57829003601f168201915b5050505050908060040154905084565b6000805b8251811015610a2557836001600160a01b03168382815181106109f3576109f361161b565b60200260200101516001600160a01b031603610a13576001915050610378565b80610a1d81611631565b9150506109ce565b5060009392505050565b600081815260036020818152604080842054845260028252928390209091018054835181840281018401909452808452610aaa93339390929190830182828015610486576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116104685750505050506109ca565b1515600114610af25760405162461bcd60e51b81526020600482015260146024820152732727903b37ba34b733903832b936b4b9b9b4b7b760611b604482015260640161022d565b610b683360036000848152602001908152602001600020600301805480602002602001604051908101604052809291908181526020018280548015610486576020028201919060005260206000209081546001600160a01b031681526001909101906020018083116104685750505050506109ca565b15610ba55760405162461bcd60e51b815260206004820152600d60248201526c105b1c9958591e481d9bdd1959609a1b604482015260640161022d565b600081815260036020818152604080842080840180546001810182558187528487200180546001600160a01b03191633179055905485526002835290842060040154938590529190525410610c7657600081815260036020908152604080832080548452600292839052922060010191610c20910182611658565b50600081815260036020526040908190208054915183917feb903a069c935d0f3438435136ca85414bc56c7b332afcd672fcd634ba5861c391610c6d9160018101916002909101906115ed565b60405180910390a35b50565b610c81610da8565b6001600160a01b038116610ce65760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b606482015260840161022d565b610c7681610e02565b610cf7610da8565b6001600160a01b03919091166000908152600160205260409020805460ff1916911515919091179055565b60005b8151811015610da35760026000848152602001908152602001600020600301828281518110610d5657610d5661161b565b60209081029190910181015182546001810184556000938452919092200180546001600160a01b0319166001600160a01b0390921691909117905580610d9b81611631565b915050610d25565b505050565b6000546001600160a01b031633146107525760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161022d565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b60008083601f840112610e6457600080fd5b50813567ffffffffffffffff811115610e7c57600080fd5b602083019150836020828501011115610e9457600080fd5b9250929050565b60008060008060008060008060a0898b031215610eb757600080fd5b88359750602089013567ffffffffffffffff80821115610ed657600080fd5b610ee28c838d01610e52565b909950975060408b0135915080821115610efb57600080fd5b610f078c838d01610e52565b909750955060608b0135915080821115610f2057600080fd5b818b0191508b601f830112610f3457600080fd5b813581811115610f4357600080fd5b8c60208260051b8501011115610f5857600080fd5b602083019550809450505050608089013590509295985092959890939650565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715610fb757610fb7610f78565b604052919050565b600082601f830112610fd057600080fd5b813567ffffffffffffffff811115610fea57610fea610f78565b610ffd601f8201601f1916602001610f8e565b81815284602083860101111561101257600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561104257600080fd5b823567ffffffffffffffff8082111561105a57600080fd5b61106686838701610fbf565b9350602085013591508082111561107c57600080fd5b5061108985828601610fbf565b9150509250929050565b600080600080600080608087890312156110ac57600080fd5b8635955060208701359450604087013567ffffffffffffffff808211156110d257600080fd5b6110de8a838b01610e52565b909650945060608901359150808211156110f757600080fd5b5061110489828a01610e52565b979a9699509497509295939492505050565b80356001600160a01b038116811461112d57600080fd5b919050565b60006020828403121561114457600080fd5b61114d82611116565b9392505050565b60006020828403121561116657600080fd5b5035919050565b60005b83811015611188578181015183820152602001611170565b50506000910152565b600081518084526111a981602086016020860161116d565b601f01601f19169290920160200192915050565b8381526060602082015260006111d66060830185611191565b82810360408401526111e88185611191565b9695505050505050565b6001600160a01b038516815260806020820181905260009061121690830186611191565b82810360408401526112288186611191565b91505082606083015295945050505050565b6000806040838503121561124d57600080fd5b61125683611116565b915060208084013567ffffffffffffffff8082111561127457600080fd5b818601915086601f83011261128857600080fd5b81358181111561129a5761129a610f78565b8060051b91506112ab848301610f8e565b81815291830184019184810190898411156112c557600080fd5b938501935b838510156112ea576112db85611116565b825293850193908501906112ca565b8096505050505050509250929050565b6000806040838503121561130d57600080fd5b61131683611116565b91506020830135801515811461132b57600080fd5b809150509250929050565b600181811c9082168061134a57607f821691505b60208210810361136a57634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115610da357600081815260208120601f850160051c810160208610156113975750805b601f850160051c820191505b818110156113b6578281556001016113a3565b505050505050565b67ffffffffffffffff8311156113d6576113d6610f78565b6113ea836113e48354611336565b83611370565b6000601f84116001811461141e57600085156114065750838201355b600019600387901b1c1916600186901b178355611478565b600083815260209020601f19861690835b8281101561144f578685013582556020948501946001909201910161142f565b508682101561146c5760001960f88860031b161c19848701351681555b505060018560011b0183555b5050505050565b81835281816020850137506000828201602090810191909152601f909101601f19169091010190565b600060018060a01b03808b168352602060a0818501526114cc60a085018b8d61147f565b84810360408601526114df818a8c61147f565b8581036060870152878152889150820160005b88811015611517578461150484611116565b16825291830191908301906001016114f2565b50809450505050508260808301529998505050505050505050565b6000825161154481846020870161116d565b9190910192915050565b8385823760008482016000815283858237600093019283525090949350505050565b6000815461157d81611336565b80855260206001838116801561159a57600181146115b4576115e2565b60ff1985168884015283151560051b8801830195506115e2565b866000528260002060005b858110156115da5781548a82018601529083019084016115bf565b890184019650505b505050505092915050565b6040815260006116006040830185611570565b82810360208401526116128185611570565b95945050505050565b634e487b7160e01b600052603260045260246000fd5b60006001820161165157634e487b7160e01b600052601160045260246000fd5b5060010190565b818103611663575050565b61166d8254611336565b67ffffffffffffffff81111561168557611685610f78565b611699816116938454611336565b84611370565b6000601f8211600181146116cd57600083156116b55750848201545b600019600385901b1c1916600184901b178455611478565b600085815260209020601f19841690600086815260209020845b8381101561170757828601548255600195860195909101906020016116e7565b50858310156117255781850154600019600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212204712a6931349bdb368a6cd14121c971863e4e11aa18fae63ee9b8ca10f23428d64736f6c63430008130033";

type FileAccessControlConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: FileAccessControlConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class FileAccessControl__factory extends ContractFactory {
  constructor(...args: FileAccessControlConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<FileAccessControl> {
    return super.deploy(overrides || {}) as Promise<FileAccessControl>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): FileAccessControl {
    return super.attach(address) as FileAccessControl;
  }
  override connect(signer: Signer): FileAccessControl__factory {
    return super.connect(signer) as FileAccessControl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): FileAccessControlInterface {
    return new utils.Interface(_abi) as FileAccessControlInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): FileAccessControl {
    return new Contract(address, _abi, signerOrProvider) as FileAccessControl;
  }
}
