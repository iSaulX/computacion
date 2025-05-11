"use client"; 
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { useState, useEffect, type ReactNode } from "react"; 

export default function Providers({ children }: { children: ReactNode}): ReactNode {
    const [mounted, setMounted] = useState<boolean>(false); 

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; 
    return ( 
        <ThemeProvider attribute="class">
            <HeroUIProvider>
                <ToastProvider />
                {children}
            </HeroUIProvider>
        </ThemeProvider>
    )
}