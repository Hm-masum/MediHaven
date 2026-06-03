import CreateReviewForm from "@/components/modules/Review/CreateReviewForm";

const CreateReviewPage = async ({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) => {
    const { appointmentId } = await params;
    return (
        <div>
            <CreateReviewForm appointmentId={appointmentId} />
        </div>
    );
};

export default CreateReviewPage;