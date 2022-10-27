import BloctoSDK from '@blocto/sdk';

// chain ID 
const chainId = '43113';
// rpc URL 
const RPC_URL = `https://api.avax-test.network/ext/bc/C/rpc`;

/**
 * Create Blocto
 */
export const createBlocto = () => {
    // create bloctoSDK object
    const blocto = new BloctoSDK({
        ethereum: {
            chainId: chainId, 
            rpc: RPC_URL,
        },
    });
    // return
    return blocto;
}