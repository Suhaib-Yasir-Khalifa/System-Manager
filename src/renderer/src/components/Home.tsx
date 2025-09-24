import { cn } from '@/lib/utils'
import { JSX } from 'react'
import SkeletonApp from './SkeletonApp'
import ErrNotFound from './ErrNotFound'
import useSystemQuery from '@/hooks/useSystemQuery'
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts'

{
  /**___________________________________________ */
}

import CircleChartData from './CircleChartData'
import { ArrowRight, Battery, BatteryCharging, Cable, HardDrive } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { ChartLineDefault } from './LineChart'

function Home(): JSX.Element {
  const {
    data: informationSet,

    isLoading,
    isError,
    error
  } = useSystemQuery()
  console.log(isLoading, informationSet)
  if (isLoading) {
    return <SkeletonApp />
  }
  if (isError) {
    return <ErrNotFound err={error.message} />
  }

  function getActiveNetwork() {
    // Find the first network that is up and not internal
    const active = informationSet?.network.find((n) => n.operstate === 'up' && !n.internal)

    if (!active)
      // if no ineternt connectino
      return {
        name: '--',
        iface: '--',
        type: 'Not Connected',
        ip: '--',
        mac: '--',
        speed: '00'
      }

    return {
      name: active.ifaceName,
      iface: active.iface,
      type: active.type === 'wireless' ? 'Wi-Fi' : 'Wired',
      ip: active.ip4 || active.ip6,
      mac: active.mac,
      speed: active.speed ? `${active.speed} ` : 'Unknown'
    }
  }

  const chartData = informationSet?.fsSize.map((item) => {
    return {
      category: item.fs.slice('')[0],
      size: item.size / 1024 ** 3
    }
  })

  const colorPalette = ['#ef4444', 'var(--popover)', '#f97316', '#eab308', 'purple', 'blue']

  function createChartConfig(data: typeof chartData) {
    const config: Record<string, { label: string; color: string }> = {}
    data.forEach((item, index) => {
      config[item.category] = {
        label: item.category,
        color: colorPalette[index % colorPalette.length]
      }
    })
    return config
  }

  const chartConfig = createChartConfig(chartData)

  return (
    <div className={cn('bg-accent flex flex-col gap-y-3 p-2 h-full w-full rounded-2xl ')}>
      <div className={cn('h-1/8 flex flex-row justify-between')}>
        <div className=" w-1/2 h-full p-1">{/**In Case of adding something */}</div>
        <div className="bg-yellow-600 w-1/2 h-full p-1">
          {/**Adding Logined Email or direction to Login page */}
        </div>
      </div>
      <div className={cn('bg-background p-1 gap-x-2 h-1/2 flex flex-row w-full rounded-2xl')}>
        <div
          className={cn(
            ' hellow-background h-full w-1/3 flex flex-col justify-between rounded-2xl font-bold p-4 text-white'
          )}
        >
          <div>
            <div className="text-muted-foreground">Welcome</div>
            <div className="text-5xl">{informationSet?.osInformations.fqdn}</div>
          </div>
          <div className="flex flex-col gap-y-2 text-sm font-bold">
            {/*  ----------------------------------------------------------------------------- Cpu Tem*/}
            <div className="font-bold">
              Tempreture <br />
              <div className="flex flex-row items-baseline gap-x-3 text-muted-foreground">
                <div
                  className={cn(
                    informationSet?.cpuTemp.main < 25 ? 'bg-green-600' : 'bg-red-600',
                    'rounded-full h-2 w-2 '
                  )}
                />{' '}
                {informationSet?.cpuTemp.main < 25 ? 'Optimal' : 'Heat!'}
              </div>
            </div>
            {/*  ----------------------------------------------------------------------------- RAM Usage*/}
            <div>
              RAM <br />
              <div className="flex flex-row items-baseline gap-x-3 text-muted-foreground">
                <div
                  className={cn(
                    informationSet?.ram.used / informationSet?.ram.total < 0.7
                      ? 'bg-green-600'
                      : 'bg-red-600',
                    'rounded-full h-2 w-2 '
                  )}
                />{' '}
                {informationSet?.ram.used / informationSet?.ram.total < 0.7
                  ? 'Optimal'
                  : 'OverUsed'}
              </div>
            </div>
            {/*  ----------------------------------------------------------------------------- Battery Usage*/}
            <div>
              Battery <br />
              <div className="flex flex-row items-baseline gap-x-3 text-muted-foreground">
                <div
                  className={cn(
                    informationSet?.batteryUsage.percent > 20 ? 'bg-green-600' : 'bg-red-600',
                    'rounded-full h-2 w-2 '
                  )}
                />{' '}
                {informationSet?.batteryUsage.percent > 20 ? 'Good' : 'Low'}
              </div>
            </div>
            {/*  ----------------------------------------------------------------------------- RAM Usage*/}
            <div>
              Internet <br />
              <div className="flex flex-row items-baseline gap-x-3 text-muted-foreground">
                <div
                  className={cn(
                    getActiveNetwork().speed !== '00' ? 'bg-green-600' : 'bg-red-600',
                    'rounded-full h-2 w-2 '
                  )}
                />{' '}
                {getActiveNetwork().speed !== '00' ? 'Connected' : 'no connection'}
              </div>
            </div>
          </div>
        </div>
        <div className={cn(' h-full w-1/3 rounded-2xl p-1 flex flex-col gap-y-2')}>
          <div className="bg-gradient-to-b from-foreground ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-full h-1/2 rounded-xl p-2 flex flex-row justify-between">
            {/**--------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="font-bold  text-3xl">
              <div>Device</div>
              <div className="font-bold text-muted-foreground  text-sm">
                Brand: {informationSet?.bios.vendor} <br />
                Relase Date: {informationSet?.bios.releaseDate} <br />
                OS: {informationSet?.osInformations.distro} {informationSet?.osInformations.arch}{' '}
                bit
                <br />
              </div>
            </div>
          </div>

          <div className=" w-full h-1/2 rounded-xl">
            <div className="bg-gradient-to-b  from-foreground   ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-full h-full rounded-xl  flex flex-row justify-between">
              {/**--------------------------------------------------------------------------------------------------------------------------------- */}
              <div className="font-bold w-2/ text-muted-foreground text-xl p-2">
                Internet
                <div className="font-bold text-white text-xl">{getActiveNetwork()?.type}</div>
                <div>
                  <div>
                    <div className="flex flex-row items-baseline gap-x-3 text-sm text-muted-foreground">
                      <div
                        className={cn(
                          getActiveNetwork().speed !== '00' ? 'bg-green-600' : 'bg-red-600',
                          'rounded-full h-2 w-2 '
                        )}
                      />{' '}
                      {getActiveNetwork().speed !== '00' ? 'Connected' : 'notConnected'}
                    </div>
                  </div>
                </div>
                <div className="font-bold text-muted-foreground text-sm">
                  {getActiveNetwork()?.name}
                </div>
                <div className="font-bold text-white text-sm">IP: {getActiveNetwork().ip}</div>
              </div>
              <CircleChartData
                data={(getActiveNetwork().speed / 100).toFixed(1)}
                nameLable="Mbps"
                angleCoinfig={getActiveNetwork().speed / 5}
              />

              <NavLink
                to="network"
                className="w-max p-1 bg-background rounded-r-xl hover:bg-accent-foreground group h-full  flex flex-col items-center justify-center"
              >
                <ArrowRight className="text-muted-foreground  group-hover:translate-x-1 group-hover:scale-105 transition-all duration-100" />
              </NavLink>
            </div>
          </div>
        </div>
        <div className={cn('  h-full w-1/3 flex p-1 flex-row gap-x-3 rounded-2xl')}>
          <div
            className="bg-gradient-to-b from-foreground ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-1/2 h-full rounded-xl flex flex-col justify-between items-center p-2
            "
          >
            <div className="font-bold  text-3xl">
              <div className="text-center ">RAM</div>
              <div className="font-bold text-muted-foreground  text-sm">
                Occupied: {(informationSet?.ram.active / 1000000000).toFixed(0)}GB/{' '}
                {(informationSet?.ram.total / 1000000000).toFixed(0)}GB
              </div>
            </div>
            <div className="w-[100%]">
              <CircleChartData
                data={`${((informationSet?.ram.used / informationSet?.ram.total) * 100).toFixed(0)}%`}
                angleCoinfig={(informationSet?.ram.used / informationSet?.ram.total) * 100}
                nameLable="Used"
              />
            </div>
          </div>
          {/**--------------------------------------------------------------------------------------------------------------------------------- */}
          <div className="bg-gradient-to-b from-foreground ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-1/2 h-full rounded-xl p-2 flex flex-col justify-between items-center">
            <div className="font-bold  text-3xl">
              <div className="text-center">Graphics</div>
              <div className="font-bold text-left text-muted-foreground flex flex-col gap-y-2 text-sm">
                <div> Controllers: {informationSet?.graphic.controllers[0].model}</div>
                <div> Display Cards: {informationSet?.graphic.displays.length}</div>
                {informationSet?.graphic.displays.map((displayCard, idx) => {
                  return (
                    <div key={idx}>
                      <div> Model: {displayCard.model}</div>
                      <div> Connection: {displayCard.connection}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={cn(' flex flex-row p-1 gap-x-3 h-1/2 w-full rounded-2xl')}>
        <div className={cn(' h-full w-1/3 rounded-2xl')}>
          <div className=" w-full h-full rounded-xl">
            <div className="bg-gradient-to-b from-foreground  ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-full h-full rounded-xl  flex flex-row justify-between">
              {/**--------------------------------------------------------------------------------------------------------------------------------- */}
              <div className="font-bold w-full text-muted-foreground text-xl p-2">
                Power
                <div className="font-bold text-white text-3xl">
                  {informationSet?.batteryUsage.hasBattery ? (
                    'Battery'
                  ) : (
                    <div>
                      {' '}
                      Cable
                      <Cable className="w-[4rem] h-max text-yellow-600" />
                    </div>
                  )}
                </div>
                <div className="w-full h-full ">
                  <div className="w-full h-max flex flex-row gap-x-2 items-center">
                    {informationSet?.batteryUsage.isCharging ? (
                      <BatteryCharging className={cn('w-[8rem] h-max  text-green-400')} />
                    ) : (
                      <Battery className={cn('w-[8rem] h-max  text-white')} />
                    )}
                    <div className="text-[2rem] text-white ">
                      {informationSet?.batteryUsage.percent}%
                    </div>
                  </div>
                  <div className="w-full flex flex-row text-sm">
                    Maximum Capacity: {informationSet?.batteryUsage.maxCapacity}
                    {informationSet?.batteryUsage.capacityUnit}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('bg-black h-full w-1/3 rounded-2xl')}>
          <div className=" w-full h-full rounded-xl">
            <div className="bg-gradient-to-b w from-foreground p-2  ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-full h-full rounded-xl  flex flex-row justify-between">
              <div className="font-bold text-xl  gap-x-1 ">
                <div className="flex gap-x-2 mb-3">
                  {' '}
                  Disk Usage <HardDrive className="w-8 h-max" />
                </div>
                <div className="text-sm grid grid-cols-2">
                  {informationSet?.fsSize.map((item, idx) => {
                    return (
                      <div key={idx}>
                        <div className="font-bold ">Partition {item.fs}</div>
                        <div className="font-normal">
                          Total: {(item.size / 1024 ** 3).toFixed(0)} GB
                        </div>
                        <div className="font-normal">
                          used: {(item.used / 1024 ** 3).toFixed(0)} GB
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="mx-auto justify-center w-1/2 items-center flex flex-col max-w-sm">
                <PieChart width={170} height={170}>
                  <Tooltip formatter={(value: number) => `${value.toFixed(0)}GB`} />

                  <Legend />

                  {/* Main Pie */}

                  <Pie
                    data={chartData}
                    dataKey="size"
                    nameKey="category"
                    outerRadius={50}
                    stroke="white"
                  >
                    {chartData.map((entry) => (
                      <Cell key={entry.category} fill={chartConfig[entry.category].color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('bg-slate-700 h-full w-1/3 rounded-2xl')}>
          <div className="bg-gradient-to-b from-foreground ring-3 ring-muted-foreground via:slate-900 text-white  to-slate-800 w-full h-full rounded-xl p-2 flex flex-col ">
            {/**--------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="h-1/3 w-full justify-between flex flex-row">
              <div className="font-bold  h-min  text-3xl">
                <div>Processor</div>
                <div className="font-bold text-muted-foreground text-sm">
                  CPU: {informationSet?.cpu.brand}
                </div>
              </div>

              <CircleChartData
                data={`${informationSet?.cpuTemp.main.toFixed(0)}°`}
                angleCoinfig={informationSet?.cpuTemp.main}
                nameLable="Celcuis"
              />
            </div>
            <div
              className=" h-1/2 
            "
            >
              <ChartLineDefault />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home
