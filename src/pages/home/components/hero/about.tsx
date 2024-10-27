import {Button} from "@/components/ui/button.tsx";

const About = () => <section className={"w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-red-50 dark:bg-neutral-900"}>
  <div className={"container px-4 md:px-6"}>
    <div className={"flex flex-col items-center space-y-4 text-center"}>
      <div className={"space-y-2"}>
        <h1 className={"text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"}>
          Gestiona tu negocio con RubyBox
        </h1>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
          Sistema autogestionado de negocios que simplifica tus operaciones diarias y potencia tu crecimiento.
        </p>
      </div>
      <div className="space-x-4">
        <Button>Comenzar ahora</Button>
        <Button variant="outline">Saber más</Button>
      </div>
    </div>
  </div>
</section>;

export default About