"use client"

import * as React from "react"
import { AlertCircleIcon, CircleCheckIcon } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from "@workspace/ui/components/empty"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@workspace/ui/components/chart"

export interface BarChartItem {
  module: string
  value: number
  fill: string
}

export interface DashboardBarChartProps {
  data: BarChartItem[]
}

const chartConfig = {
  value: {
    label: "Pendências",
  },
} satisfies ChartConfig

function formatPendingCount(value: number) {
  return `${value} pendência${value === 1 ? "" : "s"}`
}

function DashboardBarChartInner({ data }: DashboardBarChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const topModule = data[0]
  const hasData = data.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pendências por Módulo</CardTitle>
        <CardDescription>
          Quantidade de itens pendentes por módulo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart
              accessibilityLayer
              data={data}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <YAxis
                dataKey="module"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                width={100}
              />
              <XAxis dataKey="value" type="number" hide />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar dataKey="value" radius={5} />
            </BarChart>
          </ChartContainer>
        ) : (
          <Empty className="min-h-[300px] px-0">
            <EmptyIcon>
              <CircleCheckIcon />
            </EmptyIcon>
            <EmptyContent>
              <EmptyTitle>Nenhuma pendência por módulo</EmptyTitle>
              <EmptyDescription>
                Todos os módulos visíveis estão em dia no momento.
              </EmptyDescription>
            </EmptyContent>
          </Empty>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData ? (
          <>
            <div className="flex gap-2 leading-none font-medium">
              {topModule?.module} lidera com{" "}
              {formatPendingCount(topModule?.value ?? 0)}
              <AlertCircleIcon className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              {formatPendingCount(total)} distribuídas em {data.length} módulo
              {data.length === 1 ? "" : "s"}
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 leading-none font-medium">
              Nenhuma pendência nos módulos visíveis
              <CircleCheckIcon className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              O gráfico volta a exibir dados quando houver novos itens
              pendentes.
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

// Memoize the chart to prevent re-renders during sidebar animation
export const DashboardBarChart = React.memo(DashboardBarChartInner)
