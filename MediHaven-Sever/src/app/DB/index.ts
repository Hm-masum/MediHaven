import { UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../../shared/prisma";
import config from "../../config";

const seedSuperAdmin = async () => {
  try {
    const isExistSuperAdmin = await prisma.user.findFirst({
      where: {
        role: UserRole.SUPER_ADMIN,
      },
    });

    if (!isExistSuperAdmin) {
      const hashedPassword = await bcrypt.hash(
        config.super_admin_pass as string,
        12
      );

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
    }
  } catch (err) {
    console.log(err);
  } finally {
    await prisma.$disconnect();
  }
};

export default seedSuperAdmin;
