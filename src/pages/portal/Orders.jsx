import React from 'react'
import { Sidebar } from '../../components/Sidebar'
import { HeadingBox } from '../../components/HeadingBox'
import { PortalTable } from '../../components/PortalTable'

export const Orders = () => {
  return (
    <div className='flex gap-2'>
        <Sidebar pageName={"Orders"}/>
        <div className='w-[84%]'>
         <HeadingBox pageName={"Orders"}/>
         <p className='text-sm font-bold text-black mt-4'>Total Orders : 0</p>
         <PortalTable />
        </div>
    </div>
  )
}
