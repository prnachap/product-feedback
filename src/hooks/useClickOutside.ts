import { useEffect } from "react";

/**
 * this hooks runs the callback function when an mouse event occurs outside a component
 * @param ref reference of the component
 * @param onClickOutside callback function
 * @return void
 */

export const useClickOutside = <T extends HTMLElement = HTMLElement>({
  ref,
  onClickOutside,
}: {
  ref: React.RefObject<T>;
  onClickOutside?: () => void;
}) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current?.contains?.(event?.target as Node)) {
        onClickOutside?.();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClickOutside, ref]);
};
