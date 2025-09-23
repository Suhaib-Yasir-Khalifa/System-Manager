import { JSX } from 'react'
import { NavLink } from 'react-router-dom'

function ErrNotFound({ err }: { err: any }): JSX.Element {
  return (
    <div className="w-full text-white h-full flex justify-center gap-y-4 items-center flex-col">
      <div className=" font-extrabold underline text-7xl">Error 404.</div>
      Page Not Found <br />
      <NavLink to="/" className="hover:underline text-normal">
        Back To Home
      </NavLink>
      <div>{err}</div>
    </div>
  )
}

export default ErrNotFound
