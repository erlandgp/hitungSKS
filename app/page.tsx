"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, GraduationCap } from "lucide-react"
import MainPage from "./components/main-page"

export default function Component() {
  const [showMainPage, setShowMainPage] = useState(false)

  if (showMainPage) {
    return <MainPage />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="max-w-4xl w-full shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <GraduationCap className="h-12 w-12 text-blue-600" />
              <h1 className="text-4xl font-bold text-gray-800">hitungSKS</h1>
            </div>
            <div className="flex justify-center mb-6">
              <Calculator className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg text-center font-medium text-blue-700">Selamat Datang di hitungSKS</p>

            <p className="text-center">
              disini kamu bisa menghitung ips dan ipk kamu berdasarkan jumlah sks dan bobot nilai mata kuliah kamu, tools ini
              bisa membantu kamu agar tau jumlah ips dan ipk ketika di dinusvere/mhs.dinus belum terupdate
            </p>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="font-semibold text-lg mb-4 text-blue-800">Cara Penggunaan nya :</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-blue-700 mb-2">Tab Mata Kuliah:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>isi jumlah total sks kamu saat ini</li>
                    <li>isi total ipk kamu saat ini</li>
                    <li>lalu klik button tambah matkul</li>
                    <li>isi jumlah sks per mata kuliah kamu dan bobot nilai yang kamu dapat (A,AB,B,BC,C,D,E)</li>
                    <li>jika matkul ini kamu mengulang, centang opsi Ulang, lalu mengisi nilai lama kamu</li>
                    <li>klik button hitung</li>
                    <li>lalu hasil ips dan ipk kamu akan muncul di bawah</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-blue-700 mb-2">Tab Semester:</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
                    <li>pilih tab semester</li>
                    <li>isi sesuai dengan semester kamu saat ini (jika semester 4 maka isi sampai semester 4)</li>
                    <li>isi jumlah ips per semester yang kamu dapat (Semester 1 = 3.56)</li>
                    <li>lalu klik button hitung</li>
                    <li>lalu hasil ipk selama jumlah semester kamu akan muncul di bawah</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="text-center space-y-4">
              <p className="font-medium text-green-700">Semoga Membantu, Keep Learning!</p>
              <p className="text-sm text-gray-500">made by 14194</p>
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={() => setShowMainPage(true)}
                size="lg"
                className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700"
              >
                Mulai
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
