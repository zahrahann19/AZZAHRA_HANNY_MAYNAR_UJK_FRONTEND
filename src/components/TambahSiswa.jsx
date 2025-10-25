import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TambahSiswa() {
  const navigate = useNavigate();

  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tglLahir, setTglLahir] = useState(""); // State untuk tanggal lahir
  const [loading, setLoading] = useState(false);

  const jurusanList = [
    "Teknik Informatika",
    "Desain Grafis",
    "Sistem Informasi",
    "Akuntansi",
  ]; // Daftar jurusan statis

const handleSimpan = (e) => {
  e.preventDefault();
  setLoading(true);

  // Cek apakah tglLahir ada dan valid
  if (!tglLahir) {
    alert("Tanggal lahir tidak valid!");
    setLoading(false);
    return;
  }

  // Log tanggal lahir untuk memastikan formatnya
  console.log("Tanggal Lahir:", tglLahir); 

  axios
    .post("http://localhost:3000/api/siswa", {
      nama,
      alamat,
      tgl_Siswa: tglLahir, // Kirimkan tanggal lahir yang valid
      jurusan,
    })
    .then(() => {
      alert("Siswa berhasil ditambahkan!");
      navigate("/data-siswa");
    })
    .catch((err) => {
      console.error(err);
      alert("Gagal menambahkan siswa!");
    })
    .finally(() => setLoading(false));
};



  return (
    <div className="container mt-4">
      <h3>Tambah Siswa</h3>
      <form onSubmit={handleSimpan}>
        <div className="mb-3">
          <label className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nama Siswa"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tanggal Lahir</label>
          <input
            type="date"
            className="form-control"
            placeholder="Tanggal Lahir"
            value={tglLahir}
            onChange={(e) => setTglLahir(e.target.value)} // Menangani perubahan tanggal
            required
          />
        </div>

             <div className="mb-3">
          <label className="form-label">Alamat</label>
          <input
            type="text"
            className="form-control"
            placeholder="Alamat"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          />
        </div>

                <div className="mb-3">
          <label className="form-label">Jurusan</label>
          <select
            className="form-control"
            value={jurusan}
            onChange={(e) => setJurusan(e.target.value)}
            required
          >
            <option value="">Pilih Jurusan</option>
            {jurusanList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-dark col-12" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </button>
      </form>
    </div>
  );
}
