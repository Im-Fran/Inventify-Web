import { Button } from "@/components/ui/button/button.tsx"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {FormEvent, useState} from "react";
import {useLaravelErrors} from "@/http/error.ts";
import toast from "react-hot-toast";
import {Link, Navigate, useNavigate} from "react-router-dom";
import LoginForm from "@/pages/auth/login/components/loginForm.tsx";
import {useLocalStorage} from "@uidotdev/usehooks";
import {User} from "@/types/models/user.ts";

const Login = () => {
  const [login, setLogin] = useLocalStorage<User | null>('login', null)
  const [users] = useLocalStorage<User[]>('users', [])

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)
  const [errors,, resetErrors, pushError] = useLaravelErrors()
  const navigate = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    resetErrors()
    e.stopPropagation()
    e.preventDefault()

    if(email?.length < 3) {
      pushError({ field: 'email', message: 'El correo debe tener al menos 3 caracteres' })
      return
    }

    if(password?.length < 6) {
      pushError({ field: 'password', message: 'La contraseña debe tener al menos 6 caracteres' })
      return
    }

    const user = users.find((user: User) => user.email === email.toLowerCase() && user.password === password)
    if(!user) {
      pushError({ field: 'register', message: 'Esas credenciales no existen' })
      return
    }

    setLogin(user)

    // Redirect to home.
    navigate('/dashboard/inventory')
    toast.success('¡Bienvenido de vuelta!', {
      duration: 5000
    })
  }

  return <form onSubmit={submit} className={"flex items-center justify-center min-h-screen w-full"}>
    {login && <Navigate to={"/"}/>}
    <Card className={"w-full max-w-md"}>
      <CardHeader className={"space-y-1"}>
        <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder
        </CardDescription>
      </CardHeader>

      <LoginForm
        email={email}
        setEmail={setEmail}

        password={password}
        setPassword={setPassword}

        remember={remember}
        setRemember={setRemember}

        errors={errors}
      />

      <CardFooter className={"flex flex-col space-y-4"}>
        <Button type={"submit"}>Iniciar sesión</Button>

        <span className={"text-center text-sm text-neutral-500 dark:text-neutral-100"}>
        ¿No tienes cuenta? <Link to={"/auth/register"} className={"text-pink-600"}>Regístrate</Link>
      </span>
      </CardFooter>
    </Card>
  </form>
}
export default Login