"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const calculatePagination = (options) => {
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
exports.paginationHelper = {
    calculatePagination,
};
