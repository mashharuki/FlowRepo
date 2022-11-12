import { query } from '@onflow/fcl'
import { useEffect, useState } from 'react';
import { CHECK_COLLECTION } from "../flow/check-collection.script";

export default function useCollection(user) {
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState(false)

  const createCollection = async () => {
    setCollection(true)
  }

  const deleteCollection = async () => {
    setCollection(false)
    window.location.reload()
  }

  useEffect(() => {
    if(!user?.addr) return

    const checkCollection = async () => {
      try {
        let res = await query({
          cadence: CHECK_COLLECTION,
          args: (arg, t) =>  [arg(user?.addr, t.Address)]
        });

        console.log("res:", res);
        setCollection(true);
        setLoading();
      } catch(err) {
        console.error("err:", err);
        setLoading(false)
      }
    }
    checkCollection();
  }, [])

  return {
    loading,
    collection,
    createCollection,
    deleteCollection
  }
}
