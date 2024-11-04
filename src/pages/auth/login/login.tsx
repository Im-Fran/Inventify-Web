import { Button } from "@/components/ui/button/button.tsx"
import { Input } from "@/components/ui/forms/input.tsx"
import { Label } from "@/components/ui/forms/label.tsx"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {FormEvent, useState} from "react";
import {axios} from "@/http/http.ts";
import {Checkbox} from "@/components/ui/forms/checkbox.tsx";
import {Error} from "@/components/ui/forms/error.tsx";
import {useLaravelErrors} from "@/http/error.ts";
import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [remember, setRemember] = useState<boolean>(false)
  const [errors, setErrors, resetErrors] = useLaravelErrors()
  const navigate = useNavigate()

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    resetErrors()
    e.stopPropagation()
    e.preventDefault()

    const response = await axios.post(`/login`, {email, password, remember})
    if(response.status == 422) {
      setErrors(response.data)
      if(errors.message) toast.error(errors.message)
      return
    }

    // Redirect to home.
    toast.success('¡Bienvenido de vuelta!')
    navigate('/')
  }

  return <form onSubmit={submit} className={"flex items-center justify-center min-h-screen w-full"}>
    <Card className={"w-full max-w-md"}>
      <CardHeader className={"space-y-1"}>
        <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
        <CardDescription className="text-center">
          Ingresa tus credenciales para acceder
        </CardDescription>
      </CardHeader>

      <CardContent className={"space-y-4"}>
        <div className={"space-y-2"}>
          <Label htmlFor={"email"}>Correo electrónico</Label>
          <Input
            id={"email"}
            placeholder={"tu@ejemplo.com"}
            type={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value || '')}
            required
          />
          <Error errors={errors.errors['email']}/>
        </div>
        <div className={"space-y-2"}>
          <Label htmlFor={"password"}>Contraseña</Label>
          <Input
            id={"password"}
            placeholder={"•••••••••"}
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value || '')}
            required
          />
          <Error errors={errors.errors['password']}/>
        </div>
        <div className={"flex items-center space-x-2"}>
          <Checkbox
            id={"remember"}
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <Label htmlFor={"remember"}>Recordar sesión</Label>
        </div>
      </CardContent>

      <CardFooter className={"flex flex-col space-y-4"}>
        <Button type={"submit"}>Iniciar sesión</Button>

        <span className={"text-center text-sm text-neutral-500 dark:text-neutral-100"}>
        ¿No tienes cuenta? <Link to={"/register"} className={"text-pink-600"}>Regístrate</Link>
      </span>
      </CardFooter>
    </Card>
  </form>
}
export default Login