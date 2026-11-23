import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Modal, ModalTrigger, ModalContent, ModalTitle, ModalDescription } from "@/components/ui/modal";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { appToast } from "@/components/ui/toast";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const rows = [
  { id: 1, name: "Nguyễn Văn A", status: "active" as const },
  { id: 2, name: "Trần Thị B", status: "pending" as const },
];

export function ComponentShowcasePage() {
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <Breadcrumb items={[{ label: "Dashboard", to: "/dashboard" }, { label: "Components" }]} />
        <h1 className="text-xl font-semibold text-[var(--color-text-primary)]">Component Showcase</h1>

        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
          </CardHeader>
          <CardContent className="max-w-sm space-y-4">
            <Input placeholder="Bình thường" />
            <Input placeholder="Lỗi" error />
            <Input placeholder="Disabled" disabled />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="member">Member</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Checkbox id="cb1" defaultChecked />
              <label htmlFor="cb1" className="text-sm text-[var(--color-text-primary)]">
                Đồng ý điều khoản
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="sw1" />
              <label htmlFor="sw1" className="text-sm text-[var(--color-text-primary)]">
                Nhận thông báo
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Badges, Avatar, Tooltip</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Badge variant="success">Active</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="info">Info</Badge>
            <Avatar fallback="NA" />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  Hover me
                </Button>
              </TooltipTrigger>
              <TooltipContent>Gợi ý nhỏ</TooltipContent>
            </Tooltip>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="a">
              <TabsList>
                <TabsTrigger value="a">Tab A</TabsTrigger>
                <TabsTrigger value="b">Tab B</TabsTrigger>
              </TabsList>
              <TabsContent value="a">Nội dung tab A.</TabsContent>
              <TabsContent value="b">Nội dung tab B.</TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Table</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "active" ? "success" : "warning"}>{row.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modal, Toast, Empty, Loading</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Modal>
              <ModalTrigger asChild>
                <Button variant="outline">Mở modal</Button>
              </ModalTrigger>
              <ModalContent>
                <ModalTitle>Tiêu đề modal</ModalTitle>
                <ModalDescription>Nội dung mô tả ngắn gọn.</ModalDescription>
              </ModalContent>
            </Modal>
            <Button variant="outline" onClick={() => setConfirmOpen(true)}>
              Confirm dialog
            </Button>
            <Button variant="outline" onClick={() => appToast.success("Đã lưu thành công")}>
              Toast
            </Button>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <EmptyState title="Chưa có dữ liệu" description="Thêm mục mới để bắt đầu." />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-2 pt-6">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        </div>

        <ConfirmDialog
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          title="Xác nhận xóa"
          description="Hành động này không thể hoàn tác."
          onConfirm={() => {
            setConfirmOpen(false);
            appToast.success("Đã xóa");
          }}
        />
      </div>
    </TooltipProvider>
  );
}
