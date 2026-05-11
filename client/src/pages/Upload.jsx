import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";
import { Button } from "../components/Button.jsx";

export function Upload() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [audio, setAudio] = useState(null);
  const [cover, setCover] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (!audio) {
      setError("Selecciona un archivo de audio");
      return;
    }
    const fd = new FormData();
    fd.append("title", title);
    if (genre) fd.append("genre", genre);
    fd.append("audio", audio);
    if (cover) fd.append("cover", cover);
    setLoading(true);
    try {
      await api("/api/tracks", { method: "POST", body: fd });
      navigate("/feed");
    } catch (err) {
      setError(err.message || "Error al subir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold">Subir canción</h1>
      <p className="mt-2 text-sm text-ink-muted">MP3, WAV, OGG, WebM o M4A. Máx. 30 MB.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-ink-muted">Título</label>
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-ink-muted">Género</label>
          <input
            className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            placeholder="Ej. Indie"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-ink-muted">Audio</label>
          <input
            type="file"
            accept="audio/*,.mp3,.wav,.ogg,.webm,.m4a"
            className="mt-1 w-full text-sm text-ink-muted file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-ink"
            onChange={(e) => setAudio(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-ink-muted">Portada (opcional)</label>
          <input
            type="file"
            accept="image/*"
            className="mt-1 w-full text-sm text-ink-muted file:mr-4 file:rounded-lg file:border-0 file:bg-surface-hover file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Subiendo…" : "Publicar"}
        </Button>
      </form>
    </div>
  );
}
