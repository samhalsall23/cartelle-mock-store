"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import {
  AdminBaseTable,
  AdminButton,
  AdminDropdownMenu,
  AdminDropdownMenuTrigger,
  AdminDropdownMenuContent,
  AdminDropdownMenuItem,
  AdminDropdownMenuSeparator,
  AdminTooltip,
  AdminTooltipTrigger,
  AdminAlertDialog,
  AdminAlertDialogContent,
  AdminAlertDialogTitle,
  AdminAlertDialogDescription,
  AdminAlertDialogCancel,
  AdminAlertDialogAction,
  AdminAlertDialogHeader,
  AdminAlertDialogFooter,
  AdminToaster,
  AdminInput,
  AdminDropdownMenuLabel,
  AdminDropdownMenuCheckboxItem,
  buttonVariants,
} from "@/components/admin";
import { adminRoutes, cn, screamingSnakeToTitle } from "@/lib";
import { BlogPost } from "@prisma/client";
import { blogColumns, defaultVisibleBlogColumnIds } from "./columns";
import { deleteBlogById } from "@/lib/server/blogs";

export function AdminBlogsTable({ authors }: { authors: BlogPost[] }) {
  // === STATE ===
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [columnsVisible, setColumnsVisible] = useState<Set<string>>(
    defaultVisibleBlogColumnIds,
  );
  const [blogsState, setBlogsState] = useState(authors);
  const [searchTerm, setSearchTerm] = useState("");

  // === FUNCTIONS ===
  const deleteAuthor = async (id: string) => {
    const deleted = await deleteBlogById(id);

    if (!deleted.success) {
      console.error("Error deleting blog:", deleted.error);
      toast.error("Failed to delete blog. Please try again.");
      return;
    }

    setPendingDeleteId(null);
    setBlogsState((prev) => prev.filter((blog) => blog.id !== id));
    toast.success("Blog deleted successfully.");
  };

  const formatBlogs = (blogs: BlogPost[]) => {
    return blogs.map((blog) => ({
      ...blog,
      category: screamingSnakeToTitle(blog.category),
      publishedAt: blog.publishedAt
        ? new Date(blog.publishedAt).toISOString().split("T")[0]
        : null,
      createdAt: blog.createdAt
        ? new Date(blog.createdAt).toISOString().split("T")[0]
        : null,
      updatedAt: blog.updatedAt
        ? new Date(blog.updatedAt).toISOString().split("T")[0]
        : null,
    }));
  };

  // === MEMO ===
  const filteredBlogs = formatBlogs(
    blogsState.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminInput
          type="text"
          placeholder="Search for blogs"
          className="my-3 max-w-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Link
          href={adminRoutes.blogsCreate}
          className={cn(
            "ms-auto me-3",
            buttonVariants({ variant: "default", size: "default" }),
          )}
        >
          Add Blog
        </Link>
        <div className="flex justify-end">
          {/* === COLUMN TOGGLER === */}
          <AdminDropdownMenu>
            <AdminDropdownMenuTrigger asChild>
              <AdminButton variant="outline">Columns</AdminButton>
            </AdminDropdownMenuTrigger>
            <AdminDropdownMenuContent>
              <AdminDropdownMenuLabel>Show/Hide Columns</AdminDropdownMenuLabel>
              {blogColumns.map((column) => (
                <AdminDropdownMenuCheckboxItem
                  key={column.accessorKey}
                  checked={columnsVisible.has(column.accessorKey)}
                  onCheckedChange={(checked) =>
                    setColumnsVisible((prev) => {
                      const newSet = new Set(prev);
                      if (checked) {
                        newSet.add(column.accessorKey);
                      } else {
                        newSet.delete(column.accessorKey);
                      }
                      return newSet;
                    })
                  }
                >
                  {column.header}
                </AdminDropdownMenuCheckboxItem>
              ))}
            </AdminDropdownMenuContent>
          </AdminDropdownMenu>
        </div>
      </div>
      <AdminBaseTable
        data={filteredBlogs}
        columns={[
          ...blogColumns.filter((column) =>
            columnsVisible.has(column.accessorKey),
          ),
          {
            id: "actions",
            enableHiding: false,
            cell: (cell) => {
              const blog = cell.row.original;

              return (
                <AdminDropdownMenu>
                  <AdminDropdownMenuTrigger asChild>
                    <AdminButton variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal />
                    </AdminButton>
                  </AdminDropdownMenuTrigger>

                  <AdminDropdownMenuContent align="end">
                    <Link href={`${adminRoutes.blogs}/${blog.id}`}>
                      <AdminDropdownMenuItem>Edit</AdminDropdownMenuItem>
                    </Link>
                    <AdminDropdownMenuSeparator />

                    <AdminDropdownMenuItem
                      variant="destructive"
                      onSelect={() => {
                        setPendingDeleteId(blog.id);
                      }}
                    >
                      <AdminTooltip>
                        <AdminTooltipTrigger asChild>
                          <span className="w-full flex items-center">
                            Delete
                          </span>
                        </AdminTooltipTrigger>
                      </AdminTooltip>
                    </AdminDropdownMenuItem>
                  </AdminDropdownMenuContent>
                </AdminDropdownMenu>
              );
            },
          },
        ]}
      />

      {/* === TOASTER === */}
      <AdminToaster position="top-right" />

      {/* === DELETE CONFIRMATION MODAL === */}
      <AdminAlertDialog
        open={!!pendingDeleteId}
        onOpenChange={() => setPendingDeleteId(null)}
      >
        <AdminAlertDialogContent>
          <AdminAlertDialogHeader>
            <AdminAlertDialogTitle>
              Are you sure you want to delete this blog?
            </AdminAlertDialogTitle>
            <AdminAlertDialogDescription>
              This action cannot be undone.
            </AdminAlertDialogDescription>
          </AdminAlertDialogHeader>

          <AdminAlertDialogFooter>
            <AdminAlertDialogCancel disabled={!!deletingId}>
              Cancel
            </AdminAlertDialogCancel>

            <AdminAlertDialogAction
              disabled={!!deletingId}
              onClick={() => {
                setDeletingId(pendingDeleteId);
                if (pendingDeleteId) {
                  deleteAuthor(pendingDeleteId);
                }
              }}
            >
              {deletingId ? "Deleting..." : "Delete"}
            </AdminAlertDialogAction>
          </AdminAlertDialogFooter>
        </AdminAlertDialogContent>
      </AdminAlertDialog>
    </>
  );
}
