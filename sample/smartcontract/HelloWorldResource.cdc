/**
 * HelloWorld Contract
 */
pub contract HelloWorld {

    /**
     * HelloAsset resource
     */
	pub resource HelloAsset {
        /**
         * hell() function
         */
		pub fun hello(): String {
			return "Hello, World!"
		}
	}

    /**
     * init function
     */
	init() {

        // create a new instance
        let newHello <- create HelloAsset()

        // save
		self.account.save(<-newHello, to: /storage/HelloAssetTutorial)

        log("HelloAsset created and stored")
	}
}