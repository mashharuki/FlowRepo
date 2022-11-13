import ApprovalVoting from 0x01


transaction {
    prepare(admin: AuthAccount, voter: AuthAccount) {

        // borrow a reference to the admin Resource
        let adminRef = admin.borrow<&ApprovalVoting.Administrator>(from: /storage/VotingAdmin)!

        // create a new Ballot by calling the issueBallot
        // function of the admin Reference
        let ballot <- adminRef.issueBallot()

        // store that ballot in the voter's account storage
        voter.save<@ApprovalVoting.Ballot>(<-ballot, to: /storage/Ballot)

        log("Ballot transferred to voter")
    }