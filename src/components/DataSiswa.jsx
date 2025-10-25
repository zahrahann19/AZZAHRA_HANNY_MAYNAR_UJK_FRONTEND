import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function DataSiswa() {
  const [loading, setLoading] = useState(false);
  const [siswa, setSiswa] = useState([]);
  const [search, setSearch] = useState("");

  // Ambil data dari backend saat pertama kali load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/siswa")
      .then((resp) => {
        setSiswa(resp.data);
      })
      .catch((err) => {
        alert("Gagal memuat data: " + err);
      })
      .finally(() => setLoading(false));
  };

  // Filter pencarian berdasarkan nama siswa
  const filteredSiswa = siswa.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete siswa
  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      axios
        .delete(`http://localhost:3000/api/siswa/${id}`)
        .then(() => {
          fetchData(); // Update data setelah delete
          alert("Data siswa berhasil dihapus!");
        })
        .catch((err) => {
          alert("Gagal menghapus data: " + err);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h3>Data Siswa</h3>

      {/* Tombol untuk tambah siswa */}
      <div className="mb-3">
        <Link to="/tambah-siswa" className="btn btn-dark">
          Tambah Siswa
        </Link>
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Cari Nama Siswa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama</th>
                        <th>Alamat</th>
            <th>Tanggal Lahir</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="6">Loading...</td>
            </tr>
          ) : (
            filteredSiswa.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td>{item.alamat}</td>
                <td>{item.tgl_Siswa}</td>
                <td>{item.jurusan}</td>
                <td>
                  <Link
                    to={`/data-siswa/${item.id}`}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </Link>{" "}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="btn btn-danger btn-sm"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
