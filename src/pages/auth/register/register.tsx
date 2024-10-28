import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [contraseña, setContraseña] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos del formulario
    console.log('Datos del formulario:', { nombre, correo, contraseña })
  }

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="text-4xl font-bold text-red-600">Ruby<span className="text-green-800">Box</span></div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Registro de Usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input 
                  id="nombre" 
                  placeholder="Panchito riko" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="correo">Correo Electrónico</Label>
                <Input 
                  id="correo" 
                  type="email" 
                  placeholder="jdoe@rubybx.cl" 
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contraseña">Contraseña</Label>
                <Input 
                  id="contraseña" 
                  type="password" 
                  placeholder="••••••••"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  required 
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}