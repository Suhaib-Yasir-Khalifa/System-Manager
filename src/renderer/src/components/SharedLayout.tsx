import { cn } from '@/lib/utils'
import { JSX } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
function SharedLayout(): JSX.Element {
  return (
    <div className={cn('h-full flex gap-x-3')}>
      <SideBar />
      <div className="p-2 w-full h-full">
        <Outlet />
      </div>
    </div>
  )
}

export default SharedLayout
