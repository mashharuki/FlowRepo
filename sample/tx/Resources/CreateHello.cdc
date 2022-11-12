import HelloWorld from 0x01

transaction {

    // No need to do anything in prepare because we are not working with
    // account storage.
	prepare(acct: AuthAccount) {
        let newHello <- HelloWorld.createHelloAsset()
        acct.save<@HelloWorld.HelloAsset>(<-newHello, to: /storage/HelloAssetTutorial)
    }

    // In execute, we log a string to confirm that the transaction executed successfully.
	execute {
        log("Saved Hello Resource to account.")
	}
}