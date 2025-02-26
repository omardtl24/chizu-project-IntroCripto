"use client"

import React, { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useSpring, animated } from '@react-spring/web';
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
  if (!Array.isArray(ordersProduct) || ordersProduct.length === 0) return [];

  const dataMap: Record<string, number> = {};
  ordersProduct.forEach(order => {
    if (!order || !order._isPaid || !order.createdAt) return;
    const date = new Date(order.createdAt);
    let key = date.toISOString().split("T")[0];
    dataMap[key] = (dataMap[key] || 0) + 1;
  });

  return Object.entries(dataMap)
    .map(([key, value]) => ({ name: key, value }))
    .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
};

export default function Statistics({ id_user, statisticsId, searchParams, userProduct, ordersProduct }: StatisticsProps) {
  const [range, setRange] = useState<RangeType>("year");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [data, setData] = useState<DataPoint[]>([]);
  const [gamePopularity, setGamePopularity] = useState<number | null>(null);
  const totalSales = Array.isArray(ordersProduct) ? ordersProduct.length : 0;
  const productName = userProduct[0]?.name || "Producto";

  const roundToNearestHundred = (value: number) => {
    if (value < 50) return 100;
    return Math.ceil(value / 100) * 100 + 100;
  };
  const { value } = useSpring({
    from: { value: roundToNearestHundred(gamePopularity ?? 0)},
    value: gamePopularity,
    delay: 400,
    config: { tension: 70, friction: 25 } // Tension = que ran rapido baja, Friction = que tan rapido se detiene
  });
  useEffect(() => {
    setData(processOrderData(ordersProduct, range));
  }, [range, ordersProduct]);

  useEffect(() => {
    const fetchPopularity = async () => {
      try {
        const url = new URL("/api/popularity-game", window.location.origin);
        url.searchParams.append("id_game", statisticsId);
        const response = await fetch(url.toString());
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log("Popularity data:", data);
        setGamePopularity(data.productPosition);
      } catch (error) {
        console.error("Error fetching popularity data:", error);
      }
    };
    fetchPopularity();
  }, [statisticsId]);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-gray-900 border-b pb-6">Estadísticas</h1>
      <div className="flex flex-col md:flex-row gap-4 mt-6">
        {/* Ventas Totales */}
        <div className="flex-1 border rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Ventas de {productName} </h2>
          <p className="text-xl font-semibold text-center">Ventas Totales: {totalSales}</p>
          <div className="flex gap-4 my-4">
            <select className="p-2 border rounded-md" value={range} onChange={(e) => setRange(e.target.value as RangeType)}>
              <option value="total">Histórico Total</option>
              <option value="year">Último Año</option>
              <option value="month">Último Mes</option>
              <option value="week">Última Semana</option>
            </select>
            <Button onClick={() => setChartType(chartType === "bar" ? "line" : "bar")}>
              Cambiar a {chartType === "bar" ? "Línea" : "Barras"}
            </Button>
          </div>
          <div className="w-full p-4 flex justify-center">
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
                <div className="flex items-center justify-center h-[300px] w-full">
                  <p className="text-gray-500 text-center">No hay datos de ventas disponibles</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Popularidad */}
        <div className="flex-1 border rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold">Popularidad del Producto</h2>
          {gamePopularity !== null ? (
            <div className="flex flex-col items-center justify-center -mt-4 h-full">
              <p className="text-xl">Ranking:</p>
              <p className="text-8xl font-bold">#<animated.span>{value.to(n => n.toFixed(0))}</animated.span></p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 text-center">Cargando...</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
