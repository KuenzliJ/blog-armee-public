import { getUserFromPrisma } from '@/actions/actions';
import UpdateUserForm from '@/app/components/forms/UpdateUserForm'
import React from 'react'

const page = async () => {
  const user:any = await getUserFromPrisma();
  return (
    <div>
      <UpdateUserForm user={user}/>
    </div>
  )
}

export default page