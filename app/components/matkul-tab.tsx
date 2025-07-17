"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface Matkul {
  id: number
  sks: string
  nilai: string
  isUlang: boolean
  nilaiLama: string
}

export default function MatkulTab() {
  const [totalSKS, setTotalSKS] = useState("")
  const [currentIPK, setCurrentIPK] = useState("")
  const [matkuls, setMatkuls] = useState<Matkul[]>([])
  const [result, setResult] = useState<{ ips: number; ipk: number } | null>(null)

  const addMatkul = () => {
    if (matkuls.length >= 12) return

    const totalCurrentSKS = matkuls.reduce((sum, m) => sum + (Number.parseInt(m.sks) || 0), 0)
    if (totalCurrentSKS >= 24) return

    const newMatkul: Matkul = {
      id: Date.now(),
      sks: "",
      nilai: "",
      isUlang: false,
      nilaiLama: "",
    }
    setMatkuls([...matkuls, newMatkul])
  }

  const removeMatkul = (id: number) => {
    setMatkuls(matkuls.filter((m) => m.id !== id))
  }

  const updateMatkul = (id: number, field: keyof Matkul, value: string | boolean) => {
    setMatkuls(matkuls.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  const canAddMatkul = () => {
    if (matkuls.length >= 12) return false

    const totalCurrentSKS = matkuls.reduce((sum, m) => sum + (Number.parseInt(m.sks) || 0), 0)
    if (totalCurrentSKS >= 24) return false

    // Check if all existing matkuls are filled correctly
    const allFilled = matkuls.every((m) => m.sks && m.nilai && (!m.isUlang || m.nilaiLama))

    return matkuls.length === 0 || allFilled
  }

  const calculateMatkulIPS = (totalSKS: string, currentIPK: string, matkuls: Matkul[]) => {
    const sksToBobot: { [key: string]: number } = {
      A: 4.0,
      AB: 3.5,
      B: 3.0,
      BC: 2.5,
      C: 2.0,
      D: 1.0,
      E: 0.0,
    };

    let totalSksSemester = 0;
    let totalBobotSemester = 0;

    matkuls.forEach((matkul) => {
      const sks = Number.parseInt(matkul.sks);
      const nilai = matkul.nilai;
      const nilaiLama = matkul.nilaiLama;
      const isUlang = matkul.isUlang;

      if (sks && nilai) {
        totalSksSemester += sks;
        totalBobotSemester += sks * sksToBobot[nilai];

        if (isUlang && nilaiLama) {
          // If it's a retake, subtract the old SKS * old bobot from the total
          // This assumes the old SKS was already counted in the totalSKS and currentIPK
          // For simplicity, we'll just consider the new grade for IPS calculation
          // and adjust IPK based on the difference.
        }
      }
    });

    const ips = totalSksSemester > 0 ? totalBobotSemester / totalSksSemester : 0;

    const prevTotalSKS = Number.parseInt(totalSKS);
    const prevCurrentIPK = Number.parseFloat(currentIPK);

    let newTotalSKS = prevTotalSKS + totalSksSemester;
    let newTotalBobot = (prevTotalSKS * prevCurrentIPK) + totalBobotSemester;

    matkuls.forEach((matkul) => {
      if (matkul.isUlang && matkul.nilaiLama) {
        const sks = Number.parseInt(matkul.sks);
        const oldBobot = sksToBobot[matkul.nilaiLama];
        const newBobot = sksToBobot[matkul.nilai];

        // Adjust total bobot for retaken courses: subtract old grade's contribution, add new grade's contribution
        newTotalBobot = newTotalBobot - (sks * oldBobot) + (sks * newBobot);
      }
    });

    const ipk = newTotalSKS > 0 ? newTotalBobot / newTotalSKS : 0;

    return { ips, ipk };
  };

  const calculateIPS = () => {
    const result = calculateMatkulIPS(totalSKS, currentIPK, matkuls);
    setResult(result);
  };

  const canCalculate = () => {
    return (
      totalSKS &&
      currentIPK &&
      matkuls.length > 0 &&
      matkuls.every((m) => m.sks && m.nilai && (!m.isUlang || m.nilaiLama))
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Akademik Saat Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total-sks">Jumlah Total SKS Saat Ini</Label>
              <Input
                id="total-sks"
                type="number"
                value={totalSKS}
                onChange={(e) => setTotalSKS(e.target.value)}
                placeholder="Contoh: 120"
              />
            </div>
            <div>
              <Label htmlFor="current-ipk">IPK Saat Ini</Label>
              <Input
                id="current-ipk"
                type="number"
                step="0.01"
                value={currentIPK}
                onChange={(e) => setCurrentIPK(e.target.value)}
                placeholder="Contoh: 3.50"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mata Kuliah Semester Ini</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {matkuls.map((matkul, index) => (
            <Card key={matkul.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">Mata Kuliah {index + 1}</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeMatkul(matkul.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Jumlah SKS</Label>
                    <Input
                      type="number"
                      min="1"
                      max="6"
                      value={matkul.sks}
                      onChange={(e) => updateMatkul(matkul.id, "sks", e.target.value)}
                      placeholder="Contoh: 3"
                    />
                  </div>
                  <div>
                    <Label>Bobot Nilai</Label>
                    <Select value={matkul.nilai} onValueChange={(value) => updateMatkul(matkul.id, "nilai", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih nilai" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">A</SelectItem>
                        <SelectItem value="AB">AB</SelectItem>
                        <SelectItem value="B">B</SelectItem>
                        <SelectItem value="BC">BC</SelectItem>
                        <SelectItem value="C">C</SelectItem>
                        <SelectItem value="D">D</SelectItem>
                        <SelectItem value="E">E</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={`ulang-${matkul.id}`}
                      checked={matkul.isUlang}
                      onCheckedChange={(checked) => updateMatkul(matkul.id, "isUlang", checked as boolean)}
                    />
                    <Label htmlFor={`ulang-${matkul.id}`}>Mata kuliah ulang</Label>
                  </div>

                  {matkul.isUlang && (
                    <div>
                      <Label>Nilai Lama</Label>
                      <Select
                        value={matkul.nilaiLama}
                        onValueChange={(value) => updateMatkul(matkul.id, "nilaiLama", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih nilai lama" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="AB">AB</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="BC">BC</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          <Button onClick={addMatkul} disabled={!canAddMatkul()} className="w-full bg-transparent" variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Tambah Matkul
          </Button>
        </CardContent>
      </Card>

      <Button onClick={calculateIPS} disabled={!canCalculate()} className="w-full py-3 text-lg" size="lg">
        Hitung IPS & IPK
      </Button>

      {result && (
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">Hasil Perhitungan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">IPS Semester Ini</p>
                <p className="text-2xl font-bold text-blue-600">{result.ips.toFixed(2)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm text-gray-600">IPK Keseluruhan</p>
                <p className="text-2xl font-bold text-green-600">{result.ipk.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
