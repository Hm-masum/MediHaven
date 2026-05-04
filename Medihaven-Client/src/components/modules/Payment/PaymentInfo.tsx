"use client";

import { TLTable } from "@/components/ui/core/TLTable";
import { IPayment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const PaymentsInfo = ({
  paymentsData,
}: {
  paymentsData: IPayment[]
}) => {

  const columns: ColumnDef<IPayment>[] = [
    {
      accessorKey: "id",
      header: "Transaction ID",
      cell: ({ row }) => <span>{row.original.transactionId}</span>,
    },
    {
      accessorKey: "doctorName",
      header: "Doctor Name",
      cell: ({ row }) => <span>{row.original.appointment?.doctor?.name}</span>,
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
      cell: ({ row }) => <span>{row.original.appointment?.patient?.name}</span>,
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => <span>{row.original?.amount}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <span>{row.original?.status}</span>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => <span>{new Date(row.original?.createdAt).toLocaleDateString()}</span>,
    }
  ];
              

  return (
    <div>
      <TLTable columns={columns} data={paymentsData || []} />
    
    </div>
  );
};

export default PaymentsInfo;
