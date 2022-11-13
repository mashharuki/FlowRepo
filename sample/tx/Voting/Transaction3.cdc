import ApprovalVoting from 0x01


transaction {
    prepare(voter: AuthAccount) {

        // take the voter's ballot our of storage
        let ballot <- voter.load<@ApprovalVoting.Ballot>(from: /storage/Ballot)!

        // Vote on the proposal
        ballot.vote(proposal: 1)

        // Cast the vote by submitting it to the smart contract
        ApprovalVoting.cast(ballot: <-ballot)

        log("Vote cast and tallied")
    }
}