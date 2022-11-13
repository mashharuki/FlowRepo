export const MINT_DAPPY = ` 
    import DappyContract from 0xDappy
    import FUSD from 0xFUSD 
    import FungibleToken from 0xFunbigleToken

    transaction(templateID: UInt32, amount: UFix64) {
        let receiverRef: &DappyContract.Collection{DappyContract.Receiver}
        let sentVault: @FungibleToken.Vault

        prepare(acct: AuthAccount) {
            self.receiverReference = acct.borrow<&DappyContract.Collection>(from: DappyContract.Collection)
            ?? panic("Cannot borrow")

            let vaultRef = acct.borrow<&FUSD.Vault>(from: /storage/fusdVault) ?? panic("Could not borrow FUSD Valut")
            self.sentVault <- vaultRef.withdraw(amount: amount)
        }

        execute {
            let newDappy <- DappyContract.mintDappy(templateID : templateID, paymentVault: <- self.sentVault)
            self.receiverReference.depozit(token <- newDappy)
        }
    }
`;