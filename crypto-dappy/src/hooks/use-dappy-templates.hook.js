import { useEffect, useReducer } from 'react'
import { defaultReducer } from '../reducer/defaultReducer'
import DappyClass from '../utils/DappyClass';
import { LIST_DAPPY_TEMPLATE } from "./../flow/list-dappy-templates.script";
import { query } from "@onflow/fcl";

/**
 * useDappyTemplates component
 * @returns 
 */
export default function useDappyTemplates() {
  const [state, dispatch] = useReducer(defaultReducer, { loading: false, error: false, data: [] })

  useEffect(() => {
    const fetchDappyTemplates = async () => {
      dispatch({ type: 'PROCESSING' });
      try {
        let res = await query({
          cadence: LIST_DAPPY_TEMPLATE
        });
        // create dappies
        let mappedDappies = Object.values(res).map(d => {
          return new DappyClass(d?.templateID, d?.dna, d?.name, d?.price)
        })
        dispatch({ type: 'SUCCESS', payload: mappedDappies })
      } catch (err) {
        dispatch({ type: 'ERROR' })
      }
    }
    fetchDappyTemplates()
  }, [])

  return state
}
