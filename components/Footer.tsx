import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="flex justify-center items-center text-center text-sm bg-background py-2 px-2">
      Made with ❤️ by
      <Link href="https://quatadahnasdami.vercel.app" target="_blank">
        <Button variant="linkHover2">Quatadah Nasdami</Button>
      </Link>
    </footer>
  );
};

export default Footer;
