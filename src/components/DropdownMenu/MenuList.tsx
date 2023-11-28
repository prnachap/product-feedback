import { motion } from "framer-motion";
import { isEqual } from "lodash";
import CheckIcon from "../../../public/assets/shared/icon-check.svg";

type MenuListProps<T> = {
  listItems: T[];
  value: T;
  onChange: (value: T) => void;
};

const menuListVariant = {
  initial: {
    opacity: 0,
    y: "-50%",
  },
  final: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: "-50%",
    transition: {
      type: "tween",
      duration: 0.3,
    },
  },
};

function MenuList<T extends string | number>({
  listItems,
  value,
  onChange,
}: MenuListProps<T>) {
  const renderListItems = (listItems: T[]) => {
    return listItems?.map((item) => (
      <li
        key={item}
        className="flex justify-between items-center border-b-[1px] border-solid border-american-blue-100 border-opacity-10 last:border-none px-6 py-3 capitalize cursor-pointer hover:text-purple-1000 transition-all"
        onClick={() => onChange(item)}
      >
        {item}
        {isEqual(value, item) && <CheckIcon />}
      </li>
    ));
  };

  return (
    <motion.ul
      initial="initial"
      animate="final"
      exit="exit"
      variants={menuListVariant}
      className="max-w-full  rounded-lg bg-white shadow-xl mt-4"
    >
      {renderListItems(listItems)}
    </motion.ul>
  );
}

export default MenuList;
