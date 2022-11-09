export const LIST_DAPPY_TEMPLATE = `
    import DappyContract from 0xDappy

    pub fun main(): { UInt32: DappyContract.Template } {
        return DappyContract.listTemplates()
    }
`;