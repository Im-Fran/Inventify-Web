import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input.tsx"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const Login = () => <div className={"flex items-center justify-center min-h-screen w-full"}>
  <Card className="w-full max-w-md">
    <CardHeader className="space-y-1">
      <CardTitle className="text-2xl font-bold text-center">Iniciar sesión</CardTitle>
      <CardDescription className="text-center">
        Ingresa tus credenciales para acceder
      </CardDescription>
    </CardHeader>

    <CardContent className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input id="email" placeholder="tu@ejemplo.com" required type="email"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input id="password" required type="password"/>
      </div>
    </CardContent>

    <CardFooter className="flex flex-col space-y-4">
      <Button>
        Iniciar sesión
      </Button>
    </CardFooter>
  </Card>
</div>
export default Login