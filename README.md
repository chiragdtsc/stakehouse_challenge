# index-stakehouse-validators



# Understanding the Problem:

- It involves indexing data related to stakehouse validators in Ethereum.
- The goal is to index the balance of a stakehouse validator using their BLS public key and the savETH registry contract.
- The balance needs to be indexed at regular intervals (every epoch, which is 6.4 minutes).
- The associated index ID for a BLS public key needs to be obtained using the associatedIndexIdForKnot function from the contract.

# Analyzing the Requirements:

- I am starting with a single BLS public key and index its balance every epoch.
- Then fetching the associated index ID using the associatedIndexIdForKnot function.
- Using the knotDETHBalanceInIndex function to fetch the balance associated with the index ID and BLS public key.
- Storing the indexed balances in a data structure.
- Considering scalability for handling multiple BLS public keys, I'm going to apply parallel processing approach.

# Identifying Components:

- Smart Contract: savETH registry contract with ABI and relevant functions.
- Ethereum Consensus Layer Node: Connect to an Ethereum node (Goerli) to interact with the contract.
- Web3 Provider: Set the URL for the Ethereum node provider.
- Code Logic: JavaScript and Web3 library to interact with the contract, fetch balances, and index them.
- Data Structure: Determine an appropriate data structure to store the indexed balances.

# Designing the Solution:

- Importing necessary modules, configurations, and set up the Web3 provider.
- Creating functions to interact with the contract and fetch balances using the BLS public key and associated index ID.
- Implementing the logic to index balances at regular intervals and store them.
- Extending the solution to handle multiple BLS public keys by iterating over the sample keys and processing each one.

# Scaling Considerations:

To scale the solution to handle many BLS public keys efficiently, we can think about the following techniques:

- Parallel Processing: Utilizing asynchronous processing and concurrency to fetch balances for multiple BLS public keys simultaneously.
- Asynchronous Processing: JavaScript and web3.js support asynchronous programming using Promises, async/await, or callback functions. Taking advantage of these asynchronous features to execute multiple tasks concurrently, making efficient use of the available resources and minimizing waiting time.
- Batch Processing: Group multiple requests and fetch balances in batches to minimize network overhead.
- Optimization: Continuously optimize the code, data structures, and algorithms to improve efficiency and reduce resource consumption.






<br><br><br><br><br>


Command to run code: <br>
   ```cd src```<br>
  ```npm start```
  
The code in ```src/main.js``` is responsible for indexing the balance of stakehouse validators in Ethereum using the savETH registry contract. The documentation below provides an overview of the code structure and functionality.
 
# Prerequisites
Node.js and npm should be installed.
Required dependencies should be installed via npm install.
 
# Importing Required Modules and Configurations

SAVETH_REGISTRY_CONTRACT_ADDRESS: The Ethereum contract address of  the savETH registry.<br>
SAVETH_REGISTRY_ABI: The ABI of the savETH registry contract.<br>
WEB3_PROVIDER_URL: The URL of the Web3 provider, which connects to the Ethereum network.<br>
SAMPLE_VALIDATOR_BLS_PUBLIC_KEY: A sample BLS public key of a validator.<br>
 
# Instantiating Web3 and the Contract
 
The code uses the Web3 library to connect to the Ethereum network using the provided WEB3_PROVIDER_URL.<br>
A contract object is instantiated using the Web3.eth.Contract method, passing the SAVETH_REGISTRY_ABI and SAVETH_REGISTRY_CONTRACT_ADDRESS as arguments.
 


# Class: IndexingStakehouseValidator
<br>

This class encapsulates the functionality for indexing stakehouse validator’s balances.

Properties:
 
indexValidatorBalanceStore: An array to store the indexed validator balances.
 
Method: getAssociatedIndexId(blsPublicKey)
<br><br>
Retrieves the associated index ID (hashed key) for a given BLS public key using the associatedIndexIdForKnot function from the contract.<br>
Returns the associated index ID.
 
Method: fetchBalance(blsPublicKey, associatedIndexId)
<br><br>
Fetches the balance of a stakehouse validator associated with the given BLS public key and associated index ID.<br>
Uses the knotDETHBalanceInIndex function from the contract.<br>
Returns the balance.
 
Method: getValidatorBalanceOnEpochs(blsPublicKey)
<br><br>
Retrieves the balance of a stakehouse validator on each epoch.<br>
Retrieves the associated index ID for the given BLS public key.<br>
Sets an epoch interval to fetch the balance at each epoch.<br>
Stores the epoch-wise balance in the balanceEpochWiseStore array.<br>
Returns the balanceEpochWiseStore array.
 
Method: processMultipleValidatorKeys(validatorsBLSPublicKeys)
<br><br>
Processes balances for multiple stakehouse validator keys.<br>
Iterates over each BLS public key in the validatorsBLSPublicKeys array.<br>
Calls getValidatorBalanceOnEpochs to retrieve the balance on each epoch for each validator.<br>
Stores the balances in the indexValidatorBalanceStore array.
 
Method: run(validatorsBLSPublicKeys)
<br><br>
Runs the indexing process for multiple stakehouse validators.<br>
Calls the processMultipleValidatorKeys method with the validatorsBLSPublicKeys array.<br>
Prints the indexValidatorBalanceStore array.
 
# Sample Output of Indexed Balances
<br><br>
The key is the associated Index Id of Knot mapped with the list of pairs of epoch and balance of the validator.
```
[
   {
      "367":[
         {
            "epoch":1688230819843,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230820845,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230821847,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230822850,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230823853,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230824854,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230825856,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230826857,
            "balance":"24136321868000000000"
         }
      ]
   },
   {
      "367":[
         {
            "epoch":1688230819851,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230820852,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230821852,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230822858,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230823859,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230824860,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230825864,
            "balance":"24136321868000000000"
         },
         {
            "epoch":1688230826865,
            "balance":"24136321868000000000"
         }
      ]
   }
]
```
<br>
We can even store indexed data in database for analytical purposes instead of nested lists.

