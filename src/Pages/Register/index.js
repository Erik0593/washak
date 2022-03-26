import { useState } from "react"
import { useAuth } from "../../Context/AuthContext"
import { useNavigate } from "react-router-dom"
import { async } from "@firebase/util"
import { Alert } from "../Alert"
import { Login } from "../Login"
import { Link } from "react-router-dom"

export function Register() {

    const [user, setUser] = useState({
        email: '',
        password:'',
    })

    const {signup} = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handlerChange = ({target: {name,value}}) => {
        setUser({...user, [name]: value})
    }

    const handlerSubmit = async event => {
        event.preventDefault()
        setError('')
        try {

            await signup(user.email, user.password)
            navigate('/')
        } catch (error) {
            console.log(error.code)
            if(error.code === "auth/invalid-email"){
                setError('Correo invalido')
            }
            if(error.code === "auth/weak-password"){
                setError('Contraseña requiere de 6 caracteres')
            }
            if(error.code === "auth/email-already-in-use"){
                setError('Usuario ya existente')
            }
        }
 }
    return (
        <div className="w-full max-w-xs m-auto">

        {error && <Alert message={error} />}

        <form onSubmit={handlerSubmit} className="bg-white shadow-md roudnded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-fold my-2">Email</label>
            <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email"  placeholder="Youremail@company.ltd"  onChange={handlerChange}/>
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold my-2">Password</label>
            <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password"  placeholder="*******" onChange={handlerChange}/>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
        </form>
        <p className="my-4 text-sm flex">ya tengo cuenta <Link to="/login"> Iniciar Sesión</Link></p>
        </div>
    )
}