"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useI18n } from "@/i18n/context";
import { doLogin } from "./actions";

export default function LoginPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleAction = async (formData: FormData) => {
    setError("");

    startTransition(async () => {
      try {
        const res = await doLogin(formData);
        if(res.success) {
           router.push("/");
        } else {
           setError(res.error || "Failed to login");
        }
      } catch (err: any) {
        setError("Failed to login");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{t('welcome')}</CardTitle>
          <CardDescription>Enter your email and password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                defaultValue="password"
                required
              />
            </div>

            {error && <p className="text-sm text-destructive font-medium">{error}</p>}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-sm text-muted-foreground">
             <p className="font-medium mb-2">Demo Accounts (Password: password):</p>
             <ul className="space-y-1 list-disc pl-5">
               <li>admin@example.com (Admin)</li>
               <li>resident@example.com (Resident)</li>
               <li>staff@example.com (Maintenance)</li>
             </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
