import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { ChartConfig, ChartContainer } from '@/components/ui/chart'

function CircleChartData({
  widthProps,
  angleCoinfig,
  data,
  nameLable
}: {
  angleCoinfig?: any
  data?: number | string | undefined
  nameLable?: string
  widthProps?: string
}) {
  const chartData = [{ browser: 'safari', visitors: 200, fill: 'var(--color-popover)' }]
  const chartConfig = {
    visitors: {
      label: 'Visitors'
    },
    safari: {
      label: 'Safari',
      color: 'var(--chart-2)'
    }
  } satisfies ChartConfig
  return (
    <ChartContainer
      config={chartConfig}
      className={`flex flex-row  aspect-square max-h-[220px] ${widthProps}`}
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={angleCoinfig * 3.6}
        innerRadius={50}
        outerRadius={40}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="last:fill-transparent text-white"
        />
        <RadialBar dataKey="visitors" cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                  >
                    <tspan x={viewBox.cx} y={viewBox.cy} className=" bg-white text-white text-2xl">
                      {data}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} fill=" white">
                      {nameLable}
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}
export default CircleChartData
