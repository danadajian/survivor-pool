import React, { type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

import { useDropdown } from "./use-dropdown";

type PortalDropdownMenuProps = {
  showOptions: boolean;
  position: { top: number; right: number };
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  buttonId: string;
  width?: string;
  padding?: string;
  maxHeight?: string;
  className?: string;
} & PropsWithChildren;

export const PortalDropdownMenu = ({
  showOptions,
  position,
  dropdownRef,
  buttonId,
  width = "w-44",
  padding = "p-1",
  maxHeight = "max-h-56 sm:max-h-64",
  className = "",
  children,
}: PortalDropdownMenuProps) => {
  const dropdownMenu = showOptions && (
    <div
      ref={dropdownRef}
      className={`fixed z-50 ${width} origin-top-right overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white/95 ${padding} text-sm font-semibold text-slate-600 shadow-xl shadow-slate-900/10 focus:outline-none ${maxHeight} ${className}`}
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby={buttonId}
      tabIndex={-1}
    >
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );

  return (
    <>
      {typeof document !== "undefined" &&
        createPortal(dropdownMenu, document.body)}
    </>
  );
};

export { useDropdown };
