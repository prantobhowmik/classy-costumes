import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link } from "@nextui-org/react";
import UserComponent from "@/components/UserComponent";
import Cart from "@/components/Cart";
import {Divider} from "@nextui-org/react";


export default function Nav() {
  return (
    <div className="flex fixed flex-col top-0 w-screen backdrop-blur-2xl z-20">
      <div className="w-full bg-blue-400 text-sm text-center font-mono  md:p-2 flex items-center justify-center">
        <p>🎁 Limited Time Offer: Use code "DEMO20OFF" for 20% off your first purchase! 🛍️</p>
      </div>
      <Navbar height={5} className="">
        <NavbarBrand>
          <Link href="/" className="font-bold text-2xl text-inherit">CLASSY COSTUMES</Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="#" aria-current="page">
              Shop
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Contact
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link color="foreground" href="/cart_view">
              <Cart/>
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              <UserComponent/>
            </Link>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <Divider className="" />
      <nav className="flex justify-center px-10 md:justify-end md:px-[32vh] pt-2 bg-white/50 backdrop-blur-2xl">
        <ul className="flex md:gap-10 gap-3 font-bold">
          <li>
            <Link color="foreground" href="#">Best Selling</Link>
          </li>
          <li>
            <Link color="foreground" href="#">New Arrivals</Link>
          </li>
          <li>
            <Link color="foreground" href="#">Trends</Link>
          </li>
          <li>
            <Link color="foreground" href="#">Bengal</Link>
          </li>
          <li>
            <Link color="foreground" href="#">Discounts</Link>
          </li>
        </ul>
      </nav>
      <Divider />
    </div>
  );
}
