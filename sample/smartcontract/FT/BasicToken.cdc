pub contract BasicToken {

    pub resource Vault {

        pub var balance: UFix64

        // initialize 
        init(balance: UFix64) {
            self.balance = balance
        }

        // withdraw
        pub fun withdraw(amount: UFix64): @Vault {
            self.balance = self.balance - amount
            return <-create Vault(balance: amount)
        }

        // deposit
        pub fun deposit(from: @Vault) {
            self.balance = self.balance + from.balance
            destroy from
        }
    }

    // createVault
    pub fun createVault(): @Vault {
        // create resources 
        return <-create Vault(balance: 30.0)
    }

    // The init function for the contract. 
    init() {
        // create the Vault with the initial balance and put it in storage
        let vault <- self.createVault()
        // save
        self.account.save(<-vault, to: /storage/CadenceFungibleTokenTutorialVault)
    }
}
