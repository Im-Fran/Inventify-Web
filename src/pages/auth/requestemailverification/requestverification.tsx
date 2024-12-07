import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input"
import { Button } from "@/components/ui/button/button"
import { Label } from "@/components/ui/forms/label"

export default function RequestVerificationEmailPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Solicitar Correo de Verificaci贸n</CardTitle>
          <CardDescription>Ingresa tu correo para recibir un nuevo enlace de verificaci贸n.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Correo Electr贸nico</Label>
                <Input id="email" type="email" placeholder="tu@ejemplo.com" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost">Cancelar</Button>
          <Button>Enviar Verificaci贸n</Button>
        </CardFooter>
      </Card>
    </div>
  )
}