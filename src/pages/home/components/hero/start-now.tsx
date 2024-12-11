import {Button} from "@/components/ui/button/button.tsx";
import {ArrowRight} from "lucide-react";
import {Link} from "react-router-dom";

const StartNow = () => <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-100 dark:bg-neutral-900">
  <div className="container px-4 md:px-6">
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          ¿Listo para impulsar tu negocio?
        </h2>
        <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Únete a miles de empresas que ya están utilizando RubyBox para optimizar sus operaciones.
        </p>
      </div>
      <Link to={"/auth/register"}>
        <Button>
          Comenzar prueba gratuita
          <ArrowRight className="ml-2 h-4 w-4"/>
        </Button>
      </Link>
    </div>
  </div>
</section>;

export default StartNow