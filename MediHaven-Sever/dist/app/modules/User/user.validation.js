"use strict";
"./../../../../node_modules/.prisma/client/index.d";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const createAdmin = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    admin: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
    }),
});
const createDoctor = zod_1.z.object({
    password: zod_1.z.string({
        required_error: "Password is required",
    }),
    doctor: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required",
        }),
        email: zod_1.z.string({
            required_error: "Email is required",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact Number is required",
        }),
        address: zod_1.z.string().optional(),
        registrationNumber: zod_1.z.string({
            required_error: "Registration Number is required",
        }),
        experience: zod_1.z.number().optional(),
        gender: zod_1.z.enum([client_1.Gender.MALE, client_1.Gender.FEMALE]),
        appointmentFee: zod_1.z.number({
            required_error: "Appointment Fee is required",
        }),
        qualification: zod_1.z.string({
            required_error: "Qualification is required",
        }),
        currentWorkingPlace: zod_1.z.string({
            required_error: "Current Working Place is required",
        }),
        designation: zod_1.z.string({
            required_error: "Designation Number is required",
        }),
    }),
});
const createPatient = zod_1.z.object({
    password: zod_1.z.string(),
    patient: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: "Email is required!",
        })
            .email(),
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        contactNumber: zod_1.z.string({
            required_error: "Contact number is required!",
        }),
        address: zod_1.z.string({
            required_error: "Address is required",
        }),
    }),
});
exports.userValidation = {
    createAdmin,
    createDoctor,
    createPatient,
};
