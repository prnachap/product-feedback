import HomePageContainer from "@/components/Containers/HomePageContainer";

const Home = async ({
  searchParams,
}: {
  searchParams: { category: string; sort: string };
}) => {
  const sortBy = searchParams?.sort ?? "most upvotes";
  const filterCategory = searchParams?.category ?? "all";

  return (
    <main>
      <HomePageContainer category={filterCategory} sortBy={sortBy} />
    </main>
  );
};

export default Home;
