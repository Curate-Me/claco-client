import { ReactComponent as Search } from "@/assets/svgs/search.svg";
import { SearchBarProps } from "@/types";
import { forwardRef } from "react";
import { ReactComponent as X } from "@/assets/svgs/X-icon.svg";

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, onKeyDown, onFocus, placeholder }, ref) => {
    const handleClear = () => {
      if (onChange) {
        onChange({
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    };

    return (
      <div className="w-full flex items-center pl-[13px] pr-2 py-[15px] rounded-[7px] bg-grayscale-30 gap-[7px]">
        <Search width="18" height="18" viewBox="0 0 24 24" color="#8A8585" />
        <input
          ref={ref}
          type="search"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          className="flex justify-center flex-grow w-full outline-none bg-grayscale-30 text-grayscale-80 text-body2-medium placeholder:text-grayscale-60"
        />
        {value && (
          <X
            width="10"
            height="10"
            viewBox="0 0 16 16"
            onClick={handleClear}
            className="absolute top-[21px] right-[18px] text-white cursor-pointer"
          />
        )}
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
