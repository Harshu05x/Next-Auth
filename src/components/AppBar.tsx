import React from "react";
import { Navbar, NavbarContent, NavbarItem} from "@nextui-org/react";
import SigninButton from "./SignInButton";
import Link from "next/link";

export default function AppBar() {
    return (
        <Navbar isBordered>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="/">
                        Home
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem>
                   <SigninButton />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
