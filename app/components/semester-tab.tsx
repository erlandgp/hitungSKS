"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SemesterTab() {
  const [semesterIPS, setSemesterIPS] = useState<string[]>(Array(8).fill(""))
  const [result, setResult] = useState<number | null>(null)

  const updateSemesterIPS = (index: number, value: string) => {
    const newIPS = [...semesterIPS]
    newIPS[index] = value
    setSemesterIPS(newIPS)
  }

  const calculateIPK = () => {
    const filledSemesters = semesterIPS.filter((ips) => ips && Number.parseFloat(ips) >= 0 && Number.parseFloat(ips) <= 4)

    if (filledSemesters.length === 0) {
      setResult(0)
      return
    }

    const totalIPS = filledSemesters.reduce((sum, ips) => sum + Number.parseFloat(ips), 0)
    const ipk = totalIPS / filledSemesters.length
    setResult(ipk)
  }

  const canCalculate = () => {
    return semesterIPS.some((ips) => ips && Number.parseFloat(ips) > 0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Input IPS Per Semester</CardTitle>
          <p className="text-sm text-gray-600">Masukkan nilai IPS untuk setiap semester yang telah Anda selesaikan</p>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold text-gray-700 w-32">Semester</TableHead>
                  <TableHead className="font-semibold text-gray-700">IPS (Indeks Prestasi Semester)</TableHead>
                  <TableHead className="font-semibold text-gray-700 w-24 text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 8 }, (_, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">Semester {index + 1}</TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="4"
                        value={semesterIPS[index]}
                        onChange={(e) => updateSemesterIPS(index, e.target.value)}
                        placeholder="0.00 - 4.00"
                        className="max-w-xs"
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      {semesterIPS[index] && Number.parseFloat(semesterIPS[index]) > 0 ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Terisi
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                          Kosong
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Petunjuk Pengisian:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Isi IPS untuk semester yang sudah selesai</li>
              <li>• Rentang nilai IPS: 0.00 - 4.00</li>
              <li>• Semester yang belum selesai dapat dikosongkan</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {result !== null && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              Hasil Perhitungan IPK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600 mb-2">IPK Keseluruhan</p>
                <p className="text-5xl font-bold text-blue-600 mb-2">{result.toFixed(2)}</p>
                <div className="flex justify-center">
                  <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {result >= 3.5
                      ? "Cum Laude"
                      : result >= 3.0
                        ? "Sangat Memuaskan"
                        : result >= 2.5
                          ? "Memuaskan"
                          : "Cukup"}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div>
                    <p className="text-gray-600">Semester Terisi</p>
                    <p className="font-semibold text-gray-800">
                      {semesterIPS.filter((ips) => ips && Number.parseFloat(ips) > 0).length} dari 8
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Rata-rata IPS</p>
                    <p className="font-semibold text-gray-800">{result.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button onClick={calculateIPK} disabled={!canCalculate()} className="w-full py-3 text-lg font-semibold" size="lg">
        Hitung IPK Keseluruhan
      </Button>
    </div>
  )
}
