import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'

const SkeletonApp = () => {
  return (
    <div className={cn(' flex flex-col gap-y-3 p-2 h-full w-full rounded-2xl ')}>
      <div className={cn('h-1/8')}>
        <Skeleton className={cn('w-1/2 h-full')} />
      </div>
      <div className={cn(' p-1 gap-x-1 h-1/2 flex flex-row w-full rounded-2xl')}>
        <Skeleton className={cn(' h-full w-1/3 rounded-2xl')}></Skeleton>
        <Skeleton className={cn(' h-full w-1/3 rounded-2xl')}></Skeleton>
        <Skeleton className={cn(' h-full w-1/3 rounded-2xl')}></Skeleton>
      </div>
      <div className={cn(' flex flex-row p-1 gap-x-1 h-1/2 w-full rounded-2xl')}>
        <Skeleton className={cn(' h-full w-1/3 rounded-2xl')}></Skeleton>
        <Skeleton className={cn(' h-full w-1/3 rounded-2xl')}></Skeleton>
        <Skeleton className={cn(' h-full w-1/3 rounded-2xl')}></Skeleton>
      </div>
    </div>
  )
}

export default SkeletonApp
