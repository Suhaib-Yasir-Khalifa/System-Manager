import { cn } from '@/lib/utils'
import { JSX } from 'react'
import { NavLink } from 'react-router-dom'
import { Button } from './ui/button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import useSystemQuery from '@/hooks/useSystemQuery'

function SideBar(): JSX.Element {
  const { data: informationSet } = useSystemQuery()
  return (
    <div className={cn('bg-foreground h-full text-white  w-1/5 rounded-[3rem] p-2')}>
      <div className={cn('h-full w-full flex flex-col justify-between')}>
        <div className={cn('h-full w-full p-4 flex flex-col  ')}>
          <NavLink to="/" className={cn('font-bold flex text-2xl items-start')}>
            S-Manager{' '}
            <p className="bg-popover backdrop-opacity-15 text-white text-sm mx-1 flex my-auto px-1 rounded-full">
              {' '}
              beta
            </p>
          </NavLink>
          <hr className="w-3/4 flex   mx-auto my-4 opacity-50" />
          <Button className="h-[4rem] font-normal" variant={'glowing'}>
            <div className="w-8 h-8 rounded-full bg-red-700 text-white flex flex-col justify-center items-center">
              <p className="font-extrabold z-10 ">
                {informationSet?.osInformations.fqdn[0].toUpperCase()}
              </p>
            </div>
            <p className="z-10">Hover Me</p>
          </Button>
          <div className=" text-muted-foreground my-3 font-normal"> MAIN</div>
          <NavLink to="/" className="text-muted-foreground pl-5 font-normal">
            MY PC
          </NavLink>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-muted-foreground pl-2 text-md ">
                Optimal
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-y-3 pl-5 text-sm text-muted-foreground">
                <NavLink to="optimize">Optimize </NavLink>
                <NavLink to="network">Network </NavLink>
                <NavLink to="tool">Tool </NavLink>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <hr className="w-3/4 flex   mx-auto my-4 opacity-50" />
        </div>
      </div>
    </div>
  )
}

export default SideBar
