import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export function DialogComponent({ isOpen, onOpenChange, rolEditando, nuevoRol, setRolEditando, setNuevoRol, handleGuardarRol, todosLosPermisos, togglePermiso }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                    onCheckedChange={() => togglePermiso(permiso.id)}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleGuardarRol}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}