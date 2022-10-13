mport HelloWorld from 0x11e681a52f08ed7a

    
pub fun main() {

    // by using the getAccount() built-in function.
    let helloAccount = getAccount(0x11e681a52f08ed7a)

    // Get the public capability from the public path of the owner's account
    let helloCapability = helloAccount.getCapability<&HelloWorld.HelloAsset>(/public/HelloAssetTutorial)

    // borrow a reference for the capability
    let helloReference = helloCapability.borrow() ?? panic("Could not borrow a reference to the hello capability")

    log(helloReference.hello())
}