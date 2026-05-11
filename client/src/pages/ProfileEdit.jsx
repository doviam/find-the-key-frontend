import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { Button } from "../components/Button.jsx";

export function ProfileEdit() {
  const { profile, isArtist, isPromoter, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({});

  useEffect(() => {
    if (!profile) return;
    setForm({ ...profile });
  }, [profile]);

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    try {
      const body = isArtist
        ? {
            stage_name: form.stage_name,
            photo_url: form.photo_url,
            bio: form.bio,
            city: form.city,
            genre: form.genre,
            spotify_url: form.spotify_url,
            instagram_url: form.instagram_url,
          }
        : {
            company_name: form.company_name,
            entity_type: form.entity_type,
            city: form.city,
            description: form.description,
            contact_email: form.contact_email,
          };
      await updateProfile(body);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="text-2xl font-bold">Editar perfil</h1>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && <p className="text-sm text-red-400">{error}</p>}
        {saved && <p className="text-sm text-lime">Guardado correctamente.</p>}
        {isArtist && (
          <>
            <Field label="Nombre artístico" value={form.stage_name} onChange={(v) => set("stage_name", v)} />
            <Field label="URL foto" value={form.photo_url} onChange={(v) => set("photo_url", v)} />
            <Area label="Bio" value={form.bio} onChange={(v) => set("bio", v)} />
            <Field label="Ciudad" value={form.city} onChange={(v) => set("city", v)} />
            <Field label="Género musical" value={form.genre} onChange={(v) => set("genre", v)} />
            <Field label="Spotify" value={form.spotify_url} onChange={(v) => set("spotify_url", v)} />
            <Field label="Instagram" value={form.instagram_url} onChange={(v) => set("instagram_url", v)} />
          </>
        )}
        {isPromoter && (
          <>
            <Field label="Nombre empresa" value={form.company_name} onChange={(v) => set("company_name", v)} />
            <Field
              label="Tipo (promotor, sala, marca, estudio, evento)"
              value={form.entity_type}
              onChange={(v) => set("entity_type", v)}
            />
            <Field label="Ciudad" value={form.city} onChange={(v) => set("city", v)} />
            <Area label="Descripción" value={form.description} onChange={(v) => set("description", v)} />
            <Field label="Email contacto" value={form.contact_email} onChange={(v) => set("contact_email", v)} type="email" />
          </>
        )}
        <Button type="submit" className="w-full">
          Guardar
        </Button>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted">{label}</label>
      <input
        type={type}
        className="mt-1 w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Area({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted">{label}</label>
      <textarea
        className="mt-1 min-h-[100px] w-full rounded-xl border border-white/10 bg-surface-card px-4 py-3 text-white outline-none focus:border-accent"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
