"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  ChartContainer,
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
    label: "Itens ativos",
  },
} satisfies ChartConfig

export function DashboardBarChart({ data }: DashboardBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ranking por Módulo</CardTitle>
        <CardDescription>Quantidade de itens ativos por módulo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={data}
            layout="vertical"
            margin={{
              left: 0,
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="module"
              type="category"
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <XAxis dataKey="value" type="number" hide />
            <Bar dataKey="value" radius={4} fill="hsl(var(--primary))" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
