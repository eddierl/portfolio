import { Lato, Oswald } from "next/font/google";
import CV from "../components/CV";
import "./cv.css";
const lato = Lato({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lato",
});

const oswald = Oswald({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oswald",
});

export default function CVPage() {
  return (
    <div className={[lato.variable, oswald.variable, lato.className].join(" ")}>
      <CV />
    </div>
  );
}
