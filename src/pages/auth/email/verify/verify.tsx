import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx"
import { Button } from "@/components/ui/button/button.tsx"
import {Link} from "react-router-dom";

const EmailVerification = () => (
  <div className="container mx-auto flex items-center justify-center min-h-screen">
    <Card className="w-2/5">
      <CardHeader>
        <CardTitle>Verificar Correo Electrónico</CardTitle>
        <CardDescription>Por favor revisa tu correo.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">
          Gracias por registrarte. Ahora revisa tu correo electrónico para verificar tu cuenta. (Si no ves el correo, revisa la carpeta de spam)
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link to={'/'}>
          <Button>Ir al Inicio</Button>
        </Link>
      </CardFooter>
    </Card>
  </div>
);
export default EmailVerification