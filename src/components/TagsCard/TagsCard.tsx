"use client";

import clsx from "clsx";
import { gte, lt } from "lodash";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { category } from "../../constants";
import Chip from "../Chip/Chip";
import CustomCard from "../UI/CustomCard";

const TagsCard = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams();
  const sortParams = searchParams.get("sort") ?? "most upvotes";

  const renderTags = () => {
    return category.map((tag) => {
      params.set("category", tag);
      params.set("sort", sortParams);
      const isActive = searchParams?.get("category")
        ? tag === searchParams.get("category")
        : tag === "all";

      return (
        <Link href={`${pathname}?${params.toString()}`} key={tag}>
          <Chip
            key={tag}
            className={clsx({
              capitalize: gte(tag?.length, 3),
              uppercase: lt(tag?.length, 3),
            })}
            isActive={isActive}
          >
            {tag}
          </Chip>
        </Link>
      );
    });
  };

  return (
    <CustomCard className="w-[15.9375rem] max-w-[15.9375rem] !p-6 flex flex-wrap gap-2">
      {renderTags()}
    </CustomCard>
  );
};

export default TagsCard;
