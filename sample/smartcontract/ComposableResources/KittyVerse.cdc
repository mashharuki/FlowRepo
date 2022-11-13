pub contract KittyVerse {

    // KittyHat is a special resource type that represents a hat
    pub resource KittyHat {
        pub let id: Int
        pub let name: String

        // init
        init(id: Int, name: String) {
            self.id = id
            self.name = name
        }

        // An example of a function someone might put in their hat resource
        pub fun tipHat(): String {
            if self.name == "Cowboy Hat" {
                return "Howdy Y'all"
            } else if self.name == "Top Hat" {
                return "Greetings, fellow aristocats!"
            } 
            return "Hello"
        }
    }

    // Create a new hat
    pub fun createHat(id: Int, name: String): @KittyHat {
        return <-create KittyHat(id: id, name: name)
    }

    pub resource Kitty {

        pub let id: Int

        // place where the Kitty hats are stored
        pub var items: @{String: KittyHat}
        
        // init
        init(newID: Int) {
            self.id = newID
            self.items <- {}
        }

        pub fun getKittyItems(): @{String: KittyHat} {
            var other: @{String:KittyHat} <- {}
            self.items <-> other
            return <- other
        }

        pub fun setKittyItems(items: @{String: KittyHat}) {
            var other <- items
            self.items <-> other
            destroy other
        }

        pub fun removeKittyItem(key: String): @KittyHat? {
            var removed <- self.items.remove(key: key)
            return <- removed
        }

        destroy() {
            destroy self.items
        }
    }

    pub fun createKitty(): @Kitty {
        return <-create Kitty(newID: 1)
    }
}