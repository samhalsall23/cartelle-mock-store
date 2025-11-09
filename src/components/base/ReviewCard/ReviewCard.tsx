import Image from "next/image";

import { StarIcon } from "@/components/icons";

type ReviewCardProps = {
  rating: number;
  reviewText: string;
  reviewerName: string;
  reviewerTitle: string;
  reviewerImageUrl: string;
};

export function ReviewCard(props: ReviewCardProps) {
  // === PROPS ===
  const { rating, reviewText, reviewerName, reviewerTitle, reviewerImageUrl } =
    props;

  return (
    <div className="bg-white flex flex-col p-8 w-[280px] h-[420px] md:h-80 md:w-[400px] rounded-sm gap-6">
      <div className="flex gap-x-2">
        {Array.from({ length: rating }, (_, i) => (
          <span key={i}>
            <StarIcon />
          </span>
        ))}
      </div>
      <h5 className="text-neutral-10 text-lg xl:text-xl font-normal!">
        {reviewText}
      </h5>
      <div className="mt-auto flex items-center gap-x-4">
        <div className="relative w-12 h-12">
          <Image
            src={reviewerImageUrl}
            alt={reviewerName}
            fill
            className="object-cover rounded-full"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-base">{reviewerName}</p>
          <p className="text-sm text-neutral-10">{reviewerTitle}</p>
        </div>
      </div>
    </div>
  );
}
