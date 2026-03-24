"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select"

export interface SalesChartItem {
  date: string
  online: number
  presencial: number
}

export interface DashboardSalesChartProps {
  data: SalesChartItem[]
}

const chartConfig = {
  vendas: {
    label: "Vendas",
  },
  online: {
    label: "Online",
    color: "var(--chart-1)",
  },
  presencial: {
    label: "Presencial",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

function DashboardSalesChartInner({ data }: DashboardSalesChartProps) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = React.useMemo(() => {
    if (!data.length) return []

    const sortedData = [...data].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const lastDate = new Date(sortedData[sortedData.length - 1]?.date ?? "")

    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }

    const startDate = new Date(lastDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)

    return sortedData.filter((item) => new Date(item.date) >= startDate)
  }, [data, timeRange])

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Vendas Realizadas</CardTitle>
          <CardDescription>
            Acompanhe o volume de vendas por canal de atendimento
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Selecionar período"
          >
            <SelectValue placeholder="Últimos 3 meses" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Últimos 3 meses
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Últimos 30 dias
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Últimos 7 dias
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillOnline" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-online)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPresencial" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-presencial)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-presencial)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("pt-BR", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("pt-BR", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="presencial"
              type="natural"
              fill="url(#fillPresencial)"
              stroke="var(--color-presencial)"
              stackId="a"
            />
            <Area
              dataKey="online"
              type="natural"
              fill="url(#fillOnline)"
              stroke="var(--color-online)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Memoize the chart to prevent re-renders during sidebar animation
export const DashboardSalesChart = React.memo(DashboardSalesChartInner)
