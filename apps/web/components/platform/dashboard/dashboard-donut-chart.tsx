"use client"

import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

export interface DonutChartItem {
  status: string
  value: number
  fill: string
}

export interface DashboardDonutChartProps {
  data: DonutChartItem[]
  total: number
}

const chartConfig = {
  emDia: { label: "Em dia", color: "hsl(var(--chart-2))" },
  pendente: { label: "Pendente", color: "hsl(var(--destructive))" },
} satisfies ChartConfig

export function DashboardDonutChart({ data, total }: DashboardDonutChartProps) {
  const pendingItem = data.find((item) => item.status === "Pendente")
  const pendingCount = pendingItem?.value ?? 0
  const pendingPercent =
    total > 0 ? Math.round((pendingCount / total) * 100) : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Status</CardTitle>
        <CardDescription>Proporção de itens em dia e pendentes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto h-[300px]">
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name, item) => (
                    <div className="flex min-w-[120px] items-center justify-between gap-2">
                      <span className="text-muted-foreground">
                        {item.payload.status}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-medium">
                          {typeof value === "number"
                            ? value.toLocaleString()
                            : String(value)}
                        </span>
                        <span className="text-muted-foreground">
                          (
                          {total > 0
                            ? Math.round((Number(value) / total) * 100)
                            : 0}
                          %)
                        </span>
                      </div>
                    </div>
                  )}
                />
              }
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
        <div className="mt-4 flex flex-col items-center gap-1 text-center">
          <span className="text-4xl font-bold tabular-nums">
            {pendingPercent}%
          </span>
          <span className="text-sm text-muted-foreground">Pendentes</span>
        </div>
      </CardContent>
    </Card>
  )
}
