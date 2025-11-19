"use client"

import {
    Table, TableHeader, TableRow, TableHead, TableBody, TableCell
} from "@/components/ui/table";
// import { getInventoryProduct } from "../actions/getInventoryProductList";
// import { Button } from "@/components/ui/button";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { storeProduct } from "@/models/store.model";
import { DropdownMenuTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import UpdateProductDialog from "./dialogs/updateProductDialog";
import ProductHistoryDialog from "./dialogs/productHistoryDialog";
import IssueProductDialog from "./dialogs/issueProductDialog";

function InventoryTable() {
    const [products, setProducts] = useState<storeProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<storeProduct[]>([]);
    const [role, setRole] = useState(null)
    const [selectedProduct, setSelectedProduct] = useState<storeProduct | null>(null);
    const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false)
    const [isProductHistoryDialogOpen , setIsProductHistoryDialogOpen] = useState(false)
    const [isIssueProductDialogOpen , setIsIssueProductDialogOpen] = useState(false)

    // console.log("role", role)

    // ✅ useCallback prevents recreation of fetch function unnecessarily
    const fetchProducts = useCallback(async () => {
        try {
            const res = await axios.get("/api/inventory/get-all-products");
            const allProducts = res.data.data || [];
            // console.log('a',allProducts)
            setProducts(allProducts);
            setFilteredProducts(allProducts.filter((p: storeProduct) => p.itemQuantity > 0));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);
    // console.log('f',filteredProducts)

    useEffect(() => {
        fetchProducts(); // run initially
    }, [fetchProducts]);

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get("/api/user/current-user")
                // console.log(res.data.user.role); // logs the role
                setRole(res.data.user.role);
            } catch (error) {
                console.log(error)
            }
        }
        fetchRole()
    }, [])

    const handleUpdateClick = (product: storeProduct) => {
        setSelectedProduct(product);
        setIsUpdateProductOpen(true);
    };

    const handleHistoryClick = (product: storeProduct) => {
        setSelectedProduct(product);
        setIsProductHistoryDialogOpen(true);
    };

    const handleIssueClick = (product: storeProduct) => {
        setSelectedProduct(product);
        setIsIssueProductDialogOpen(true);
    };


    return (
        <div className="overflow-hidden rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sr No</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Rate</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredProducts.map((p, i) => (
                        <TableRow key={p._id.toString()}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{p.itemName}</TableCell>
                            <TableCell>{p.itemQuantity}</TableCell>
                            <TableCell>{p.itemRate}</TableCell>
                            <TableCell>{p.itemQuantity * p.itemRate}</TableCell>
                            {role === "Admin" ?
                                <>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>

                                                <BsThreeDotsVertical />

                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="font-semibold" onClick={() => handleIssueClick(p)}>Issue</DropdownMenuItem>
                                                <DropdownMenuItem className="font-semibold" onClick={() => handleHistoryClick(p)}>History</DropdownMenuItem>
                                                <DropdownMenuItem className="font-semibold" onClick={() => handleUpdateClick(p)}>Update</DropdownMenuItem>
                                                <DropdownMenuItem className="font-semibold">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </> : <></>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* ✅ Dialog moved outside the map */}
            <UpdateProductDialog
                isOpen={isUpdateProductOpen}
                onClose={() => setIsUpdateProductOpen(false)}
                product={selectedProduct}
                onUpdated={fetchProducts}
            />
            <ProductHistoryDialog
                isOpen={isProductHistoryDialogOpen}
                onClose={() => setIsProductHistoryDialogOpen(false)}
                product={selectedProduct}
            />
            <IssueProductDialog
                isOpen={isIssueProductDialogOpen}
                onClose={() => setIsIssueProductDialogOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
}

export default InventoryTable