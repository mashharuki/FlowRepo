import { useViewerRecord } from '@self.id/framework'

/**
 * SetViewerName
 * @returns 
 */
function SetViewerName() {
    // get record
    const record = useViewerRecord('basicProfile');

    /**
     * function
     */
    const merge = async (record?: any) => {
        // merge
        await record.merge({ 
            name: 'Haruki',
            description: 'This is a test DID'
        })
    }
  
    return (
        <button
            disabled={!record.isMutable || record.isMutating}
            onClick={()=> merge(record)}
        >
            Set data
        </button>
    )
}

export default SetViewerName;