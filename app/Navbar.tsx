"use client";
import { useToggle } from "react-use";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
const Navbar = () => {
    const [isMenuOpen, toggleMenu] = useToggle(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/grids", label: "Grids" },
        { href: { pathname: "/products", query: { products: [1, 23, 53, 74, 57] } }, label: "Page (5 Products)" },
        { href: { pathname: "/api/products", query: { id: [1, 23, 53, 74, 57] } }, label: "Products Api sample" },
    ];
    return (
        <>
            <header className="sm:px-8 px-4 py-2 z-50 w-full">
                <nav className="flex justify-between items-center max-container">
                    <Link href="/" className="text-3xl font-bold">
                        😎
                    </Link>
                    <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <Link
                                    href={item.href}
                                    className="font-montserrat leading-normal text-lg text-black dark:text-slate-100"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* <div className="flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24">
            <a href="/">Sign in</a>
            <span>/</span>
            <a href="/">Explore now</a>
          </div> */}
                    <div
                        className="hidden max-lg:block cursor-pointer"
                        onClick={() => toggleMenu()}
                    >
                        <RxHamburgerMenu className="text-4xl" />
                    </div>
                </nav>
            </header>
            {isMenuOpen && (
                <div >
                    <nav className="z-50 fixed top-0 right-0 left-0 bottom-0 lg:bottom-auto bg-slate-100 dark:bg-black text-black dark:text-slate-100 ">
                        <div
                            className="hidden max-lg:block fixed right-0  px-8 py-4 cursor-pointer"
                            onClick={() => toggleMenu()}
                        >
                            <AiOutlineClose className="text-4xl" />
                        </div>
                        <ul className="lg:hidden flex flex-col items-center justify-center h-full ">
                            {navLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="font-montserrat leading-normal text-lg text-slate-gray"
                                        onClick={() => toggleMenu()}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            )}
        </>
    );
};
export default Navbar;
