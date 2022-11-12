pub contract HelloWorld {

    // Declare a resource that only includes one function.
    pub resource HelloAsset {

        // A transaction can call this function to get the "Hello, World!"
        // message from the resource.
        pub fun hello(): String {
            return "Hello, World!"
        }
    }

    // We're going to use the built-in create function to create a new instance
    // of the HelloAsset resource
    pub fun createHelloAsset(): @HelloAsset {
        return <-create HelloAsset()
    }

    init() {
        log("Hello Asset")
    }
}