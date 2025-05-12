"use client";
import { InputOtp } from "@heroui/react";
import { useState, useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { motion } from "framer-motion";
import useIsInValid from "@/utils/isInvalid";
import CheckIcon from "@/components/CheckIcon";
export default function Page() {
  const [value, setValue] = useState<string>("");
  const [currentMessage, setCurrentMessage] = useState<string>("Iniciales del nombre y apellido");
  const [animationKey, setAnimationKey] = useState<number>(0);
  const [isInvalid, errorMessage] = useIsInValid(value, setCurrentMessage);

  // Reiniciamos la animación solo cuando el currentMessage cambia
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [currentMessage]);

  

  return (
    <main className="flex flex-col items-center w-full justify-center min-h-screen p-3 gap-3">
      <ThemeSwitcher />
      <h1 className="text-3xl font-bold">Validador de CURP.</h1>
      <section className="flex flex-col items-start justify-center gap-2 h-auto">
        <InputOtp 
        length={18}
         size="lg"
         allowedKeys="[A-Za-z0-9]+$"
         value={value}
         onValueChange={setValue}
         errorMessage={<span className="font-semibold">{errorMessage}</span>}
         isInvalid={isInvalid}
         autoFocus
        />
      <p className="text-lg font-semibold">
        Valores a ingresar: <motion.span className="text-primary"
        initial={{
          opacity: 0, 
          y: 20, 
          filter: "blur(10px)"
        }}
        animate={{
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)"
        }}
        transition={{
          duration: 0.5,
        }}
        key={animationKey}
        >{currentMessage}</motion.span>
      </p>
      <div className="flex flex-row items-center justify-center gap-2">
      <p className="font-semibold text-neutral-400">Estado: 
        <span className="data-[status='reject']:text-danger data-[status='accept']:text-success data-[status='pending']:text-foreground"
        data-status={isInvalid ? 'reject' : value.length === 18 ? 'accept' : "pending"}
        >
          {isInvalid ? " Cadena rechazada" : value.length === 18 ? " Cadena aceptada" : " Cadena aun no aceptada..."}
        </span>
      </p>
      {!isInvalid && value.length === 18 && (<CheckIcon width={20} height={20}/>)}
      </div>

      </section>
    </main>
  );
}
