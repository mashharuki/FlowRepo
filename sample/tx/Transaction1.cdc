import HelloWorld from 0x11e681a52f08ed7a;

/**
 * Transaction
 */
transaction {

    // prepare
	prepare(acct: AuthAccount) {}

    // execute
	execute {
	  	log(HelloWorld.hello())
	}
}