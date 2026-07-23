import { Inter, Bebas_Neue } from "next/font/google";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });

export const fontVariables = `${sans.variable} ${display.variable}`;
