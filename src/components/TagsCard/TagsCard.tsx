import { category } from "../../constants";
import Chip from "../Chip/Chip";
import CustomCard from "../UI/CustomCard";

const TagsCard: React.FC = () => {
  const renderTags = () => {
    return category.map((tag) => {
      return <Chip key={tag}>{tag}</Chip>;
    });
  };

  return (
    <CustomCard className="w-[15.9375rem] max-w-[15.9375rem] !p-6 flex flex-wrap gap-2">
      {renderTags()}
    </CustomCard>
  );
};

export default TagsCard;
