import { SAVETH_REGISTRY_CONTRACT_ADDRESS, SAVETH_REGISTRY_ABI, WEB3_PROVIDER_URL, SAMPLE_VALIDATOR_BLS_PUBLIC_KEY } from '/Users/shoaaamir/Documents/Chirag_Work/Web3Project/src/config.js';
import Web3 from 'web3';

const web3 = new Web3(WEB3_PROVIDER_URL);

// Instantiate the smart contract object
const contract = new web3.eth.Contract(SAVETH_REGISTRY_ABI, SAVETH_REGISTRY_CONTRACT_ADDRESS);

/**
 * Converts an object to a JSON string, with the option to convert BigInt values to strings.
 *
 * @param {object} obj - The object to be converted to JSON.
 * @return {string} The JSON string representation of the object.
 */
function toJSONConverter(obj) {
    return JSON.stringify(obj, (_, v) => typeof v === 'bigint' ? v.toString() : v);
}

export class IndexingStakehouseValidator {

    indexValidatorBalanceStore = [];

    /**
     * Retrieves the associated index ID for the given BLS public key.
     *
     * @param {type} blsPublicKey - the BLS public key to retrieve the associated index ID for
     * @return {type} the associated index ID for the given BLS public key
     */
    async getAssociatedIndexId(blsPublicKey) {
        return await contract.methods.associatedIndexIdForKnot(blsPublicKey).call();
    }

    /**
     * Fetches the balance for a given BLS public key and associated index ID.
     *
     * @param {string} blsPublicKey - The BLS public key.
     * @param {number} associatedIndexId - The associated index ID.
     * @return {Promise<BigInt>} A promise that resolves to the balance value.
     */
    async fetchBalance(blsPublicKey, associatedIndexId) {
        return await contract.methods.knotDETHBalanceInIndex(associatedIndexId, blsPublicKey).call();
    }

    /**
     * Retrieves the validator's balance on each epoch.
     *
     * @param {string} blsPublicKey - The BLS public key of the validator.
     * @param {number} associatedIndexId - The associated index ID of the validator.
     * @return {Array} An array of objects containing the epoch timestamp and the validator's balance.
     */
    async getValidatorBalanceOnEpochs(blsPublicKey, associatedIndexId) {
        try {
            // Epoch of 6.4 mins , can change to smaller time in milliseconds for testing purpose
            const epoch = 6.4 * 60 * 1000;

            // Initializing an empty array to store balance and epoch pairs
            let balanceEpochWiseList = [];

            // Setting an interval to fetch balance and epoch pairs at each epoch interval
            const epochIntervals = setInterval(async () => {
                let epochTimestamp = Date.now();
                let balance = await this.fetchBalance(blsPublicKey, associatedIndexId);
                balanceEpochWiseList.push({ epoch: epochTimestamp, balance });
            }, epoch);

            // Clearing interval to test the output
            await new Promise(resolve => setTimeout(resolve, epoch * 20)); 
            clearInterval(epochIntervals);

            return balanceEpochWiseList;
        } catch (err) {
            throw new Error(`Error while getting balance for each epoch: ${err}`);
        }
    }

    /**
    * Asynchronously processes multiple validator keys.
    *
    * @param {Array} validatorsBLSPublicKeys - An array of validator public keys.
    * @return {Promise<void>} A promise that resolves when all keys are processed.
    */
    async processMultipleValidatorKeys(validatorsBLSPublicKeys) {
        try {
             // Using Promise.all() to parallelize the processing of multiple validator public keys
            await Promise.all(validatorsBLSPublicKeys.map(async (blsPublicKey) => {
                const associatedIndexId = await this.getAssociatedIndexId(blsPublicKey);
                const balanceEpochWise = await this.getValidatorBalanceOnEpochs(blsPublicKey, associatedIndexId);

                //Storing the index id and the balance epoch wise in the indexValidatorBalanceStore
                this.indexValidatorBalanceStore.push({ [associatedIndexId]: balanceEpochWise });
            }));
        } catch (err) {
            throw new Error(`Error while processing multiple keys: ${err}`);
        }
    }

    /**
     * Runs the function asynchronously.
     *
     * @param {Array} validatorsBLSPublicKeys - The array of validators' BLS public keys.
     * @return {Promise} - A promise that resolves when the function completes.
     */
    async run(validatorsBLSPublicKeys) {
        await this.processMultipleValidatorKeys(validatorsBLSPublicKeys);
        return this.indexValidatorBalanceStore;
    }
};

// Creating a sample list of multiple BLS PUBLIC KEYS to implement parallel processing
const validatorsBLSPublicKeys = [SAMPLE_VALIDATOR_BLS_PUBLIC_KEY, SAMPLE_VALIDATOR_BLS_PUBLIC_KEY];
const indexingStakehouseValidator = new IndexingStakehouseValidator();
const result = await indexingStakehouseValidator.run(validatorsBLSPublicKeys);
console.log(`RESULT: ${toJSONConverter(result)}`);
