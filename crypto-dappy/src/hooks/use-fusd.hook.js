import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer';
import { mutate, query, tx } from "@onflow/fcl";
import { GET_FUSD_BALANCE } from "./../flow/get-fusd-balance.script";
import { CREATE_FUSD_VAULT } from "./../flow/create-fusd-valut.tx";

/**
 * useFUSD Component
 * @param {*} user 
 * @returns 
 */
export default function useFUSD(user) {
  const [state, dispatch] = useReducer(defaultReducer, {
    loading: true,
    error: false,
    data: null
  });

  const createFUSDVault = async () => {
    dispatch({ type: 'PROCESSING' });

    try {
      let transaction = await mutate({
        cadence: CREATE_FUSD_VAULT
      });
      // execute
      await tx(transaction).onceSealed();

      dispatch({ type: 'SUCCESS' });
    } catch(err) {
      dispatch({ type: 'ERROR' });
      console.error(err)
    }
  }

  useEffect(() => {
    getFUSDBalance();
    //eslint-disable-next-line 
  }, [])

  const getFUSDBalance = async () => {
    dispatch({ type: 'PROCESSING' });

    try {
      // get FUSD token info
      let res = await query({
        cadence: GET_FUSD_BALANCE,
        args: (arg, t) => [arg(user?.addr, t.Address)]
      });

      console.log("res:", res);
      dispatch({ type: 'SUCCESS', payload: res });
    } catch (err) {
      dispatch({ type: 'ERROR' });
      console.error(err)
    }
  }

  return {
    ...state,
    getFUSDBalance,
    createFUSDVault
  }
}
