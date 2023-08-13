import { FaAngleDown, FaAngleUp, FaListUl } from "react-icons/fa";


type ExpandIconPros = {
  isExpanded: boolean,
  handleClick: () => void,
};

export default function ExpandIcon({
  isExpanded,
  handleClick,
}: ExpandIconPros) {
  return isExpanded ? (
    <FaAngleUp onClick={handleClick} />
  ) : (
    <FaAngleDown onClick={handleClick} />
  );
}