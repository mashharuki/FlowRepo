import { mutate, query, tx } from '@onflow/fcl'
import { useEffect, useState } from 'react';
import { CHECK_COLLECTION } from "../flow/check-collection.script";
import { CREATE_COLLECTION  } from "./../flow/create-collection.tx";
import { DELETE_COLLECTION  } from "./../flow/delete-collection.script";

export default function useCollection(user) {
  const [loading, setLoading] = useState(true)
  const [collection, setCollection] = useState(false)

  /**
   * createCollection
   */
  const createCollection = async () => {
    try {
      // mutate
      let res = await mutate({
        cadence: CREATE_COLLECTION,
        limit: 55,
      });

      // tx 
      await tx(res).onceSealed()

      console.log("res:", res);
      setLoading(false);
      setCollection(true);
    } catch(err) {
      console.error("err:", err);
      setLoading(false);
    }

    setCollection(true);
  }

  /**
   * deleteCollection
   */
  const deleteCollection = async () => {
    try {
      // mutate
      let res = await mutate({
        cadence: DELETE_COLLECTION,
        limit: 75,
      });

      // tx 
      await tx(res).onceSealed()

      console.log("res:", res);
      setLoading(false);
      setCollection(false);
    } catch(err) {
      console.error("err:", err);
      setLoading(false);
    }

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
