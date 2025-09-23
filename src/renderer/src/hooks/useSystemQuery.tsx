import { useQuery } from '@tanstack/react-query'

function useSystemQuery() {
  return useQuery({
    queryKey: ['systemInfo'],
    queryFn: async () => {
      console.log('Requesting...')

      return await window.api.doingSome()
    },
    refetchInterval: 10
  })
}

export default useSystemQuery
