import CustomCard from "../UI/CustomCard";

const FeedbackLogo: React.FC = () => {
  return (
    <CustomCard className="bg-gradient-to-r from-purple-500 to-pink-500 w-[15.9375rem] max-w-[15.9375rem] !px-6 !pt-14 !pb-6 relative">
      <div className="absolute right-2 top-2 ">{/* <AuthButton /> */}</div>
      <h2 className="secondary-text text-white">Frontend Mentor</h2>
      <span className="body-two-text text-white">Feedback board</span>
    </CustomCard>
  );
};

export default FeedbackLogo;
