import { Routes, Route } from "react-router-dom";
import Beranda from "./Beranda";
import DataSiswa from "./DataSiswa";
import EditSiswa from "./EditSiswa";
import TambahSiswa from "./TambahSiswa";

function AppRoutes() {
  return (
    <div className="container mt-4">
      <div className="card">
        <Routes>
          <Route path="/" element={<Beranda />} />
          <Route path="/data-siswa" element={<DataSiswa />} />
          <Route path="/data-siswa/:id" element={<EditSiswa />} />
          <Route path="/tambah-siswa" element={<TambahSiswa />} />
        </Routes>
      </div>
    </div>
  );
}
export default AppRoutes;
