import ShieldLogo from "./ShieldLogo";
import WebTitle from "./WebTitle";

const Header = () => {
  return (
    <header className="w-full h-12 fixed top-0 left-0 right-0 bg-[#151136] py-2 px-4">
      <section className="flex flex-row gap-2 h-full items-center">
        <ShieldLogo className="size-7" />
        <WebTitle className="text-2xl" />        
      </section>
    </header>
  );
};

export default Header;
