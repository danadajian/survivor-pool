import React, { useEffect } from "react";

import { PortalDropdownMenu, useDropdown } from "./portal-dropdown";

export const WeekDropdown = ({
  selected,
  options,
  onSelect,
  renderOption,
}: {
  selected: number;
  options: number[];
  onSelect: (option: number) => void;
  renderOption?: (option: number) => React.ReactNode;
}) => {
  const { showOptions, position, buttonRef, dropdownRef, toggle, close } =
    useDropdown();

  useEffect(() => {
    if (!showOptions || !dropdownRef.current) {
      return;
    }

    const selectedOption = dropdownRef.current.querySelector<HTMLButtonElement>(
      "[data-selected='true']",
    );

    if (selectedOption) {
      selectedOption.scrollIntoView({ block: "center" });
    }
  }, [selected, showOptions, dropdownRef]);

  const onClick = (option: number) => {
    onSelect(option);
    close();
  };

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          ref={buttonRef}
          type="button"
          onClick={toggle}
          className="group inline-flex min-w-[8.5rem] items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm shadow-slate-900/10 transition hover:-translate-y-0.5 hover:border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          id="menu-button"
          aria-expanded={showOptions}
          aria-haspopup="true"
        >
          Change Week
          <svg
            className="h-5 w-5 text-slate-500 transition group-hover:text-slate-700"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <PortalDropdownMenu
        showOptions={showOptions}
        position={position}
        dropdownRef={dropdownRef}
        buttonId="menu-button"
        width="w-44"
        padding="p-1"
      >
        {options.map((option, index) => (
          <button
            key={index}
            disabled={option === selected}
            type="button"
            onClick={() => onClick(option)}
            data-selected={option === selected}
            className={[
              "w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              option === selected
                ? "bg-slate-900 text-white focus-visible:outline-slate-900"
                : "text-slate-600 hover:bg-slate-100 focus-visible:outline-slate-300",
            ]
              .filter(Boolean)
              .join(" ")}
            role="menuitem"
            tabIndex={-1}
          >
            {renderOption ? renderOption(option) : `Week ${option}`}
          </button>
        ))}
      </PortalDropdownMenu>
    </>
  );
};
