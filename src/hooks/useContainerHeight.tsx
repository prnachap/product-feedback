import React, { useState, useEffect } from "react";

export const useContainerHeight = ({
  childRef,
}: {
  childRef: React.RefObject<HTMLElement>;
}) => {
  const [heightDiffBetweenParentAndChild, setHeightDiffBetweenParentAndChild] =
    useState(0);

  useEffect(() => {
    if (!childRef.current) return;
    const childHeight = (childRef.current?.clientHeight as number) ?? 0;
    const handleWindowResize = () => {
      setHeightDiffBetweenParentAndChild(childHeight);
    };
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!childRef.current) return;
    const childHeight = (childRef.current?.clientHeight as number) ?? 0;
    setHeightDiffBetweenParentAndChild(childHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return { heightDiffBetweenParentAndChild };
};
