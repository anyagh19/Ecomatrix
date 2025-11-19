"use client"

import { Button } from '@/components/ui/button'
import CreateProductDialog from '@/modules/outsideProcessing/components/dialogs/createProductDialog'
import OutsideProcessingTable from '@/modules/outsideProcessing/components/outsideProcessingTable'
import React, { useState } from 'react'

function page() {
  const [isCreateProductOpen, setIsCreateProductOpen] = useState(false)

  const handleCreateProduct = () => {
    setIsCreateProductOpen(true)
  }
  return (
    <>
      <div className='w-full min-h-screen flex flex-col items-center py-4 gap-5'>
        <div className='w-full flex items-center justify-between'>
          <h1 className='font-medium text-2xl'>Outside Processing Material</h1>
          <Button onClick={() => handleCreateProduct()}>Create Product</Button>
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
    </>
  )
}

export default page