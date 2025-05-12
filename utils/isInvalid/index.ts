import { useEffect, type Dispatch, type SetStateAction } from "react";

export default function useIsInValid(value: string, setCurrentMessage: Dispatch<SetStateAction<string>>): [boolean, string]{
    useEffect(() => {
        if (value.length < 4){
          setCurrentMessage("Iniciales del nombre y apellido");
        } else if (value.length >= 4 && value.length < 10){
          setCurrentMessage("Fecha de nacimiento formato YYMMDD");
        } else if (value.length >= 10 && value.length < 11){
          setCurrentMessage("Sexo");
        } else if (value.length >= 11 && value.length < 13){
          setCurrentMessage("Entidad federativa");
        } else if (value.length >= 13 && value.length < 16){
          setCurrentMessage("Consonantes del apellido y nombre"); 
        } else if (value.length >= 16 && value.length < 17){
          setCurrentMessage("Diferenciador de homonimia");
        } else if (value.length === 17){
          setCurrentMessage("Digito verificador"); 
        }
      }, [value]);
    let month: number; 
    if(value.length === 0) return [false, ""]; 
    const initialsRegex = /^[A-Z]*$/;
    if (!initialsRegex.test(value.slice(0, 4))){
      return [true, "Las iniciales deben ser letras mayusculas y sin espacios."]
    }
    const yearRegex = /^[0-9]*$/
    if (!yearRegex.test(value.slice(5, 6)) && value.length > 4){
      return [true, "El año debe ser un número de dos dígitos."]
    }
    if (value.length > 6){
      month = parseInt(value.slice(6, 8)); 

      if (isNaN(month)){
        return [true, "El mes debe ser un numero, no letras."]
      }
      if (value.slice(6, 7) !== "0" && value.slice(6, 7) !== "1"){
        return [true, "No existe un mes con ese formato"]
      }

      if (month === 0 && value.length === 7){
        return [false, ""]; 
      }
      if (!/^[0-9]*$/.test(value.slice(6, 8))){
        return [true, "El mes debe ser un número de dos dígitos."]
      }
      
      if ((month < 1 || month > 12)){
        return [true, "El mes debe ser un número entre 01 y 12."]
      }
      
    }
    if (value.length > 8){
      const day = parseInt(value.slice(8, 10));
      month = parseInt(value.slice(6, 8));
      if (isNaN(day)){
        return [true, "El día debe ser un número, no letras."]
      }
      const monthsWith30Days = [4, 6, 9, 11];
      const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
      if (value.length === 9 && day > 3){
        return [true, "No existen meses con 40 dias o más."]
      }
      if (value.length === 9 && day === 0){
        return [false, ""]; 
      }
      if (value.length === 9 && month === 2 &&  day >= 3){
        return [true, "Febrero no puede contener más de 29 días."];
      }
      if (day < 1 || day > 31){
        return [true, "El día debe ser un número entre 01 y 31."]
      }
      if (!/^[0-9]*$/.test(value.slice(8, 10))){
        return [true, "El día deben ser números, no letras."]
      }
      if (monthsWith30Days.includes(month) && day > 30){
        return [true, "El mes seleccionado no puede tener más de 30 días."]
      }
      if (month === 2 && day > 29){
        return [true, "Febrero no puede tener más de 29 días."]
      }
      if (monthsWith31Days.includes(month) && day > 31){
        return [true, "El mes no puede tener más de 31 días."]
      }

    }

    if (value.length > 10 && value.length < 12){
      
      const gender = value.slice(10, 11);
      if (!/^[HM]$/.test(gender)){
        return [true, "El sexo debe ser 'H' o 'M'."];
      }
    }
    if (value.length > 11){
      const fedarativeEntity = value.slice(11, 13);
      const entities: string[] = [
        "AS", "BC", "BS", "CC", "CL", "CM", "CS", "CH", "DF", "DG", "GT",
        "GR", "HG", "JC", "MC", "MS", "MN", "NL", "OC", "NT", "PL", "QR", "QT",
        "SL", "SP", "SR", "TC", "TS", "VZ", "YN", "ZS", "NE",
      ]; 
      if (value.length === 12 && !entities.some(entity => entity.startsWith(fedarativeEntity))){
        return [true, "Ninguna entidad federativa comienza con esas letras."];
      }
      if (value.length > 12 && !entities.includes(fedarativeEntity) ){
        return [true, "La entidad federativa no es válida."];
      }
    }
    if(value.length > 13){
      const consonantsRegex = /^[A-Z]*$/;
      const consonants = value.slice(13, 16);
      if (!consonantsRegex.test(consonants)){
        return [true, "Las consonantes deben ser letras mayúsculas y sin espacios."];
      }
    }
    if (value.length > 16){
      const homonimia = value.slice(16, 17);
      if (!/^[0-9A-Z]*$/.test(homonimia)){
        return [true, "El diferenciador de homonimia debe ser un número."];
      }
    }
    if (value.length === 18){
      const verifier = value.slice(17, 18);
      if (!/^[0-9]$/.test(verifier)) {
        return [true, "El último carácter (dígito verificador) debe ser un número."];
      }
      const fullRegex = /^[A-Z]{4}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM][A-Z]{2}[A-Z]{3}[A-Z0-9]{1}[0-9]$/;
      if (!fullRegex.test(value)) {
        return [true, "El CURP no es válido."];
      }
    }
    
    return [false, ""]; 
  
  }