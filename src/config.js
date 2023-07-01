export const WEB3_PROVIDER_URL = 'https://goerli.infura.io/v3/fbcc593887f24112bece85c09c13de4b';
export const SAVETH_REGISTRY_CONTRACT_ADDRESS = '0x3be1e832d82525dbf76292433ee70ca8080e41d9';

// ABI (Application Binary Interface) of the SaveTH registry smart contract
export const SAVETH_REGISTRY_ABI = [
    {
      inputs: [
        {
          internalType: "uint256",
          name: "associatedIndexId",
          type: "uint256"
        },
        {
          internalType: "bytes",
          name: "blsPublicKey",
          type: "bytes"
        }
      ],
      name: "knotDETHBalanceInIndex",
      outputs: [
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      signature: "0xb698f816",
      constant: true,
      payable: false
    },
    {
      inputs: [
        {
          internalType: "bytes",
          name: "blsPublicKey",
          type: "bytes"
        }
      ],
      name: "associatedIndexIdForKnot",
      outputs: [
        {
          internalType: "uint256",
          name: "associatedIndexIdForKnot",
          type: "uint256"
        }
      ],
      stateMutability: "view",
      type: "function",
      signature: "0xe99c0f1f",
      constant: true,
      payable: false
    }
];

export const SAMPLE_VALIDATOR_BLS_PUBLIC_KEY = '0x834ded2dc9939fe822d5396de9f613134b412efe70be41bdebb50080f1587eeb235816e5c502e37b5479ea560808cc3e';