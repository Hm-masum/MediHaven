import ReviewCard from "@/components/modules/Review/ReviewCard";
import { getAllReviews } from "@/service/ReviewService";
import { IReview } from "@/types";

const ReviewPage = async () => {
  const { data: reviewData } = await getAllReviews();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {reviewData?.length ? (
        reviewData.map((review: IReview) => (
          <ReviewCard key={review.id} reviewInfo={review} />
        ))
      ) : (
        <div className="col-span-full flex justify-center py-10">
          <p className="text-purple-500">No reviews available.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;
