"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import {
  Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { manufacturedProduct } from "@/models/manufacture.model";

function ManufacturingTable({ initialProducts, initialCursor, initialHasMore }: any) {
  const [products, setProducts] = useState(initialProducts);
  const [cursor, setCursor] = useState(initialCursor);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [role, setRole] = useState<string | null>(null);

  

  // ---------- Load Next Page ----------
  const fetchNextPage = async () => {
    if (!cursor) return;

    const res = await axios.post("/api/manufactured-product/get-manufacturing-products", {
      cursor,
    });

    setProducts((prev: manufacturedProduct[]) => [...prev, ...res.data.data]);
    setCursor(res.data.nextCursor);
    setHasMore(res.data.data.length >= 2);
  };

  // ---------- Role Check ----------
  const fetchRole = async () => {
    const res = await axios.get("/api/user/current-user");
    setRole(res.data.user.role);
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <div className="overflow-hidden rounded-md border">
      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((p: any, i: number) => (
            <TableRow key={p._id}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{p.productName}</TableCell>
              <TableCell>{p.productQuantity}</TableCell>
              <TableCell>{new Date(p.updatedAt).toLocaleDateString()}</TableCell>

              {role === "Admin" && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <BsThreeDotsVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Issue</DropdownMenuItem>
                      <DropdownMenuItem>Update</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="cursor-pointer" />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${!hasMore && "opacity-40 pointer-events-none"}`}
                onClick={fetchNextPage}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default ManufacturingTable;
