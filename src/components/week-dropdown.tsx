import React, { useState } from "react";

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

  const onClick = (option: number) => {
    onSelect(option);
    setShowOptions(false);
  };

  return (
    <div className="relative inline-block">
      <div>
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Change Week
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
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
      {showOptions && (
        <div
          className="ring-opacity-5 absolute z-10 mt-2 ml-4 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="bg-gray-100">
            {options.map((option, index) => (
              <button
                key={index}
                disabled={option === selected}
                type="button"
                onClick={() => onClick(option)}
                className={`focus:outline-none" px-8 py-2 text-center text-sm hover:bg-gray-400 disabled:bg-gray-100 ${
                  option === selected
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700"
                }`}
                role="menuitem"
                tabIndex={-1}
              >
                {`Week ${option}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
