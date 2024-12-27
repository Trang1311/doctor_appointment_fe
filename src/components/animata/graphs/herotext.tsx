import React from "react";
import { cn } from "@/lib/utils";

interface ItemProps {
  emoji: string;
  position: string;
}

interface HeroTextProps {
  text: string;
  icons: ItemProps[];
  hoverColor: string;
}

interface HeroSectionTextHoverProps {
  items: HeroTextProps[];
  className?: string;
}

const HeroSectionTextHover: React.FC<HeroSectionTextHoverProps> = ({
  items,
  className,
}) => {
  return (
    <span className={cn("relative inline-flex", className)}>
      {items.map((item, idx) => (
        <span key={idx} className="group relative inline-flex items-center">
          <span
            className={cn(
              "text-yellow transition-colors group-hover:",
              item.hoverColor
            )}
          >
            {item.text}
          </span>
          <span className="absolute inset-0 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100">
            {item.icons.map((icon, index) => (
              <span
                key={index}
                className={cn(
                  "pointer-events-none absolute transform text-lg transition-transform duration-500 group-hover:scale-110 sm:text-2xl md:text-4xl",
                  icon.position
                )}
              >
                {icon.emoji}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
};

export default HeroSectionTextHover;
