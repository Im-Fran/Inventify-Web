import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function TableComponent() {
  return (
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
  )
}
