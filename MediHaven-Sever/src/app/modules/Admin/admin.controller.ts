import peak from "../../../shared/peak";
import { adminFilterableFields } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import { AdminService } from "./admin.service";

const getAllAdmin = catchAsync(async (req, res) => {
  const filters = peak(req.query, adminFilterableFields);
  const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await AdminService.getAllAdmin(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getAdminById = catchAsync(async (req, res) => {
  const result = await AdminService.getAdminById(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin fetched successfully",
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.updateAdmin(req.params.id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Update successfully",
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.deleteAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

const softDeleteAdmin = catchAsync(async (req, res) => {
  const result = await AdminService.softDeleteAdmin(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
