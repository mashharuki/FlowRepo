import React, {useState} from "react"
import * as fcl from "@onflow/fcl"
import styled from 'styled-components'

const Card = styled.div`
    margin: 10px 5px;
    padding: 10px;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
`

const Code = styled.pre`
    background: #f0f0f0;
    border-radius: 5px;
    max-height: 150px;
    overflow-y: auto;
    padding: 5px;
`

/**
 * GetLatestBlock Component
 */
const GetLatestBlock = () => {
    // state variable
    const [data, setData] = useState(null)

    /**
     * runGetLatestBlock function
     * @param {*} event 
     */
    const runGetLatestBlock = async (event) => {
        event.preventDefault()

        // get latest Block
        const response = await fcl.send([
            fcl.getLatestBlock(),
        ])
        
        setData(await fcl.decode(response))
    }

    return (
        <Card>
            <button onClick={runGetLatestBlock}>
                Get Latest Block
            </button>
            
            {data && <Code>{JSON.stringify(data, null, 2)}</Code>}
        </Card>
    )
}

export default GetLatestBlock
