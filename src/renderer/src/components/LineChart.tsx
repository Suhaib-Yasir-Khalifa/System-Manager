import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
import useSystemQuery from '@/hooks/useSystemQuery'

export const description = 'A line chart'

export function ChartLineDefault() {
  const { data: infoSet } = useSystemQuery()

  const chartData =
    infoSet?.currentLoad.cpus.map((item, index) => ({
      name: `Core${index + 1}`,
      load: item.load,
      loadUser: item.loadUser,
      loadSystem: item.loadSystem
    })) ?? []
  const chartConfig = {
    load: {
      label: 'Total Load',
      color: 'var(--chart-1)'
    },
    loadUser: {
      label: 'User Load',
      color: 'var(--chart-2)'
    },
    loadSystem: {
      label: 'System Load',
      color: 'var(--chart-3)'
    },
    loadIdle: {
      label: 'Idle',
      color: 'var(--chart-4)'
    }
  } satisfies ChartConfig
  return (
    <ChartContainer config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          right: 12
        }}
      >
        <CartesianGrid vertical={true} horizontal={true} />
        <XAxis dataKey={'name'} tickLine={true} axisLine={false} tickMargin={8} tickCount={30} />
        <YAxis tickLine={true} axisLine={false} tickMargin={8} tickCount={30} />
        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />

        <Line dataKey="load" stroke="var(--color-load)" strokeWidth={5} dot={false} />
        <Line dataKey="loadUser" stroke="var(--color-loadUser)" strokeWidth={5} dot={false} />
        <Line dataKey="loadSystem" stroke="var(--color-loadSystem)" strokeWidth={5} dot={false} />
        <Line dataKey="loadIdle" stroke="var(--color-loadIdle)" strokeWidth={5} dot={false} />
      </LineChart>
    </ChartContainer>
  )
}
