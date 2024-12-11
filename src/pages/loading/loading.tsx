import {clsx} from "clsx";

const Loading = () => <div
  className={clsx(["bg-neutral-100 text-neutral-800 transition-colors duration-200 dark:bg-neutral-800 dark:text-neutral-50"])}>
  <div className={"flex"}>
    <div className={"flex h-full w-full flex-col gap-20"}>
      <div className={"container mx-auto min-h-screen w-full"}>
        <div className={"flex flex-col items-center justify-center h-full"}>
          <div className={"flex flex-col items-center"}>
            <div className={"flex items-center gap-2"}>
              <svg
                className={"animate-spin h-10 w-10 text-primary-500 dark:text-primary-400"}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24">
                <circle className={"opacity-25"} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className={"opacity-75"} fill="currentColor"
                      d="M4 12a8 8 0 018-8V2.5"/>
              </svg>
              <h1 className={"text-lg font-semibold"}>Cargando...</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

export default Loading;