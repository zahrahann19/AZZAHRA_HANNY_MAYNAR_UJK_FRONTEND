import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// Fungsi helper dipindahkan ke luar komponen
const formatDateToInput = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 10);
};

// Daftar jurusan statis dipindahkan ke luar komponen
const JURUSAN_LIST = [
    "Teknik Informatika", "Desain Grafis", "Sistem Informasi",
    "Akuntansi", "Teknik Elektro"
];

export default function EditSiswa() {
    const navigate = useNavigate();
    const { id } = useParams();
    
    // Menggabungkan state form menjadi satu objek
    const [siswa, setSiswa] = useState({
        nama: "",
        alamat: "",
        jurusan: "",
        tgl_Siswa: "", // Sesuaikan dengan key yang Anda gunakan di backend
    });
    const [loading, setLoading] = useState(false);

    // Fungsi handler tunggal untuk semua input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSiswa(prev => ({ ...prev, [name]: value }));
    };

    // 1. Ambil data siswa
    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:3000/api/siswa/${id}`)
            .then(({ data }) => {
                // Mapping data dari response ke state form
                setSiswa({
                    nama: data.nama,
                    alamat: data.alamat,
                    jurusan: data.jurusan,
                    // Pastikan key ini sesuai dengan data dari backend
                    tgl_Siswa: formatDateToInput(data.tgl_Siswa), 
                });
            })
            .catch((err) => {
                console.error("Gagal mengambil data:", err);
                alert("Gagal mengambil data siswa!");
            })
            .finally(() => setLoading(false));
    }, [id]); // Dependency hanya perlu 'id'

    // 2. Simpan data yang sudah diubah
    const handleSimpan = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`http://localhost:3000/api/siswa/${id}`, siswa);
            alert("Data siswa berhasil diupdate!");
            navigate("/data-siswa");
        } catch (err) {
            console.error("Error mengupdate data siswa:", err);
            alert("Gagal mengupdate data siswa!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Edit Siswa</h3>
            <form onSubmit={handleSimpan}>
                
                {/* Field Nama */}
                <div className="mb-3">
                    <label className="form-label">Nama</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nama Siswa"
                        name="nama" // Tambahkan properti 'name'
                        value={siswa.nama}
                        onChange={handleChange} // Gunakan handler tunggal
                        required
                    />
                </div>

                {/* Field Tanggal Lahir */}
                <div className="mb-3">
                    <label className="form-label">Tanggal Lahir</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Tanggal Lahir"
                        name="tgl_Siswa" // Tambahkan properti 'name'
                        value={siswa.tgl_Siswa}
                        onChange={handleChange} // Gunakan handler tunggal
                        required
                    />
                </div>

                {/* Field Alamat */}
                <div className="mb-3">
                    <label className="form-label">Alamat</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Alamat"
                        name="alamat" // Tambahkan properti 'name'
                        value={siswa.alamat}
                        onChange={handleChange} // Gunakan handler tunggal
                        required
                    />
                </div>

                {/* Field Jurusan (Select) */}
                <div className="mb-3">
                    <label className="form-label">Jurusan</label>
                    <select
                        className="form-control"
                        name="jurusan" // Tambahkan properti 'name'
                        value={siswa.jurusan}
                        onChange={handleChange} // Gunakan handler tunggal
                        required
                    >
                        <option value="">Pilih Jurusan</option>
                        {JURUSAN_LIST.map((item, index) => (
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