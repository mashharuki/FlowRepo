import ExampleNFT from 0x01

transaction {
    prepare(acct: AuthAccount) {

        // Create a new empty collection
        let collection <- ExampleNFT.createEmptyCollection()

        // store the empty NFT Collection in account storage
        acct.save<@ExampleNFT.Collection>(<-collection, to: ExampleNFT.CollectionStoragePath)

        log("Collection created for account 2")

        // create a public capability for the Collection
        acct.link<&{ExampleNFT.NFTReceiver}>(ExampleNFT.CollectionPublicPath, target: ExampleNFT.CollectionStoragePath)

        log("Capability created")
    }
}