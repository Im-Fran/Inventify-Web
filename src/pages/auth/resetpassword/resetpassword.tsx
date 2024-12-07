import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input"
import { Button } from "@/components/ui/button/button"
import { Label } from "@/components/ui/forms/label"

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Resetear Contraseña</CardTitle>
          <CardDescription>Ingresa tu nueva contraseña abajo.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <Input id="new-password" type="password" placeholder="Ingresa tu nueva contraseña" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" placeholder="Confirma tu nueva contraseña" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Cancelar</Button>
          <Button>Resetear Contraseña</Button>
        </CardFooter>
      </Card>
    </div>
  )
}