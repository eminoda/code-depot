import React from "react";

export interface TitleProps {
  name: string;
  subName?: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Title = ({ name = "标题", subName, ...props }: TitleProps) => {
  return (
    <>
      <h2>{name}</h2>
      {subName ? <div>{subName}</div> : ""}
    </>
  );
};
