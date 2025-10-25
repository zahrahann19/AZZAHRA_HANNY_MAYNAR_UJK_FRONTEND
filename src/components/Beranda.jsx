import { useState } from "react";

export default function Beranda() {
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div
        className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light"
        style={{
          backgroundImage: "linear-gradient(135deg, #198754 0%, #28a745 100%)",
          color: "white",
        }}
      >
        <h2 className="mb-3">Memuat Halaman...</h2>
        <div className="spinner-border text-light mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <button
          className="btn btn-outline-light px-4"
          onClick={() => setLoading(false)}
        >
          Sembunyikan
        </button>
      </div>
    );
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100 text-center bg-light"
      style={{
        backgroundImage: "url('/bg-web.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="bg-white rounded-4 shadow p-5 w-100"
        style={{ maxWidth: "600px", padding: "3rem" }}
      >
        <h1 className="text-success fw-bold mb-3">Selamat Datang!</h1>
        <p className="text-muted">
          Ini adalah halaman <strong>Beranda</strong> aplikasi Anda.  
          Silakan mulai dengan menjelajahi fitur yang tersedia.
        </p>
        <button
          className="btn btn-success mt-3 px-4"
          onClick={() => setLoading(true)}
        >
          Tampilkan Loading
        </button>
      </div>
    </div>
  );
}
