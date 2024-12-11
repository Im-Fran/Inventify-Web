// import { useState } from 'react'
// import { Bell, Home, Package, Settings, User, Users, Briefcase } from 'lucide-react'
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button/button.tsx"
//
// // Datos simulados de estadísticas
// const estadisticasIniciales = {
//   usuarios: 1200,
//   negocios: 150,
//   productos: 800,
// }
//
// export default function AdminDashboard() {
//   const [estadisticas, setEstadisticas] = useState(estadisticasIniciales)
//
//   return (
//     <div className="flex h-screen bg-background">
//       {/* Barra lateral */}
//       <aside className="w-64 bg-card text-card-foreground">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
//         </div>
//         <nav className="mt-6">
//           <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
//             <Home className="w-5 h-5 mr-3" />
//             Inicio
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-foreground bg-accent">
//             <Package className="w-5 h-5 mr-3" />
//             Estadísticas
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
//             <User className="w-5 h-5 mr-3" />
//             Usuarios
//           </a>
//           <a href="#" className="flex items-center px-6 py-3 text-foreground hover:bg-accent">
//             <Settings className="w-5 h-5 mr-3" />
//             Configuración
//           </a>
//         </nav>
//       </aside>
//
//       {/* Contenido principal */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Encabezado */}
//         <header className="flex items-center justify-between px-6 py-4 bg-background border-b">
//           <h2 className="text-2xl font-semibold text-foreground">Estadísticas</h2>
//           <div className="flex items-center">
//             <button className="p-2 text-foreground hover:bg-accent rounded-full">
//               <Bell className="w-6 h-6" />
//             </button>
//             <button className="flex items-center ml-4 text-sm font-medium text-foreground hover:text-accent">
//               <img
//                 className="w-8 h-8 rounded-full mr-2"
//                 src="/placeholder.svg?height=32&width=32"
//                 alt="Avatar del usuario"
//               />
//               Juan Pérez
//             </button>
//           </div>
//         </header>
//
//         {/* Área de contenido principal */}
//         <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Usuarios Registrados</CardTitle>
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{estadisticas.usuarios}</div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Negocios Registrados</CardTitle>
//                 <Briefcase className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{estadisticas.negocios}</div>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Productos Registrados</CardTitle>
//                 <Package className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{estadisticas.productos}</div>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }