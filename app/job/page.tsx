"use client"

import { Button } from '@/components/ui/button'
import CreateJobDialog from '@/modules/job/components/dialogs/createJobDialog'
import JobTable from '@/modules/job/components/jobTable'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Page() {
    const[role , setRole] = useState(null)
    const [isCreateJobDialogOpen , setIsCreateJobDialogOpen] = useState(false)

    useEffect(()=> {
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
    },[])
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-semibold flex items-center'>Jobs</h1>
        <div className='flex gap-3'>
          {role === "Admin" ?
            <>
              {/* Create Button */}
              <Button onClick={() => setIsCreateJobDialogOpen(true)}>Create</Button>

              {/* Dialog */}
              <CreateJobDialog
                isOpen={isCreateJobDialogOpen}
                onClose={() => setIsCreateJobDialogOpen(false)}
              />
            </>
            :
            <></>}
        </div>
      </div>
      <JobTable />
    </div>
  )
}

export default Page
