import React, { useEffect, useState } from 'react'
import { IJob } from '@/models/job.model'
import axios from 'axios'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { BsThreeDotsVertical } from 'react-icons/bs'

function JobTable() {
  const [jobs , setJobs] = useState<IJob[]>([])
  const [role, setRole] = useState(null)


  useEffect(() => {
    const fetchJobs = async () => {
      const res = await axios.get('/api/job/get-jobs')
      console.log('rr',res.data.data)
      setJobs(res.data.data)
    }
    fetchJobs()
  },[])

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
                        <TableHead>JobCode</TableHead>
                        <TableHead>ClientName</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {jobs.map((p, i) => (
                        <TableRow key={p._id.toString()}>
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{p.jobCode}</TableCell>
                            <TableCell>{p.clientName}</TableCell>
                            <TableCell>{p.siteAddress}</TableCell>
                            <TableCell>{p.status}</TableCell>
                            {role === "Admin" ?
                                <>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>

                                                <BsThreeDotsVertical />

                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                
                                                
                                                <DropdownMenuItem className="font-semibold" >Update</DropdownMenuItem>
                                                <DropdownMenuItem className="font-semibold">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </> : <></>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
  )
}

export default JobTable
