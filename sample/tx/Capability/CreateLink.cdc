import HelloWorld from 0x01

transaction {
  prepare(account: AuthAccount) {

    let capability = account.link<&HelloWorld.HelloAsset>(/public/HelloAssetTutorial, target: /storage/HelloAssetTutorial)

   
    let helloReference = capability!.borrow()
      ?? panic("Could not borrow a reference to the hello capability")

    // Call the hello function using the reference 
    // to the HelloAsset resource.
    //
    log(helloReference.hello())
  }
}
