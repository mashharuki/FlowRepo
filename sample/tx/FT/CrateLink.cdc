import ExampleToken from 0x02

transaction {
  prepare(acct: AuthAccount) {

    // Create a link to the Vault in storage that is restricted to the
    acct.link<&ExampleToken.Vault{ExampleToken.Receiver, ExampleToken.Balance}>(/public/CadenceFungibleTokenTutorialReceiver, target: /storage/CadenceFungibleTokenTutorialVault)

    log("Public Receiver reference created!")
  }

  post {
    // Check that the capabilities were created correctly
    getAccount(0x02).getCapability<&ExampleToken.Vault{ExampleToken.Receiver}>(/public/CadenceFungibleTokenTutorialReceiver)
                    .check():
                    "Vault Receiver Reference was not created correctly"
    }
}