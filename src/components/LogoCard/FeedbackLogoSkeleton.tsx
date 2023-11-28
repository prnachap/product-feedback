import CustomCard from "../UI/CustomCard";

const FeedbackLogoSkeleton: React.FC = () => {
  return (
    <CustomCard
      className={`loader-animation w-[15.9375rem] max-w-[15.9375rem] !px-6 !pt-14 !pb-6 bg-gray-100 shadow-sm`}
    >
      <div className="absolute right-2 top-2"></div>
      <div className="w-20 h-6 bg-gray-200 rounded-md"></div>
      <div className="w-14 mt-4 h-4 bg-gray-200 rounded-md"></div>
    </CustomCard>
  );
};

export default FeedbackLogoSkeleton;
