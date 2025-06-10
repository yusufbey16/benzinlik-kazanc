import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function BenzinlikKazancApp() {
  const [data, setData] = useState([]);
  const [dukkan1, setDukkan1] = useState(0);
  const [dukkan2, setDukkan2] = useState(0);
  const [date, setDate] = useState("");

  const handleAddData = () => {
    if (!date) return;
    const newEntry = {
      date,
      dukkan1: Number(dukkan1) * 1000,
      dukkan2: Number(dukkan2) * 1000,
    };
    setData([...data, newEntry]);
    setDate("");
    setDukkan1(0);
    setDukkan2(0);
  };

  const toplam1 = data.reduce((acc, item) => acc + item.dukkan1, 0);
  const toplam2 = data.reduce((acc, item) => acc + item.dukkan2, 0);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center text-yellow-600">⛽ Benzinlik Kazanç Takibi</h1>

      <Card>
        <CardContent className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <Input type="number" placeholder="Dükkan 1 Kazancı" value={dukkan1} onChange={(e) => setDukkan1(e.target.value)} />
            <Input type="number" placeholder="Dükkan 2 Kazancı" value={dukkan2} onChange={(e) => setDukkan2(e.target.value)} />
            <Button onClick={handleAddData} className="bg-green-600 hover:bg-green-700 text-white">Ekle</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📊 Toplam Kazançlar</h2>
          <p className="text-green-700">Dükkan 1: ${toplam1.toLocaleString()}</p>
          <p className="text-blue-700">Dükkan 2: ${toplam2.toLocaleString()}</p>
          <p className="text-black font-semibold">Toplam: ${(toplam1 + toplam2).toLocaleString()}</p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Günlük Kazanç Listesi</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Tarih</th>
                <th className="border p-2">Dükkan 1</th>
                <th className="border p-2">Dükkan 2</th>
                <th className="border p-2">Toplam</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border p-2">{entry.date}</td>
                  <td className="border p-2 text-green-700">${entry.dukkan1.toLocaleString()}</td>
                  <td className="border p-2 text-blue-700">${entry.dukkan2.toLocaleString()}</td>
                  <td className="border p-2 font-semibold">${(entry.dukkan1 + entry.dukkan2).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="dukkan1" stroke="#16a34a" name="Dükkan 1" />
            <Line type="monotone" dataKey="dukkan2" stroke="#2563eb" name="Dükkan 2" />
          </LineChart>
        </CardContent>
      </Card>
    </div>
  );
}
