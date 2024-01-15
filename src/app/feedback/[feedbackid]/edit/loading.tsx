import LayoutContainer from "@/components/UI/LayoutContainer";

const loading = () => {
  return (
    <LayoutContainer className="mt-8 w-[90%] md:w-full">
      <div className="flex flex-col items-start gap-1 loader-animation">
        <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
        <div className="h-5 w-10 bg-gray-200 rounded-md"></div>
      </div>
      <div className="bg-white rounded-lg relative mt-10 loader-animation">
        <div className="absolute top-[-26px] left-6">
          <div className="h-14 w-14 bg-gray-200 rounded-full z-50"></div>
        </div>
        <div className="p-10">
          <div className="h-9 w-full bg-gray-200 rounded-md"></div>
          <div className="flex flex-col gap-4">
            <div className="mt-4">
              <div className="h-5 w-24 bg-gray-200 rounded-md" />
              <div className="h-5 w-28 bg-gray-200 mt-2 rounded-md" />
              <div className="h-12 w-full bg-gray-200 mt-2 rounded-md" />
            </div>
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded-md" />
              <div className="h-5 w-28 bg-gray-200 mt-2 rounded-md" />
              <div className="h-12 w-full bg-gray-200 mt-2 rounded-md" />
            </div>
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded-md" />
              <div className="h-5 w-28 bg-gray-200 mt-2 rounded-md" />
              <div className="h-12 w-full bg-gray-200 mt-2 rounded-md" />
            </div>
            <div>
              <div className="h-5 w-24 bg-gray-200 rounded-md" />
              <div className="h-5 w-28 bg-gray-200 mt-2 rounded-md" />
              <div className="h-12 w-full bg-gray-200 mt-2 rounded-md" />
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="h-10 w-24 bg-gray-200 rounded-md" />
            <div className="flex flex-col-reverse justify-center gap-4 md:flex-row md:justify-end">
              <div className="h-10 w-24 bg-gray-200 rounded-md" />
              <div className="h-10 w-24 bg-gray-200 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};

export default loading;
