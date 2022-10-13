/**
 * HelloWorld Contract
 */
pub contract HelloWorld {

    pub let greeting: String

    // The init() function
    init() {
        self.greeting = "Hello, World!"
    }

    /**
     * get greeting function
     */
    pub fun hello(): String {
        return self.greeting
    }
}
