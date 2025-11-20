"use client"

import { Button } from '@/components/ui/button'
import { AddProductDialog } from '@/modules/outsideProcessing/components/dialogs/addProductDialog'
import CreateProductDialog from '@/modules/outsideProcessing/components/dialogs/createProductDialog'
import OutsideProcessingTable from '@/modules/outsideProcessing/components/outsideProcessingTable'
import React, { useState } from 'react'

function page() {
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false)
  const [isAddProductOpen , setIsAddProductOpen] = useState(false)

  const handleCreateProduct = () => {
    setIsCreateProductOpen(true)
  }
  const handleAddProduct = () =>{
    setIsAddProductOpen(true)
  }
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center py-4 gap-5'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='font-medium text-2xl'>Outside Processing Material</h1>
          <div className='flex items-center gap-5'>
            <Button onClick={() => handleCreateProduct()}>Create Product</Button>
            <Button onClick={() => handleAddProduct()}>Add Product</Button>
          </div>
        </div>
        <div className='w-full'>
          <OutsideProcessingTable />
        </div>
      </div>
     {isCreateProductOpen && (
        <CreateProductDialog 
          isOpen ={isCreateProductOpen}
          onClose={() => setIsCreateProductOpen(false)}
        />
      )}
      {
        isAddProductOpen && (
          <AddProductDialog 
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          />
        )
      }
    </>
  )
}

export default page