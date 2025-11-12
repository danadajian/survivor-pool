import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export const WeekDropdown = ({
  selected,
  options,
  onSelect,
}: {
  selected: number;
  options: number[];
  onSelect: (option: number) => void;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setPosition({
          top: rect.bottom + window.scrollY + 12, // mt-3 = 12px
          right: window.innerWidth - rect.right + window.scrollX,
        });
      }
    };

    if (showOptions) {
      updatePosition();
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition, true);
      return () => {
        window.removeEventListener("resize", updatePosition);
        window.removeEventListener("scroll", updatePosition, true);
      };
    }
  }, [showOptions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        dropdownRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showOptions]);

  const onClick = (option: number) => {
    onSelect(option);
    setShowOptions(false);
  };

  const dropdownMenu = showOptions && (
    <div
      ref={dropdownRef}
      className="fixed z-50 w-44 origin-top-right rounded-2xl border border-slate-200 bg-white/95 p-1 shadow-xl shadow-slate-900/10 focus:outline-none"
      style={{
        top: `${position.top}px`,
        right: `${position.right}px`,
      }}
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}
    >
      <div className="flex flex-col gap-1">
        {options.map((option, index) => (
          <button
            key={index}
            disabled={option === selected}
            type="button"
            onClick={() => onClick(option)}
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
            {`Week ${option}`}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="relative inline-block text-left">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setShowOptions(!showOptions)}
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
      {typeof document !== "undefined" &&
        createPortal(dropdownMenu, document.body)}
    </>
  );
};
