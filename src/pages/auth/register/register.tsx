import {FormEvent, useState} from 'react'
import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button/button.tsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useLaravelErrors} from "@/http/error.ts";
import toast from "react-hot-toast";
import RegisterForm from "@/pages/auth/register/components/registerForm.tsx";
import {useLocalStorage} from "@uidotdev/usehooks";
import {User} from "@/types/models/user.ts";

const Register = () => {
  const [login] = useLocalStorage<string | null>('login', null)
  const [users, setUsers] = useLocalStorage<User[]>('users', [])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors,, resetErrors, pushError] = useLaravelErrors()
  const navigate = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    resetErrors()
    e.stopPropagation()
    e.preventDefault()

    if(name?.length < 3) {
      pushError({ field: 'name', message: 'El nombre debe tener al menos 3 caracteres' })
      return
    }

    if(email?.length < 3) {
      pushError({ field: 'email', message: 'El correo debe tener al menos 3 caracteres' })
      return
    }

    if(password?.length < 6) {
      pushError({ field: 'password', message: 'La contraseña debe tener al menos 6 caracteres' })
      return
    }

    if(password !== passwordConfirmation) {
      pushError({ field: 'password_confirmation', message: 'Las contraseñas no coinciden' })
      return
    }

    setUsers([...users, { name, email, password }])

    navigate('/')
    toast.success('Usuario registrado correctamente.', {
      duration: 5000
    })
  }

  return <form onSubmit={submit} className={"flex items-center justify-center min-h-screen w-full"}>
    {login && <Navigate to={"/"}/>}
    <Card className={"w-full max-w-md"}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Registro de Usuario</CardTitle>
        <CardDescription className="text-center text-neutral-500 dark:text-neutral-300">Crea una cuenta para acceder a la plataforma</CardDescription>
      </CardHeader>
      <RegisterForm
        name={name}
        setName={setName}

        email={email}
        setEmail={setEmail}

        password={password}
        setPassword={setPassword}

        passwordConfirmation={passwordConfirmation}
        setPasswordConfirmation={setPasswordConfirmation}

        errors={errors}
      />
      <CardFooter className={"flex flex-col space-y-4"}>
        <Button type={"submit"}>Registrarse</Button>

        <span className={"text-center text-sm text-neutral-500 dark:text-neutral-100"}>
          ¿Ya tienes cuenta? <Link to={"/auth/login"} className={"text-pink-600"}>Inicia Sesión</Link>
        </span>
      </CardFooter>
    </Card>
  </form>
}

export default Register