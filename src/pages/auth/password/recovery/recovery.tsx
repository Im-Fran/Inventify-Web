import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Input } from "@/components/ui/forms/input.tsx"
import { Button } from "@/components/ui/button/button.tsx"
import { Label } from "@/components/ui/forms/label.tsx"

const AccountRecovery = () => (
  <div className="container mx-auto flex items-center justify-center min-h-screen">
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Recuperación de Cuenta</CardTitle>
        <CardDescription>Ingresa tu correo para recuperar tu cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" type="email" placeholder="tu@ejemplo.com"/>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost">Cancelar</Button>
        <Button>Enviar Instrucciones</Button>
      </CardFooter>
    </Card>
  </div>
);
export default AccountRecovery