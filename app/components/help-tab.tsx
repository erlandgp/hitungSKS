export default function HelpTab() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="font-semibold text-lg mb-4 text-blue-800">Cara Penggunaan:</h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-blue-700 mb-2">Tab Matkul:</h3>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li>isi jumlah total sks kamu saat ini</li>
              <li>isi total ipk kamu saat ini</li>
              <li>lalu klik button tambah matkul</li>
              <li>isi jumlah sks matkul kamu dan bobot nilai yang kamu dapat (A,AB,B,BC,C,D,E)</li>
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

      <div className="bg-green-50 p-6 rounded-lg">
        <h2 className="font-semibold text-lg mb-4 text-green-800">Informasi Tambahan:</h2>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Bobot Nilai:</strong>
          </p>
          <ul className="list-disc list-inside ml-4">
            <li>A = 4.0</li>
            <li>AB = 3.5</li>
            <li>B = 3.0</li>
            <li>BC = 2.5</li>
            <li>C = 2.0</li>
            <li>D = 1.0</li>
            <li>E = 0.0</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h2 className="font-semibold text-lg mb-4 text-yellow-800">Butuh Bantuan?</h2>
        <p className="text-sm">Jika kamu mengalami kesulitan atau memiliki pertanyaan, silakan hubungi:</p>
        <p className="font-medium text-blue-600 mt-2">Email: 111202214194@mhs.dinus.ac.id</p>
      </div>

      <div className="text-center space-y-2">
        <p className="font-medium text-green-700">Semoga Membantu, Keep Learning!</p>
        <p className="text-sm text-gray-500">made by 14194</p>
      </div>
    </div>
  )
}
