"use client";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [{ name: "Dashboard", href: "/Dashboard", current: true }];

const Header = () => {
  const { data: session } = useSession();
  const path = usePathname();

  if (path.includes("sign-in")) {
    return null;
  }

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 dark:bg-slate-400">
        <div className="container">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text cursor-pointer">
                  <Link href={"/"}> TextAnalyzer </Link>
                </h1>
              </div>
              {session?.user && (
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        aria-current={item.current ? "page" : undefined}
                        className={
                          item.current
                            ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {/* Profile dropdown */}
                {session?.user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">User menu</span>
                        <Image
                          alt=""
                          src={session?.user?.image ?? ""}
                          className="h-8 w-8 rounded-full"
                          width={8}
                          height={8}
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <MenuItem key={"SignOut"}>
                        <p
                          onClick={() => signOut()}
                          className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 cursor-pointer"
                        >
                          Sign Out
                        </p>
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <Link
                    href={"/sign-in"}
                    className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md px-3 py-2 text-sm font-medium"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <MenuIcon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={
                  item.current
                    ? "bg-gray-900 text-white rounded-md px-3 py-2 text-base font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                }
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <Image
                  alt=""
                  src={session?.user?.image ?? ""}
                  className="h-10 w-10 rounded-full"
                  width={8}
                  height={8}
                />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium leading-none text-white">
                  {session?.user?.name}
                </div>
                <div className="text-sm font-medium leading-none text-gray-400">
                  {session?.user?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2 cursor-pointer">
              <Button
                key={"SignOut"}
                onClick={() => signOut()}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white cursor-pointer"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </>
  );
};

export default Header;
