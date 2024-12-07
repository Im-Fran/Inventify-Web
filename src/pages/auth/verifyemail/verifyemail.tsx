import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button/button"

export default function VerifyEmailPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Verificar Correo Electrónico</CardTitle>
          <CardDescription>Tu correo ha sido verificado exitosamente.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Gracias por verificar tu dirección de correo electrónico. Tu cuenta ahora está completamente activada.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Ir al Inicio</Button>
        </CardFooter>
      </Card>
    </div>
  )
}