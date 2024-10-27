import Navigation from "@/pages/home/components/navigation.tsx";
import Footer from "@/pages/home/components/footer.tsx";

import About from "@/pages/home/components/hero/about.tsx";
import Features from "@/pages/home/components/hero/features.tsx";
import StartNow from "@/pages/home/components/hero/start-now.tsx";

const Home = () => <div className={"flex flex-col min-h-screen"}>
  <Navigation/>
  <main className="flex-1">
    <About/>
    <Features/>
    <StartNow/>
  </main>
  <Footer/>
</div>

export default Home