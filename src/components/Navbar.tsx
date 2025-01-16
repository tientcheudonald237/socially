import Link from "next/link";
import Image from "next/image";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { currentUser } from "@clerk/nextjs/server";
import { syncUser } from "@/actions/user.action";

async function Navbar() {
    let user = null;
    try {
        user = await currentUser();
        if (user) await syncUser();
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        // return;
    }
    if (user) await syncUser();
    return (
        <nav className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-primary font-mono tracking-wider">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                width={120}
                                height={120}
                                className="mr-2"
                            />
                        </Link>
                    </div>

                    {user && <DesktopNavbar username={user.username ?? ''} />}
                    <MobileNavbar />
                </div>
            </div>
        </nav>
    )
}

export default Navbar