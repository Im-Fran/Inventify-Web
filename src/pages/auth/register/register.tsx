import {FormEvent, useState} from 'react'
import { Input } from "@/components/ui/forms/input.tsx"
import { Label } from "@/components/ui/forms/label.tsx"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button/button.tsx";
import {Link, useNavigate} from "react-router-dom";
import {useLaravelErrors} from "@/http/error.ts";
import {Error} from "@/components/ui/forms/error.tsx";
import {axios} from "@/http/http.ts";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors, resetErrors] = useLaravelErrors()
  const navigate = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    resetErrors()
    e.stopPropagation()
    e.preventDefault()

    const response = await axios.post('/register', {name, email, password, password_confirmation: passwordConfirmation})
    if(response.status === 422) {
      setErrors(response.data)
      if(errors.message) toast.error(errors.message)
      return
    }


    toast.success('Usuario registrado correctamente. Por favor revisa tu correo para verificar tu cuenta.')
    navigate('/') // TODO: Página de verificación de correo.
  }

  return <form onSubmit={submit} className={"flex items-center justify-center min-h-screen w-full"}>
    <Card className={"w-full max-w-md"}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Registro de Usuario</CardTitle>
        <CardDescription className="text-center text-neutral-500 dark:text-neutral-300">Crea una cuenta para acceder a la plataforma</CardDescription>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <div className={"space-y-2"}>
          <Label htmlFor={"name"}>Nombre</Label>
          <Input
            id={"name"}
            placeholder={"John Doe"}
            autoComplete={"name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
          <Error errors={errors.errors['name']}/>
        </div>
        <div className={"space-y-2"}>
          <Label htmlFor={"email"}>Correo Electrónico</Label>
          <Input
            id={"email"}
            type={"email"}
            placeholder={"jdoe@rubybx.cl"}
            autoComplete={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Error errors={errors.errors['email']}/>
        </div>
        <div className={"space-y-2"}>
          <Label htmlFor={"password"}>Contraseña</Label>
          <Input
            id={"password"}
            type={"password"}
            autoComplete={"new-password"}
            placeholder={"••••••••"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Error errors={errors.errors['password']}/>
        </div>
        <div className={"space-y-2"}>
          <Label htmlFor={"password_confirmation"}>Confirmar Contraseña</Label>
          <Input
            id={"password_confirmation"}
            type={"password"}
            autoComplete={"new-password"}
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder={"••••••••"}
            required
          />
        </div>
      </CardContent>
      <CardFooter className={"flex flex-col space-y-4"}>
        <Button type={"submit"}>Registrarse</Button>

        <span className={"text-center text-sm text-neutral-500 dark:text-neutral-100"}>
          ¿Ya tienes cuenta? <Link to={"/login"} className={"text-pink-600"}>Inicia Sesión</Link>
        </span>
      </CardFooter>
    </Card>
  </form>
}

export default Register