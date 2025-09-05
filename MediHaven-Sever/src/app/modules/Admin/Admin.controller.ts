import { Request, Response } from "express";
import { AdminService } from "./Admin.service";
import peak from "../../../shared/peak";
import { adminFilterableFields } from "./admin.constant";

const getAllAdmin = async (req: Request, res: Response) => {
  try {
    const filters = peak(req.query, adminFilterableFields);
    const options = peak(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const result = await AdminService.getAllAdmin(filters, options);

    res.status(200).json({
      success: true,
      message: "Admin created successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
    });
  }
};

const getAdminById = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAdminById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin fetched successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
    });
  }
};

const updateAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.updateAdmin(req.params.id, req.body);

    res.status(200).json({
      success: true,
      message: "Admin Update successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
    });
  }
};

const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.deleteAdmin(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
    });
  }
};

const softDeleteAdmin = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.softDeleteAdmin(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name || "Something went wrong",
    });
  }
};

export const AdminController = {
  getAllAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  softDeleteAdmin,
};
