"use client"

import React, { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";

interface DataPoint {
  name: string;
  value: number;
}

interface StatisticsProps {
  id_user: string;
  statisticsId: string;
  searchParams: Record<string, any>;
  userProduct: any;
  ordersProduct: any;
}

type RangeType = "total" | "year" | "month" | "week";
type ChartType = "bar" | "line";

const processOrderData = (ordersProduct: any[], range: RangeType): DataPoint[] => {
  if (!Array.isArray(ordersProduct) || ordersProduct.length === 0) {
    console.warn("ordersProduct está vacío o no es un array válido", ordersProduct);
    return [];
  }
  
  console.log("Processing ordersProduct: ", ordersProduct);
  const now = new Date();
  let dataMap: Record<string, number> = {};

  ordersProduct.forEach(order => {
    if (!order || !order._isPaid || !order.createdAt) return;
    const date = new Date(order.createdAt);
    let key = "";

    switch (range) {
      case "total":
        key = date.toISOString().split("T")[0]; // Agrupar por día
        break;
      case "year":
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        break;
      case "month":
        key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        break;
      case "week":
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = `${weekStart.getFullYear()}-${(weekStart.getMonth() + 1).toString().padStart(2, "0")}-${weekStart.getDate().toString().padStart(2, "0")}`;
        break;
    }

    dataMap[key] = (dataMap[key] || 0) + 1;
  });

  console.log("DataMap result:", dataMap);
  return Object.entries(dataMap)
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
};

export default function Statistics({ id_user, statisticsId, searchParams, userProduct, ordersProduct }: StatisticsProps) {
  console.log("searchParams", searchParams);
  console.log("id_user", id_user);
  console.log("statisticsId", statisticsId);
  console.log("userProduct", userProduct);
  console.log("ordersProduct", ordersProduct);

  const [range, setRange] = useState<RangeType>("year");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [data, setData] = useState<DataPoint[]>([]);

  const totalSales = Array.isArray(ordersProduct) ? ordersProduct.filter(order => order && order._isPaid).length : 0;

  useEffect(() => {
    if (Array.isArray(ordersProduct) && ordersProduct.length > 0) {
      const processedData = processOrderData(ordersProduct, range);
      console.log("Processed data:", processedData);
      setData(processedData);
    } else {
      console.warn("No orders available to process");
    }
  }, [range, ordersProduct]);

  const productName = userProduct[0]?.name || "Producto";

  return (
    <div className="p-4">
      <div className="flex items-baseline justify-between border-b border-gray-400 pb-6 pt-2">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Estadísticas</h1>
      </div>

      <div className="text-center text-xl font-semibold mt-4">Ventas Totales: {totalSales}</div>
      
      <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
        <div className="border rounded-lg shadow-md w-full p-4 mt-4">
          <h2 className="text-lg font-semibold mb-4">Ventas de {productName}</h2>

          <div className="flex gap-4 mb-4">
            <select
              className="p-2 border rounded-md"
              value={range}
              onChange={(e) => setRange(e.target.value as RangeType)}
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
              {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  {chartType === "bar" ? (
                    <BarChart data={data}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#30adb6" />
                    </BarChart>
                  ) : (
                    <LineChart data={data}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="value" stroke="#30adb6" />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <p className="text-center text-gray-500">No hay datos de ventas disponibles</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
