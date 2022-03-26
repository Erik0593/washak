
import { useAuth } from "../../Context/AuthContext"

export function Home() {

    const { user, logOut, loading } = useAuth()

    const handlerLogOut = async () => {
        await logOut()
    }

    if (loading) return <h1>Loading</h1>

    return (
        <div className="w-fll max-w-xs m-auto">
            <div className="bg-white rounded shadow-md px-8 pt-6 pb-8">
                <h1 className="text-xl mb-4">Welcome {user.displayName || user.email}</h1>
                <button onClick={handlerLogOut} className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black">Logout</button>
            </div>
            
        </div>)
}