"use client"

import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface DataPoint {
  name: string;
  value: number;
}
interface UrlProps {
  params: {
    productId: string;
  }
}

type RangeType = "total" | "year" | "month" | "week";
type ChartType = "bar" | "line";

const generateData = (range: RangeType): DataPoint[] => {
  const now = new Date();
  let data: DataPoint[] = [];

  switch (range) {
    case "total":
      data = Array.from({ length: 12 }, (_, i) => ({ name: `Mes ${i + 1}`, value: Math.floor(Math.random() * 100) }));
      break;
    case "year":
      data = Array.from({ length: 12 }, (_, i) => ({ name: new Date(now.getFullYear(), i).toLocaleString("default", { month: "short" }), value: Math.floor(Math.random() * 100) }));
      break;
    case "month":
      data = Array.from({ length: 30 }, (_, i) => ({ name: `Día ${i + 1}`, value: Math.floor(Math.random() * 100) }));
      break;
    case "week":
      data = Array.from({ length: 7 }, (_, i) => ({ name: `Día ${i + 1}`, value: Math.floor(Math.random() * 100) }));
      break;
  }
  return data;
};

export default function StatsDashboard() {
  const [data, setData] = useState<DataPoint[]>(generateData("year"));
  const [range, setRange] = useState<RangeType>("year");
  const [chartType, setChartType] = useState<ChartType>("bar");

  const updateData = () => {
    setData(generateData(range));
  };

  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between border-b border-gray-400 pb-6 pt-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Estadísticas</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <div className="border rounded-lg shadow-md w-full p-4 mt-4">
          <h2 className="text-lg font-semibold mb-4">Ventas</h2>
          
          <div className="flex gap-4 mb-4">
            <select
              className="p-2 border rounded-md"
              value={range}
              onChange={(e) => {
                const value = e.target.value as RangeType;
                setRange(value);
                setData(generateData(value));
              }}
            >
              <option value="total">Histórico Total</option>
              <option value="year">Último Año</option>
              <option value="month">Último Mes</option>
              <option value="week">Última Semana</option>
            </select>
            <Button onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}> 
              Cambiar a {chartType === "bar" ? "Línea" : "Barras"}
            </Button>
          </div>

          <div className="w-full p-4 flex justify-center items-center">
            <div className="w-full max-w-lg">
              <ResponsiveContainer width="100%" height={300}>
                {chartType === "bar" ? (
                  <BarChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                ) : (
                  <LineChart data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        
          <Button className="mt-4" onClick={updateData}>Actualizar Datos</Button>
        </div>
      </div>
    </div>
  );
}
