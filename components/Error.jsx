import { useRouteError } from "react-router-dom"

export default function Error() {
    const error = useRouteError()    
        
    return (
        <>
            <h1>{error.message}</h1>
            <h2>{error.statusText}</h2>
            <h2>{error.status}</h2>
        </>
    )
}