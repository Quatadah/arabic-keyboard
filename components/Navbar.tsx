import { ModeToggle } from "./ToggleMode";

const Navbar = () => {
  return (
    <nav className="m-auto flex items-center w-full justify-between">
      <h2 className="text-3xl font-bold">Arabic Keyboard</h2>
      <ModeToggle />
    </nav>
  );
};

export default Navbar;
