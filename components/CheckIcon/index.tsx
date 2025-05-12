"use client"; 
import { motion } from "framer-motion";
import type { ComponentPropsWithoutRef } from "react";

export default function CheckIcon(props: ComponentPropsWithoutRef<"svg">){
    return ( 
        <svg
    width="196px"
    height="196px"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g>
      <motion.path
        d="M4 12.6111L8.92308 17.5L20 6.5"
        stroke="#77bb41"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
      />
    </g>
  </svg>
    )
}