import { MenuIcon } from "@heroicons/react/outline";
import React from "react";

interface Props {
  setSidebarOpen: (b: boolean) => void;
}

export default function MobileTopNav({ setSidebarOpen }: Props) {
  return (
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
  );
}
