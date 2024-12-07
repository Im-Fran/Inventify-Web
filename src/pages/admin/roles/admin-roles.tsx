import React, { useState } from 'react'
import { Shield, Plus, Trash2, Save, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/forms/input"
import { Label } from "@/components/ui/forms/label"
import { Button } from "@/components/ui/button/button"
import { Checkbox } from "@/components/ui/forms/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Datos simulados de roles y permisos
const rolesIniciales = [
  { id: 1, nombre: 'Administrador', permisos: ['crear_usuario', 'editar_usuario', 'eliminar_usuario', 'ver_estadisticas', 'gestionar_inventario'] },
  { id: 2, nombre: 'Editor', permisos: ['editar_usuario', 'gestionar_inventario'] },
  { id: 3, nombre: 'Usuario', permisos: ['ver_estadisticas'] },
]

const todosLosPermisos = [
  { id: 'crear_usuario', nombre: 'Crear Usuario' },
  { id: 'editar_usuario', nombre: 'Editar Usuario' },
  { id: 'eliminar_usuario', nombre: 'Eliminar Usuario' },
  { id: 'ver_estadisticas', nombre: 'Ver Estadísticas' },
  { id: 'gestionar_inventario', nombre: 'Gestionar Inventario' },
]

export default function AdminRolesPermisos() {
  const [roles, setRoles] = useState(rolesIniciales)
  const [rolEditando, setRolEditando] = useState(null)
  const [nuevoRol, setNuevoRol] = useState({ nombre: '', permisos: [] })
  const [dialogoAbierto, setDialogoAbierto] = useState(false)

  const handleEditarRol = (rol) => {
    setRolEditando(rol)
    setDialogoAbierto(true)
  }

  const handleGuardarRol = () => {
    if (rolEditando) {
      setRoles(roles.map(r => r.id === rolEditando.id ? rolEditando : r))
    } else {
      setRoles([...roles, { ...nuevoRol, id: roles.length + 1 }])
    }
    setDialogoAbierto(false)
    setRolEditando(null)
    setNuevoRol({ nombre: '', permisos: [] })
  }

  const handleEliminarRol = (id) => {
    setRoles(roles.filter(r => r.id !== id))
  }

  const togglePermiso = (permiso) => {
    if (rolEditando) {
      setRolEditando({
        ...rolEditando,
        permisos: rolEditando.permisos.includes(permiso)
          ? rolEditando.permisos.filter(p => p !== permiso)
          : [...rolEditando.permisos, permiso]
      })
    } else {
      setNuevoRol({
        ...nuevoRol,
        permisos: nuevoRol.permisos.includes(permiso)
          ? nuevoRol.permisos.filter(p => p !== permiso)
          : [...nuevoRol.permisos, permiso]
      })
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Administración de Roles y Permisos</CardTitle>
          <CardDescription>Gestiona los roles y permisos de los usuarios del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Button onClick={() => setDialogoAbierto(true)}>
              <Plus className="mr-2 h-4 w-4" /> Crear Nuevo Rol
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre del Rol</TableHead>
                <TableHead>Permisos</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((rol) => (
                <TableRow key={rol.id}>
                  <TableCell className="font-medium">{rol.nombre}</TableCell>
                  <TableCell>{rol.permisos.join(', ')}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => handleEditarRol(rol)}>
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEliminarRol(rol.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogoAbierto} onOpenChange={setDialogoAbierto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{rolEditando ? 'Editar Rol' : 'Crear Nuevo Rol'}</DialogTitle>
            <DialogDescription>
              {rolEditando ? 'Modifica los detalles del rol existente' : 'Define un nuevo rol y sus permisos asociados'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombre" className="text-right">
                Nombre
              </Label>
              <Input
                id="nombre"
                value={rolEditando ? rolEditando.nombre : nuevoRol.nombre}
                onChange={(e) => rolEditando ? setRolEditando({...rolEditando, nombre: e.target.value}) : setNuevoRol({...nuevoRol, nombre: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Permisos</Label>
              <div className="col-span-3 space-y-2">
                {todosLosPermisos.map((permiso) => (
                  <div key={permiso.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permiso.id}
                      checked={rolEditando ? rolEditando.permisos.includes(permiso.id) : nuevoRol.permisos.includes(permiso.id)}
                      onChange={() => togglePermiso(permiso.id)}
                    />
                    <label
                      htmlFor={permiso.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permiso.nombre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDialogoAbierto(false)}>
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button onClick={handleGuardarRol}>
              <Save className="mr-2 h-4 w-4" /> Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}