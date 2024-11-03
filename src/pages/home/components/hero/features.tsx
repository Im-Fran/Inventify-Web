import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {BarChart3, Box, Database} from "lucide-react";

const Features = () => <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-50 dark:bg-neutral-800">
  <div className="container px-4 md:px-6">
    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Características
      principales</h2>
    <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
      <Card>
        <CardHeader>
          <BarChart3 className="h-10 w-10 text-pink-600 mb-4"/>
          <CardTitle>Reporte de Ventas</CardTitle>
          <CardDescription>
            Analiza tus ventas con informes detallados y visualizaciones intuitivas.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Informes en tiempo real</li>
            <li>Gráficos interactivos</li>
            <li>Análisis de tendencias</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Box className="h-10 w-10 text-pink-600 mb-4"/>
          <CardTitle>Administración de Stock</CardTitle>
          <CardDescription>
            Gestiona tu inventario de manera eficiente y evita roturas de stock.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Control de inventario en tiempo real</li>
            <li>Alertas de stock bajo</li>
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Database className="h-10 w-10 text-pink-600 mb-4"/>
          <CardTitle>Base de Datos Globalizada</CardTitle>
          <CardDescription>
            Accede a una amplia base de datos de productos actualizada constantemente.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Catálogo global de productos</li>
            <li>Actualizaciones automáticas</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>;

export default Features