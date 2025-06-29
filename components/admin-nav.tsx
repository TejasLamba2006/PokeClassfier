"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function AdminNav() {
  const { data: session } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const checkAdmin = async () => {
      try {
        const response = await fetch("/api/admin/check");
        setIsAdmin(response.ok);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, [session]);

  if (!isAdmin) return null;

  return (
    <Link href="/admin">
      <Button variant="outline" size="sm">
        Admin Dashboard
      </Button>
    </Link>
  );
}
