"use client";
import { InputOtp } from "@heroui/react";
import { Kbd } from "@heroui/react";
import { useState, useRef, useEffect } from "react";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Page() {
  const [value, setValue] = useState<string>("");
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);
  const thirdInputRef = useRef<HTMLInputElement>(null);
  const fourthInputRef = useRef<HTMLInputElement>(null);
  const fifthInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log(value)
    if (value.length > 4){
      secondInputRef.current?.click();
    }
  }, [value])

  function isInvalidFirstInput(): boolean {
    if (value.length === 0) return false; 
    const regex: RegExp = /^[A-Z]+$/;
    return !regex.test(value.slice(0, 4));
  }

  return (
    <main className="flex flex-col items-center w-full justify-center min-h-screen p-3 gap-3">
      <ThemeSwitcher />
      <h1 className="text-3xl font-bold">Validador de CURP.</h1>
      <section className="flex flex-row items-start justify-center gap-2 h-auto">
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="border-primary border-2 border-dashed p-3 rounded-lg">
            <InputOtp
              allowedKeys="[A-Za-z0-9]*$"
              size="lg"
              length={4}
              onValueChange={setValue}
              ref={firstInputRef}
              autoFocus
              onFocus={() => console.log("focus")}
              isInvalid={isInvalidFirstInput()}
              fullWidth
              errorMessage={<span className="text-danger font-semibold">SoloI letras mayusculas.</span>}
            />
          </div>
          <p className="font-semibold text-small text-primary">
            Primeras letras del nombre y apellido
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="border-secondary border-2 border-dashed p-3 rounded-lg">
            <InputOtp size="lg" length={5} allowedKeys="[A-Za-z0-9]*$" ref={secondInputRef} isDisabled={value.length < 4 || isInvalidFirstInput()}
            onValueChange={(value: string) => setValue((prev: string) => prev + value)}
            />
          </div>
          <p className="font-semibold text-small text-secondary">
            Fecha de nacimiento <Kbd>YYMMDD</Kbd>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="border-danger border-2 border-dashed p-3 rounded-lg">
            <InputOtp size="lg" length={1} allowedKeys="[A-Za-z0-9]*$" isDisabled={value.length < 9}
            onValueChange={(value: string) => setValue((prev: string) => prev + value)}
            />
          </div>
          <p className="font-semibold text-small text-danger">
            Sexo <Kbd>H</Kbd> o <Kbd>M</Kbd>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="border-success border-2 border-dashed p-3 rounded-lg">
            <InputOtp size="lg" length={2} allowedKeys="[A-Za-z0-9]*$" isDisabled={value.length < 10} />
          </div>
          <p className="font-semibold text-small text-success">
            Entidad federativa
          </p>
        </div>
        <div className="flex flex-col items-center justify-end gap-2">
          <div className="border-yellow-400 border-2 border-dashed p-3 rounded-lg">
            <InputOtp size="lg" length={2} allowedKeys="[A-Za-z0-9]*$" isDisabled={value.length < 12} />
          </div>
          <p className="font-semibold text-small text-yellow-400 text-wrap max-w-24">
            Consonantes
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 w-max">
          <div className="border-yellow-400 border-2 border-dashed p-3 rounded-lg">
            <InputOtp size="lg" length={1} allowedKeys="[A-Za-z0-9]*$" />
          </div>
          <p className="font-semibold text-small text-yellow-400  max-w-24">
            Digito diferenciador.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <div className="border-yellow-400 border-2 border-dashed p-3 rounded-lg">
            <InputOtp size="lg" length={1} allowedKeys="[A-Za-z0-9]*$" />
          </div>
          <p className="font-semibold text-small text-yellow-400 text-nowrap max-w-24">
            Digito verificador.
          </p>
        </div>
      </section>
    </main>
  );
}
