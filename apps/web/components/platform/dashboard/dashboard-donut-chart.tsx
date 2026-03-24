"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartStyle,
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

export interface DonutChartItem {
  status: string
  value: number
  fill: string
}

export interface DashboardDonutChartProps {
  data: DonutChartItem[]
  total: number
}

const STATUS_KEY_MAP: Record<string, string> = {
  "Em dia": "emDia",
  Pendente: "pendente",
}

const chartConfig = {
  value: { label: "Itens" },
  emDia: { label: "Em dia", color: "var(--chart-2)" },
  pendente: { label: "Pendente", color: "var(--destructive)" },
} satisfies ChartConfig

function DashboardDonutChartInner({ data, total }: DashboardDonutChartProps) {
  const id = "pie-status"

  const chartData = React.useMemo(
    () =>
      data.map((item) => {
        const key = STATUS_KEY_MAP[item.status] ?? item.status
        return { ...item, key, fill: `var(--color-${key})` }
      }),
    [data]
  )

  const [activeKey, setActiveKey] = React.useState(
    chartData[0]?.key ?? "pendente"
  )

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.key === activeKey),
    [chartData, activeKey]
  )

  const activeItem = chartData[activeIndex]

  const renderPieShape = React.useCallback(
    ({ index, outerRadius = 0, ...props }: PieSectorShapeProps) => {
      if (index === activeIndex) {
        return (
          <g>
            <Sector {...props} outerRadius={outerRadius + 10} />
            <Sector
              {...props}
              outerRadius={outerRadius + 25}
              innerRadius={outerRadius + 12}
            />
          </g>
        )
      }
      return <Sector {...props} outerRadius={outerRadius} />
    },
    [activeIndex]
  )

  const percent =
    total > 0 && activeItem ? Math.round((activeItem.value / total) * 100) : 0

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Distribuição de Status</CardTitle>
          <CardDescription>
            Proporção de itens em dia e pendentes
          </CardDescription>
        </div>
        <Select value={activeKey} onValueChange={setActiveKey}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] pl-2.5"
            aria-label="Selecionar status"
          >
            <SelectValue placeholder="Selecionar" />
          </SelectTrigger>
          <SelectContent align="end">
            {chartData.map((item) => (
              <SelectItem key={item.key} value={item.key}>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex size-3 shrink-0"
                    style={{ backgroundColor: `var(--color-${item.key})` }}
                  />
                  {chartConfig[item.key as keyof typeof chartConfig]?.label ??
                    item.status}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
              shape={renderPieShape}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {percent}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {activeItem?.status ?? ""}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

// Memoize the chart to prevent re-renders during sidebar animation
export const DashboardDonutChart = React.memo(DashboardDonutChartInner)
