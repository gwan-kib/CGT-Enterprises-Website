import {
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type KeyboardEvent,
} from "react";

export interface CustomSelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean;
  id: string;
  name: string;
  onChange: (value: string) => void;
  options: readonly CustomSelectOption[];
  placeholder: string;
  value: string;
}

export function CustomSelect({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  id,
  name,
  onChange,
  options,
  placeholder,
  value,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const allOptions = [{ label: placeholder, value: "" }, ...options];
  const selectedIndex = Math.max(
    0,
    allOptions.findIndex((option) => option.value === value),
  );
  const selectedOption = allOptions[selectedIndex];
  const listboxId = `${id}-listbox`;

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setIsClosing(true);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    listboxRef.current
      ?.querySelector<HTMLElement>(`#${id}-option-${activeIndex}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, id, isOpen]);

  function openDropdown() {
    setActiveIndex(selectedIndex);
    setIsClosing(false);
    setIsOpen(true);
  }

  function closeDropdown() {
    if (!isOpen) {
      return;
    }

    setIsOpen(false);
    setIsClosing(true);
  }

  function chooseOption(index: number) {
    onChange(allOptions[index].value);
    setActiveIndex(index);
    closeDropdown();
    triggerRef.current?.focus();
  }

  function handleListboxAnimationEnd(event: AnimationEvent<HTMLUListElement>) {
    if (
      event.currentTarget === event.target &&
      event.animationName === "static-select-slide-up"
    ) {
      setIsClosing(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
          return;
        }
        setActiveIndex((current) => Math.min(current + 1, allOptions.length - 1));
        return;
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          openDropdown();
          return;
        }
        setActiveIndex((current) => Math.max(current - 1, 0));
        return;
      case "Home":
        event.preventDefault();
        if (!isOpen) {
          setIsClosing(false);
          setIsOpen(true);
        }
        setActiveIndex(0);
        return;
      case "End":
        event.preventDefault();
        if (!isOpen) {
          setIsClosing(false);
          setIsOpen(true);
        }
        setActiveIndex(allOptions.length - 1);
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen) {
          chooseOption(activeIndex);
        } else {
          openDropdown();
        }
        return;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          closeDropdown();
        }
        return;
      case "Tab":
        closeDropdown();
        return;
    }
  }

  return (
    <div className="static-select" ref={rootRef}>
      <input name={name} type="hidden" value={value} />
      <button
        aria-activedescendant={isOpen ? `${id}-option-${activeIndex}` : undefined}
        aria-autocomplete="none"
        aria-controls={listboxId}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-invalid={ariaInvalid}
        className={`static-select__trigger${value ? "" : " static-select__trigger--placeholder"}`}
        id={id}
        onClick={() => (isOpen ? closeDropdown() : openDropdown())}
        onKeyDown={handleKeyDown}
        ref={triggerRef}
        role="combobox"
        type="button"
      >
        <span>{selectedOption.label}</span>
        <span aria-hidden="true" className="static-select__icon material-symbols-rounded">
          keyboard_arrow_down
        </span>
      </button>

      {(isOpen || isClosing) && (
        <ul
          aria-hidden={isClosing ? true : undefined}
          aria-label={placeholder}
          className={`static-select__listbox${isClosing ? " static-select__listbox--closing" : ""}`}
          id={listboxId}
          onAnimationEnd={handleListboxAnimationEnd}
          ref={listboxRef}
          role="listbox"
        >
          {allOptions.map((option, index) => {
            const isActive = activeIndex === index;
            const isSelected = selectedIndex === index;

            return (
              <li
                aria-selected={isSelected}
                className={`static-select__option${isActive ? " static-select__option--active" : ""}${isSelected ? " static-select__option--selected" : ""}`}
                id={`${id}-option-${index}`}
                key={option.value}
                onClick={() => chooseOption(index)}
                onMouseDown={(event) => event.preventDefault()}
                onPointerMove={() => setActiveIndex(index)}
                role="option"
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span aria-hidden="true" className="static-select__check material-symbols-rounded">
                    check
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
