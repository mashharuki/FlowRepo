import KittyVerse from 0x01


transaction {
    prepare(acct: AuthAccount) {

        // Move the Kitty out of storage, which also moves its hat along with it
        let kitty <- acct.load<@KittyVerse.Kitty>(from: /storage/kitty)
            ?? panic("Kitty doesn't exist!")

        // Take the cowboy hat off the Kitty
        let cowboyHat <- kitty.removeKittyItem(key: "Cowboy Hat")
            ?? panic("cowboy hat doesn't exist!")

        // Tip the cowboy hat
        log(cowboyHat.tipHat())
        destroy cowboyHat

        // Tip the top hat that is on the Kitty
        log(kitty.items["Top Hat"]?.tipHat())

        // Move the Kitty to storage, which
        // also moves its hat along with it.
        acct.save(<-kitty, to: /storage/kitty)
    }
}
