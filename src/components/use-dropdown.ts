import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [position, setPosition] = useState({ top: 0, right: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!buttonRef.current) {
        return;
      }

      const margin = 8;
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current?.offsetHeight ?? 0;
      const viewportTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const viewportBottom = viewportTop + viewportHeight;

      let top = rect.bottom + window.scrollY + margin;

      if (dropdownHeight > 0) {
        const preferredBottom = top + dropdownHeight;
        if (preferredBottom > viewportBottom - margin) {
          top = rect.top + window.scrollY - dropdownHeight - margin;
        }

        const maxTop = viewportBottom - dropdownHeight - margin;
        const minTop = viewportTop + margin;

        if (dropdownHeight >= viewportHeight - margin * 2) {
          top = viewportTop + margin;
        } else {
          top = Math.min(Math.max(top, minTop), maxTop);
        }
      }

      setPosition({
        top,
        right: window.innerWidth - rect.right + window.scrollX,
      });
    };

    if (showOptions) {
      updatePosition();
      requestAnimationFrame(updatePosition);
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

  const toggle = () => setShowOptions((prev) => !prev);
  const close = () => setShowOptions(false);

  return {
    showOptions,
    position,
    buttonRef,
    dropdownRef,
    toggle,
    close,
  };
};
