import CreatePrescriptionForm from "@/components/modules/Prescription/CreatePrescriptionForm";

const CreatePrescriptionPage = async({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) => {
    const { appointmentId } = await params;

    return (
        <div>
            <CreatePrescriptionForm appointmentId={appointmentId}/>
        </div>
    );
};

export default CreatePrescriptionPage;