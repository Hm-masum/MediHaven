export type IAppointmentStatus =
  | "SCHEDULED"
  | "ONPROGRESS"
  | "COMPLETED"
  | "CANCELED";

export type IPaymentStatus = "PAID" | "UNPAID";

export type IBloodGroup =
  | "A_POSITIVE"
  | "A_NEGATIVE"
  | "B_POSITIVE"
  | "B_NEGATIVE"
  | "AB_POSITIVE"
  | "AB_NEGATIVE"
  | "O_POSITIVE"
  | "O_NEGATIVE";

export type IMaritalStatus =
  | "MARRIED"
  | "UNMARRIED"
  | "DIVORCED"
  | "WIDOWED";

export type IGender = "MALE" | "FEMALE";

export type IUserStatus = "ACTIVE" | "BLOCKED" | "DELETED";