"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { outsideProcessingProduct } from '@/models/outsideProcessing.model'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

function OutsideProcessingTable() {
  const [products , setProducts] = useState<outsideProcessingProduct[]>([])
  const [role, setRole] = useState(null)

  useEffect(() => {
    const fetchOutsideProduct = async () => {
     try {
       const response = await axios.get('/api/outside-processing/get-all-products')
      if(!response){
        console.log("no response")
      }
      setProducts(response.data.data)
     } catch (error) {
      console.log(error)
     }
    }
    fetchOutsideProduct()
  }, [])
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
                    {products.map((p , i) => (
                      <TableRow key={p._id.toString()}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{p.itemName}</TableCell>
                            <TableCell>{p.quantity}</TableCell>
                            <TableCell>{new Date(p.createdAt).toLocaleDateString()}</TableCell>
                            
                            {role === "Admin" ?
                                <>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>

                                                <BsThreeDotsVertical />

                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem className="font-semibold" >Issue</DropdownMenuItem>
                                                <DropdownMenuItem className="font-semibold" >History</DropdownMenuItem>
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
            {/* ✅ Dialog moved outside the map */}
           
            
        </div>
  )
}

export default OutsideProcessingTable