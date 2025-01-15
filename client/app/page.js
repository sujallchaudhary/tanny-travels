"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
const page = () => {
  return (
    <div className='text-white flex flex-col'>
      Login and signup code 
      <Link href="/Homepage">
      <Button className="bg-red-500 ">
        Homepage
      </Button>
      </Link>
    </div>
  )
}

export default page
