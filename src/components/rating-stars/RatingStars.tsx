"use client";

import { BiSolidStar, BiStar } from "react-icons/bi";
import { FC, cloneElement, useState } from "react";

interface RatingProps {
  className?: string;
  count: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  edit?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

const RatingStars: FC<RatingProps> = ({
  className,
  count,
  value,
  color = "#ffd700",
  hoverColor = "#ffc107",
  activeColor = "#ffc107",
  size = 36,
  edit = false,
  onChange,
  emptyIcon = <BiStar />,
  fullIcon = <BiSolidStar />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseMove = (index: number) => {
    if (!edit) {
      return;
    }
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!edit) {
      return;
    }
    setHoverValue(undefined);
  };

  const handleClick = (index: number) => {
    if (!edit) {
      return;
    }
    if (onChange) {
      onChange(index + 1);
    }
  };

  const stars = [];

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement;
    if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        star = fullIcon;
      }
    }

    stars.push(
      <div
        key={i}
        style={{ cursor: "pointer" }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {cloneElement(star, {
          size: size,
          color:
            i <= Number(hoverValue)
              ? hoverColor
              : i < value
              ? activeColor
              : color,
        })}
      </div>
    );
  }

  return <div className={`rating ${className}`}>{stars}</div>;
};

export default RatingStars;
