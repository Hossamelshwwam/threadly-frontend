import { RiStarFill, RiStarLine } from "react-icons/ri";

interface StarsProps {
  rating: number;
  size?: number;
}

export function Stars({ rating, size = 16 }: StarsProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= Math.round(rating) ? (
          <RiStarFill key={star} size={size} className="text-amber-400" />
        ) : (
          <RiStarLine key={star} size={size} className="text-zinc-300" />
        ),
      )}
    </div>
  );
}
