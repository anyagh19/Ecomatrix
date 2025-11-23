"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { manufacturedProduct } from "@/models/manufacture.model";


function ManufacturingTable() {
  const [products, setProducts] = useState<manufacturedProduct[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  // ---------- Fetch First Page ----------
  const fetchProducts = async () => {
    try {
      const res = await axios.post("/api/manufactured-product/get-manufacturing-products", {
        cursor: null,
      });

      setProducts(res.data.data);
      setCursor(res.data.nextCursor);
      setHasMore(res.data.data.length >= 20); // limit = 20
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- Load Next Page ----------
  const fetchNextPage = async () => {
    if (!cursor) return;

    try {
      const res = await axios.post("/api/manufactured-product/get-manufacturing-products", {
        cursor,
      });

      setProducts((prev) => [...prev, ...res.data.data]); // append
      setCursor(res.data.nextCursor);
      setHasMore(res.data.data.length >= 20);
    } catch (error) {
      console.log(error);
    }
  };

  // ---------- Role Check ----------
  const fetchRole = async () => {
    try {
      const res = await axios.get("/api/user/current-user");
      setRole(res.data.user.role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
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
          {products.map((p, i) => (
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
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => {
                  setProducts([]);
                  fetchProducts(); // load first page again
                }}
              />
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
