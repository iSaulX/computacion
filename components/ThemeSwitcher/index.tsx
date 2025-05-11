"use client"; 
import { FaSun as Sun, FaMoon as Moon } from "react-icons/fa";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
export default function ThemeSwitcher(){
    const { theme, setTheme } = useTheme();

    function handleThemeChange(){
        setTheme (theme === "dark" ? "light" : "dark");
    }

    return ( 
        <Switch 
        thumbIcon={theme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
        size="lg"
        className="absolute top-4 right-4"
        onChange={handleThemeChange}
        isSelected={theme === "dark"}
        />
    )
}