import BasicNFT from 0x01

/// Basic transaction for two accounts to authorize
/// to transfer an NFT

transaction {
    prepare(signer1: AuthAccount, signer2: AuthAccount) {

        // load() from signer1
        let nft <- signer1.load<@BasicNFT.NFT>(from: /storage/BasicNFTPath)
            ?? panic("Could not load NFT")

        // save() to signer 2
        signer2.save<@BasicNFT.NFT>(<-nft, to: /storage/BasicNFTPath)
    }
}