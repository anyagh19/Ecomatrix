"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { FinalProduct } from '@/models/finalProduct.model'
import { outsideProcessingProduct } from '@/models/outsideProcessing.model'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

function OutsideProcessingTable() {
    const [products, setProducts] = useState<outsideProcessingProduct[]>([])
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [role, setRole] = useState(null)
    
    const fetchOutsideProduct = async () => {
        try {
            const response = await axios.post('/api/outside-processing/get-all-products', { cursor: null })
            if (!response) {
                console.log("no response")
            }

            setProducts(response.data.data)
            setCursor(response.data.NextCursor)
            setHasMore(response.data.data.length >= 2)
           

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOutsideProduct()
    }, [])
    const fetchNextOutsideProduct = async () => {
        if (!cursor) return
        try {

            const response = await axios.post('/api/outside-processing/get-all-products', { cursor })
            if (!response) {
                console.log("no response")
            }

            setProducts((prev) => [...prev, ...response.data.data])
            setCursor(response.data.NextCursor)
            setHasMore(response.data.data.length >= 2)
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchRole = async () => {
            try {
                const res = await axios.get("/api/user/current-user")
                console.log(res.data.user.role); // logs the role
                setRole(res.data.user.role);
            } catch (error) {
                console.log(error)
            }
        }
        fetchRole()
    }, [])

    return (
        <div className="overflow-hidden rounded-md border">
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
                        <TableRow key={p._id.toString()}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{p.itemName}</TableCell>
                            <TableCell>{p.quantity}</TableCell>
                            <TableCell>{new Date(p.updatedAt).toLocaleDateString()}</TableCell>

                            {role === "Admin" ?
                                <>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>

                                                <BsThreeDotsVertical />

                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="font-semibold"  >Issue</DropdownMenuItem>

                                                <DropdownMenuItem className="font-semibold">Update</DropdownMenuItem>
                                                <DropdownMenuItem className="font-semibold">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </> : <></>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="py-4">
                <Pagination>
                    <PaginationContent>

                        <PaginationItem>
                            <PaginationPrevious
                                className="cursor-pointer"
                                onClick={() => {
                                    setProducts([]);
                                    fetchOutsideProduct(); // load first page again
                                }}
                            />
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext
                                className={`cursor-pointer ${!hasMore && "opacity-40 pointer-events-none"}`}
                                onClick={fetchNextOutsideProduct}
                            />
                        </PaginationItem>

                    </PaginationContent>
                </Pagination>
            </div>


        </div>
    )
}

export default OutsideProcessingTable