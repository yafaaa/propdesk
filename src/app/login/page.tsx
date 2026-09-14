"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { setCookie } from "cookies-next"; // need to install this
import { useRouter } from "next/navigation";
import { Building2, Home, Wrench } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const login = (role: string) => {
    // Basic mock authentication: setting a cookie
    setCookie("user-role", role, { maxAge: 60 * 60 * 24 }); // 1 day

    // Set some mock context for the backend
    setCookie("workspace-id", "demo-workspace-id", { maxAge: 60 * 60 * 24 });
    setCookie("user-id", `demo-${role.toLowerCase()}-id`, { maxAge: 60 * 60 * 24 });
    if (role === "RESIDENT") {
      setCookie("unit-id", "demo-unit-101", { maxAge: 60 * 60 * 24 });
    }

    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to PropDesk</CardTitle>
          <CardDescription>Select a role to log in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            className="w-full h-16 text-lg flex items-center justify-start gap-4 px-6"
            variant="outline"
            onClick={() => login("ADMIN")}
          >
            <div className="p-2 bg-primary/10 rounded-full text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            Admin / Manager
          </Button>

          <Button
            className="w-full h-16 text-lg flex items-center justify-start gap-4 px-6"
            variant="outline"
            onClick={() => login("RESIDENT")}
          >
            <div className="p-2 bg-blue-500/10 rounded-full text-blue-600">
              <Home className="h-6 w-6" />
            </div>
            Resident / Owner
          </Button>

          <Button
            className="w-full h-16 text-lg flex items-center justify-start gap-4 px-6"
            variant="outline"
            onClick={() => login("STAFF")}
          >
            <div className="p-2 bg-orange-500/10 rounded-full text-orange-600">
              <Wrench className="h-6 w-6" />
            </div>
            Maintenance Staff
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
