import HelloWorld from 0x01

transaction {

    prepare(acct: AuthAccount) {

        let helloResource <- acct.load<@HelloWorld.HelloAsset>(from: /storage/HelloAssetTutorial)

        log(helloResource?.hello())

        acct.save(<-helloResource!, to: /storage/HelloAssetTutorial)
    }
}