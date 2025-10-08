"use client"

import { Button } from '@/components/ui/button'
import { MdInventory } from "react-icons/md";
import React, { useState, useEffect } from 'react'
import InventoryTable from '@/modules/inventory/components/inventoryTable';
import axios from 'axios';
import CreateProductDialog from '@/modules/inventory/components/dialogs/createProductDialog';
import AddProductDialog from '@/modules/inventory/components/dialogs/addProductDialog';
function page() {
  const [role, setRole] = useState(null)
  const [isCreateProductDialogOpen, setIsCreateProductDialogOpen] = useState(false)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)

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
    <div className='flex gap-4 flex-col'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold flex items-center'>Inventory <MdInventory /></h1>
        <div className='flex gap-3'>
          {role === "Admin" ?
            <>
              {/* Create Button */}
              <Button onClick={() => setIsCreateProductDialogOpen(true)}>Create</Button>

              {/* Dialog */}
              <CreateProductDialog
                isOpen={isCreateProductDialogOpen}
                onClose={() => setIsCreateProductDialogOpen(false)}
              />
            </>
            :
            <></>}
            <Button onClick={() => setIsAddProductDialogOpen(true)}>Add</Button>
          <AddProductDialog 
          isOpen={isAddProductDialogOpen}
          onClose={() => setIsAddProductDialogOpen(false)}
          />
        </div>
      </div>
      <InventoryTable />
    </div>
  )
}

export default page
