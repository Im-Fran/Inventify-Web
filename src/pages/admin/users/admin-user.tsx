import { Bell, Home, Package, Search, Settings, User, Users, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table"
import { Badge } from "@/components/ui/badge"

// Datos simulados de usuarios
const usuarios = [
  { id: 1, nombre: 'Ana García', email: 'ana.garcia@ejemplo.com', rol: 'Admin', fechaRegistro: '2023-01-15', estado: 'Activo' },
  { id: 2, nombre: 'Carlos Rodríguez', email: 'carlos.rodriguez@ejemplo.com', rol: 'Usuario', fechaRegistro: '2023-02-20', estado: 'Activo' },
  { id: 3, nombre: 'Elena Martínez', email: 'elena.martinez@ejemplo.com', rol: 'Editor', fechaRegistro: '2023-03-10', estado: 'Inactivo' },
  { id: 4, nombre: 'David López', email: 'david.lopez@ejemplo.com', rol: 'Usuario', fechaRegistro: '2023-04-05', estado: 'Activo' },
  { id: 5, nombre: 'Sofía Fernández', email: 'sofia.fernandez@ejemplo.com', rol: 'Admin', fechaRegistro: '2023-05-12', estado: 'Activo' },
]

export default function AdminUsuarios() {
  return (
    <div className="flex h-screen bg-background">
      {/* Barra lateral */}
      <aside className="w-64 bg-card text-card-foreground">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary">Ruby Box</h1>
        </div>
        <nav className="mt-6">
          <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
            <Home className="w-5 h-5 mr-3" />
            Inicio
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
            <Package className="w-5 h-5 mr-3" />
            Inventario
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-foreground bg-accent">
            <Users className="w-5 h-5 mr-3" />
            Usuarios
          </a>
          <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
            <Settings className="w-5 h-5 mr-3" />
            Configuración
          </a>
        </nav>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Encabezado */}
        <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
          <h2 className="text-2xl font-semibold text-foreground">Administración de Usuarios</h2>
          <div className="flex items-center">
            <div className="relative mr-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar usuarios..."
                className="pl-10 w-64"
              />
            </div>
            <button className="p-2 text-foreground hover:bg-accent rounded-full">
              <Bell className="w-6 h-6" />
            </button>
            <button className="flex items-center ml-4 text-sm font-medium text-foreground hover:text-accent">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src="/placeholder.svg?height=32&width=32"
                alt="Avatar del usuario"
              />
              Juan Pérez
            </button>
          </div>
        </header>

        {/* Área de contenido principal */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Usuarios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usuarios.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Usuarios Activos</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usuarios.filter(u => u.estado === 'Activo').length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Último Registro</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usuarios.sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime())[0].fechaRegistro}</div>
              </CardContent>
            </Card>
          </div>

          {/* Tabla de Usuarios */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usuarios.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.nombre}</TableCell>
                      <TableCell>{usuario.email}</TableCell>
                      <TableCell>{usuario.rol}</TableCell>
                      <TableCell>{usuario.fechaRegistro}</TableCell>
                      <TableCell>
                        <Badge variant={usuario.estado === 'Activo' ? "success" : "secondary"}>
                          {usuario.estado}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}