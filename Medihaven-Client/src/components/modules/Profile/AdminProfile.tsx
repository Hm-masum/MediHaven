"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, ShieldCheck, CalendarDays } from "lucide-react";
import { IAdminProfile } from "@/types/admin";

export default function AdminProfile({ admin }: { admin: IAdminProfile }) {
  return (
    <div className="mx-auto py-2">
      <Card className="overflow-hidden border shadow-sm">
        <div className="h-36 bg-linear-to-r from-purple-500 to-pink-500" />

        <CardContent className="relative px-6 pb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end -mt-12 ">
            <div className="relative h-32 w-32 overflow-hidden rounded-2xl border-4 border-white bg-white shadow">
              <Image
                src={admin.profilePhoto || "/default-profile.png"}
                alt={admin.name}
                fill
                className="object-cover"
              />
            </div>

            {/* User Info */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl md:text-3xl font-bold">{admin.name}</h1>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                  {admin.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span className="font-medium">{admin.role}</span>
              </div>

              <p className="text-sm text-muted-foreground">
                Admin ID: {admin.id}
              </p>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>

                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Email Address
                      </p>
                      <p className="font-medium">{admin.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Contact Number
                      </p>
                      <p className="font-medium">{admin.contactNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Account Created
                      </p>
                      <p className="font-medium">
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Last Updated
                      </p>
                      <p className="font-medium">
                        {new Date(admin.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Account Status
                    </span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      {admin.status}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">{admin.role}</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Deleted</span>
                    <Badge
                      variant={admin.isDeleted ? "destructive" : "outline"}
                    >
                      {admin.isDeleted ? "Yes" : "No"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
