import KittyVerse from 0x01


transaction {
    prepare(acct: AuthAccount) {

        // Create the Kitty object
        let kitty <- KittyVerse.createKitty()

        // Create the KittyHat objects
        let hat1 <- KittyVerse.createHat(id: 1, name: "Cowboy Hat")
        let hat2 <- KittyVerse.createHat(id: 2, name: "Top Hat")

        let kittyItems <- kitty.getKittyItems()

        // Put the hat on the cat!
        let oldCowboyHat <- kittyItems["Cowboy Hat"] <- hat1
        destroy oldCowboyHat
        let oldTopHat <- kittyItems["Top Hat"] <- hat2
        destroy oldTopHat

        kitty.setKittyItems(items: <-kittyItems)

        log("The cat has the hats")

        // Store the Kitty in storage
        acct.save(<-kitty, to: /storage/kitty)
    }
}
