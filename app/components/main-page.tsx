"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap } from "lucide-react"
import MatkulTab from "./matkul-tab"
import SemesterTab from "./semester-tab"
import HelpTab from "./help-tab"

export default function MainPage() {
  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <GraduationCap className="h-10 w-10 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-800">hitungSKS</h1>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tabs defaultValue="matkul" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 h-12">
                <TabsTrigger
                  value="matkul"
                  className="text-base font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Mata Kuliah
                </TabsTrigger>
                <TabsTrigger
                  value="semester"
                  className="text-base font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Semester
                </TabsTrigger>
                <TabsTrigger
                  value="help"
                  className="text-base font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  Help
                </TabsTrigger>
              </TabsList>

              <TabsContent value="matkul" className="mt-0">
                <MatkulTab />
              </TabsContent>

              <TabsContent value="semester" className="mt-0">
                <SemesterTab />
              </TabsContent>

              <TabsContent value="help" className="mt-0">
                <HelpTab />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
