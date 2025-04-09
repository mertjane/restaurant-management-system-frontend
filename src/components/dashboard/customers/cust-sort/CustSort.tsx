import React, { useState } from "react";
import "../customers.component.scss";
import { DownChevronIcon } from "../../../../lib/icons/Icons";
import { SortOption, setSort } from "../../../../lib/redux/slices/sortSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../lib/redux/store";

const Sort = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Name A-Z", value: "name_asc" },
    { label: "Name Z-A", value: "name_desc" },
    { label: "Newest", value: "newest" },
    { label: "Oldest", value: "oldest" },
  ];

  const sort = useSelector((state: RootState) => state.sort.value);
  const dispatch = useDispatch<AppDispatch>();

  const handleSortChange = (option: SortOption) => {
    dispatch(setSort(option));
    setIsOpen(false);
  };

  const currentLabel = sortOptions.find((opt) => opt.value === sort)?.label;

  return (
    <div className="sort-wrapper" onClick={() => setIsOpen(!isOpen)}>
      <label>
        Sort by:{" "}
        <strong>
          {currentLabel} <DownChevronIcon />{" "}
        </strong>
      </label>

      {isOpen && (
        <div className="dropdown-wrapper">
          <div className="arrow"></div>
          <ul>
            {sortOptions.map((opt) => (
              <li key={opt.value} onClick={() => handleSortChange(opt.value)}>
                {opt.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sort;
