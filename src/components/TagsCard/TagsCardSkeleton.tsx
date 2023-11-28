import CustomCard from "../UI/CustomCard";

const TagsCardSkeleton: React.FC = () => {
  return (
    <CustomCard
      className={`loader-animation w-[15.9375rem] max-w-[15.9375rem] !p-6 flex flex-wrap gap-2 bg-gray-100 shadow-sm`}
    >
      <div className="bg-gray-200 h-5 w-10 rounded-md"></div>
      <div className="bg-gray-200 h-5 w-10 rounded-md"></div>
      <div className="bg-gray-200 h-5 w-28 rounded-md"></div>
      <div className="bg-gray-200 h-5 w-10 rounded-md"></div>
      <div className="bg-gray-200 h-5 w-10 rounded-md"></div>
      <div className="bg-gray-200 h-5 w-10 rounded-md"></div>
    </CustomCard>
  );
};

export default TagsCardSkeleton;
