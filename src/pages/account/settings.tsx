import React, { useState } from 'react'
//import { User, Mail, Lock, Calendar, MapPin, Phone } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input.tsx"
import { Label } from "@/components/ui/forms/label"
import { Button } from "@/components/ui/button/button"
import { Textarea } from "@/components/ui/forms/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/forms/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EditarPerfil() {
  const [formData, setFormData] = useState({
    nombre: 'Juan Pérez',
    email: 'juan.perez@ejemplo.com',
    telefono: '+34 123 456 789',
    fechaNacimiento: '1990-01-01',
    direccion: 'Calle Ejemplo, 123, 28001 Madrid',
    bio: 'Desarrollador de software apasionado por la tecnología y la innovación.',
    genero: 'masculino'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      genero: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos actualizados al servidor
    console.log('Datos actualizados:', formData)
    // Mostrar un mensaje de éxito o error
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Avatar del usuario" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Editar Perfil</CardTitle>
              <CardDescription>Actualiza tu información personal</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                //icon={<User className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                /*icon={<Mail className="w-4 h-4 text-muted-foreground" />}*/
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                //icon={<Phone className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
              <Input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleInputChange}
                //icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección</Label>
              <Input
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                //icon={<MapPin className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="genero">Género</Label>
              <Select name="genero" value={formData.genero} onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona tu género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="otro">Otro</SelectItem>
                  <SelectItem value="prefiero-no-decir">Prefiero no decir</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Biografía</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Cambiar contraseña</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Nueva contraseña"
                //icon={<Lock className="w-4 h-4 text-muted-foreground" />}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Guardar cambios</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}