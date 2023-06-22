import { redirect } from "react-router-dom"

export async function requireAuth(request) {
    const pathname = new URL(request.url).pathname
    const isLogged = localStorage.getItem('loggedin')

    if(!isLogged) {
        throw redirect(`/login?message=You must log in first.&redirectTo=${pathname}`)
    }
}