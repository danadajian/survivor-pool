import { UserButton } from "@clerk/clerk-react";
import type { JSXElementConstructor } from "react";

const UserButtonJSX = UserButton as JSXElementConstructor<unknown>;

export const Header = () => {
  return (
    <header className={`fixed z-50 w-full shadow-2xl`}>
      <nav className="border-gray-200 bg-white px-4 py-2 dark:bg-gray-800 lg:px-6">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between text-white">
          <div className="flex w-8 items-center">
            <UserButtonJSX />
          </div>
        </div>
      </nav>
    </header>
  );
};