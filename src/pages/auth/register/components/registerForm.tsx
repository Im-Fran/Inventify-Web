import {Label} from "@/components/ui/forms/label.tsx";
import {Input} from "@/components/ui/forms/input.tsx";
import {Error} from "@/components/ui/forms/error.tsx";
import {CardContent} from "@/components/ui/card.tsx";
import {LaravelErrors} from "@/http/error.ts";

export type RegisterFormProps = {
  name: string
  setName: (name: string) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  passwordConfirmation: string
  setPasswordConfirmation: (password: string) => void
  errors: LaravelErrors
}

const RegisterForm = ({name, setName, email, setEmail, password, setPassword, passwordConfirmation, setPasswordConfirmation, errors}: RegisterFormProps) => <CardContent className={"space-y-4"}>
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

export default RegisterForm