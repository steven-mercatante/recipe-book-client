import React, { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { PlusIcon, ViewListIcon, MenuIcon } from "@heroicons/react/outline";
import MobileSidebar from "./MobileSidebar";
import { Routes } from "../constants";
import DesktopSidebar from "./DesktopSidebar";
import ContentContainer from "./ContentContainer";

const navigation = [
  { name: "Recipes", href: Routes.ViewRecipes, icon: ViewListIcon },
  {
    name: "New Recipe",
    href: Routes.NewRecipe,
    icon: PlusIcon,
  },
];

interface Props {
  children: React.ReactChild;
}

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();

  return (
    <div className="h-full flex">
      <MobileSidebar
        navigation={navigation}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
        user={user}
      />
      <DesktopSidebar navigation={navigation} user={user} />
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="lg:hidden">
          <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
            <div>
              <strong>Merc Meals</strong>
            </div>
            <div>
              <button
                type="button"
                className="-mr-3 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 relative z-0 flex overflow-hidden">
          <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
            <ContentContainer>{children}</ContentContainer>
          </main>
        </div>
      </div>
    </div>
  );
}
