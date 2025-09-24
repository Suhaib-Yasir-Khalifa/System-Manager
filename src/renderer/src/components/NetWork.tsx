import useSystemQuery from '@/hooks/useSystemQuery'

function NetWork() {
  const { data: InfoSet } = useSystemQuery()
  return <div>NetWork</div>
}
export default NetWork
