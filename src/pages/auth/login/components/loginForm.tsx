import {Label} from "@/components/ui/forms/label.tsx";
import {Input} from "@/components/ui/forms/input.tsx";
import {Error} from "@/components/ui/forms/error.tsx";
import {Checkbox} from "@/components/ui/forms/checkbox.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {LaravelErrors} from "@/http/error.ts";

export type LoginFormProps = {
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  remember: boolean
  setRemember: (remember: boolean) => void
  errors: LaravelErrors
}

const LoginForm = ({ email, setEmail, password, setPassword, remember, setRemember, errors }: LoginFormProps) => <CardContent className={"space-y-4"}>
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

export default LoginForm