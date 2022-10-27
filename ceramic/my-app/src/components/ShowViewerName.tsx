import { useViewerRecord } from '@self.id/framework'

/**
 * ShowViewerName
 * @returns 
 */
function ShowViewerName() {
    // get record
    const record = useViewerRecord('basicProfile')

    const text = record.isLoading
            ? 'Loading...'
        : record.content
            ? `Hello ${record.content.name || 'stranger'}  decription ${record.content.description}`
        : 'No profile to load'
    return <p>{text}</p>
}

export default ShowViewerName;