"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "CUSTOMER" | "ADMIN";
  usageCount: number;
  isPremium: boolean;
  premiumSince: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
      return;
    }

    checkAdminAccess();
  }, [session, status, router]);

  const checkAdminAccess = async () => {
    try {
      const response = await fetch("/api/admin/check");
      if (!response.ok) {
        router.push("/");
        return;
      }
      fetchUsers();
    } catch (error) {
      console.error("Failed to check admin access:", error);
      router.push("/");
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId: string, updates: Partial<User>) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, updates }),
      });

      if (response.ok) {
        await fetchUsers();
        setEditingUser(null);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{users.length}</div>
                  <div className="text-sm text-muted-foreground">
                    Total Users
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.isPremium).length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Premium Users
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {users.filter((u) => u.role === "ADMIN").length}
                  </div>
                  <div className="text-sm text-muted-foreground">Admins</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {users.reduce((sum, u) => sum + u.usageCount, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Usage
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Premium</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {user.image && (
                            <img
                              src={user.image}
                              alt={user.name ?? ""}
                              className="w-8 h-8 rounded-full"
                            />
                          )}
                          <span>{user.name ?? "No name"}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            user.role === "ADMIN" ? "destructive" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.isPremium ? "default" : "outline"}>
                          {user.isPremium ? "Premium" : "Free"}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.usageCount}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingUser(user)}
                            >
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Edit User: {user.name ?? user.email}
                              </DialogTitle>
                            </DialogHeader>
                            {editingUser && (
                              <EditUserForm
                                user={editingUser}
                                onSave={updateUser}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EditUserForm({
  user,
  onSave,
}: Readonly<{
  user: User;
  onSave: (userId: string, updates: Partial<User>) => void;
}>) {
  const [formData, setFormData] = useState({
    name: user.name ?? "",
    role: user.role,
    isPremium: user.isPremium,
    usageCount: user.usageCount,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(user.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>

      <div>
        <Label htmlFor="role">Role</Label>
        <Select
          value={formData.role}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              role: value as "CUSTOMER" | "ADMIN",
            }))
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CUSTOMER">Customer</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isPremium"
          checked={formData.isPremium}
          onCheckedChange={(checked) =>
            setFormData((prev) => ({ ...prev, isPremium: checked }))
          }
        />
        <Label htmlFor="isPremium">Premium Status</Label>
      </div>

      <div>
        <Label htmlFor="usageCount">Usage Count</Label>
        <Input
          id="usageCount"
          type="number"
          value={formData.usageCount}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              usageCount: parseInt(e.target.value) || 0,
            }))
          }
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}
