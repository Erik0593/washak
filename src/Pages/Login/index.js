import { useState } from "react"
import { useAuth } from "../../Context/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from "../Alert"


export function Login() {

    const [user, setUser] = useState({
        email: '',
        password:'',
    })

    const {login} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handlerChange = ({target: {name,value}}) => {
        setUser({...user, [name]: value})
    }

    const handlerSubmit = async (event) => {
        event.preventDefault()
        setError('')
        try {

            await login(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.code)
            if(error.code === "auth/invalid-email"){
                setError('Correo o Contraseña invalida')
            }
            if(error.code === "auth/wrong-password"){
                setError('Correo o Contraseña invalida')
            }
            if(error.code === "auth/user-not-found"){
                setError('Correo o Contraseña invalida')
            }
            if(error.code === "auth/too-many-requests"){
                setError('Has intentado iniciar sesion varias veces, espera 10 min para volver a intentarlo')
            }
        }
 }
    return (
        <div className="w-full max-w-xs m-auto">
            {error && <Alert message={error} />}

        <form onSubmit={handlerSubmit} className="bg-white shadow rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-fold my-2">Email</label>
            <input type="email" name="email" id="email"  placeholder="Youremail@company.ltd" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  onChange={handlerChange}/>
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold my-2">Password</label>
            <input type="password" name="password" id="password"  placeholder="*******" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={handlerChange}/>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button>
        </form>

        <p className="my-4 text-sm flex">No tienes una cuenta <Link to="/register"> Registrate</Link></p>
        </div>
    )
}