type IOptions = {
  page?: number;
  limit?: number;
  sortOrder?: string;
  sortBy?: string;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortOrder: string;
  sortBy: string;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortOrder = options.sortOrder || "desc";
  const sortBy = options.sortBy || "createdAt";

  return {
    page,
    limit,
    skip,
    sortOrder,
    sortBy,
  };
};

export const paginationHelper = {
  calculatePagination,
};
