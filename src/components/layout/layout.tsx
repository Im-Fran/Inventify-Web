import {Outlet, ScrollRestoration} from "react-router-dom";
import {clsx} from "clsx";
import {Toaster} from "react-hot-toast";
import { Theme } from "@radix-ui/themes";

const Layout = () => <Theme>
  <div className={clsx(["bg-neutral-100 text-neutral-800 transition-colors duration-200 dark:bg-neutral-800 dark:text-neutral-50"])}>
    <div className={"flex"}>
      <div className={"flex h-full w-full flex-col gap-20"}>
        <div className={"container mx-auto min-h-screen w-full"}>
          <Outlet/>
        </div>
      </div>
    </div>
    <ScrollRestoration/>
    <Toaster/>
  </div>
</Theme>;

export default Layout