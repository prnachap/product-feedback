import BackButton from "@/components/Button/BackButton";
import EmptyFeedback from "@/components/EmptyFeedback/EmptyFeedback";
import LayoutContainer from "@/components/UI/LayoutContainer";

export default function NotFound() {
  return (
    <main>
      <LayoutContainer className="!w-[95%] mt-6 h-[70vh]">
        <div className="flex justify-between items-center z-20 mb-6 sticky top-0 md:top-10 lg:top-14">
          <BackButton />
        </div>
        <EmptyFeedback
          title="404 not found"
          description="Could not find the requested feedback"
        />
      </LayoutContainer>
    </main>
  );
}
