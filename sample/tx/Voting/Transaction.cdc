import ApprovalVoting from 0x01

transaction {
    prepare(admin: AuthAccount) {

        // borrow a reference to the admin Resource
        let adminRef = admin.borrow<&ApprovalVoting.Administrator>(from: /storage/VotingAdmin)!

        // Call the initializeProposals function
        // to create the proposals array as an array of strings
        adminRef.initializeProposals(
            ["Longer Shot Clock", "Trampolines instead of hardwood floors"]
        )

        log("Proposals Initialized!")
    }

    post {
        ApprovalVoting.proposals.length == 2
    }

}