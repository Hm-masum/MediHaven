import { UserRole } from "@prisma/client";
import prisma from "../src/shared/prisma";
import bcrypt from "bcrypt";
import config from "../src/config";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });
    if (isExistSuperAdmin) {
      console.log("Super Admin Already exists!");
    }

    const hashedPassword = await bcrypt.hash(config.super_admin_pass as string, 12);

    const superAdminData = await prisma.user.create({
      data: {
        email: config.super_admin_email as string,
        password: hashedPassword,
        role: UserRole.SUPER_ADMIN,
        admin: {
          create: {
            name: "Super Admin",
            contactNumber: "01521484891",
          },
        },
      },
    });

    console.log("Super Admin created Successfully!", superAdminData);
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

seedSuperAdmin();
