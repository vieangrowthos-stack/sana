import { useState, useEffect } from "react";
import {
  Image, Settings, LogIn, BookOpen, Pencil, Trash2,
  Plus, X, Eye, EyeOff, LayoutTemplate, FileText,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations, CATEGORIES } from "@/contexts/LanguageContext";
import { isConfigured, db } from "@/lib/firebase";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  collection, addDoc, getDocs, updateDoc, deleteDoc,
  doc, Timestamp, orderBy, query,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

/* ─────────────────────────── TYPES ─────────────────────────── */

interface MediaDoc {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  createdAt: Timestamp;
}

interface BlogDoc {
  id: string;
  title_en: string;
  title_ja: string;
  excerpt_en: string;
  excerpt_ja: string;
  body_en: string;
  body_ja: string;
  coverUrl: string;
  publishedAt: string;
  createdAt: Timestamp;
}

/* ─────────────────────────── LOGIN ─────────────────────────── */

function AdminLogin() {
  const { t, isJapanese } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const ADMIN_EMAIL = "viean.growthos@gmail.com";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email !== ADMIN_EMAIL) { setError("You are not authorized."); return; }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout showFooter={false}>
      <section className="min-h-[80vh] flex items-center justify-center px-6">
        <AnimatedSection>
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className={cn("text-2xl", isJapanese && "font-japanese")}>
                {t(translations.admin.title)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>
    </PageLayout>
  );
}

/* ─────────────────────────── PHOTOS TAB ─────────────────────────── */

const CATEGORY_LABELS: Record<string, string> = {
  landscape: "Landscape", wildlife: "Wildlife", nightscene: "Night Scene",
  food: "Food", travel: "Travel", portrait: "Portrait", tuffy: "Tuffy",
};

function PhotosTab() {
  const [photos, setPhotos] = useState<MediaDoc[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editImageUrl, setEditImageUrl] = useState("");
  const [editSaving, setEditSaving] = useState(false);

  const fetchPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const q = query(collection(db, "media"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setPhotos(snap.docs.map((d) => ({ id: d.id, ...d.data() } as MediaDoc)));
    } catch (e) { console.error(e); }
    finally { setLoadingPhotos(false); }
  };

  useEffect(() => { fetchPhotos(); }, []);

  const handleAdd = async () => {
    if (!title || !category || !imageUrl) { alert("Please fill all fields"); return; }
    try {
      setSaving(true);
      await addDoc(collection(db, "media"), { title, category, imageUrl, createdAt: Timestamp.now() });
      setTitle(""); setCategory(""); setImageUrl("");
      await fetchPhotos();
    } catch (e) { console.error(e); alert("Error saving photo"); }
    finally { setSaving(false); }
  };

  const startEdit = (p: MediaDoc) => {
    setEditId(p.id); setEditTitle(p.title); setEditCategory(p.category); setEditImageUrl(p.imageUrl);
  };

  const handleUpdate = async () => {
    if (!editId) return;
    try {
      setEditSaving(true);
      await updateDoc(doc(db, "media", editId), { title: editTitle, category: editCategory, imageUrl: editImageUrl });
      setEditId(null);
      await fetchPhotos();
    } catch (e) { console.error(e); alert("Error updating photo"); }
    finally { setEditSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    try { await deleteDoc(doc(db, "media", id)); await fetchPhotos(); }
    catch (e) { console.error(e); alert("Error deleting photo"); }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add New Photo</CardTitle>
          <CardDescription>Upload to Cloudinary first, then paste the URL below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Photo title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{CATEGORY_LABELS[cat]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Cloudinary Image URL</Label>
            <Input placeholder="https://res.cloudinary.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>
          {imageUrl && (
            <div className="rounded-lg overflow-hidden w-32 h-24 border border-border">
              <img src={imageUrl} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}
          <Button onClick={handleAdd} disabled={!title || !category || !imageUrl || saving} className="w-full md:w-auto">
            {saving ? "Saving..." : "Save to Gallery"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Image className="w-4 h-4" /> All Photos ({photos.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingPhotos ? (
            <p className="text-muted-foreground text-sm py-4 text-center">Loading photos…</p>
          ) : photos.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">No photos yet. Add one above.</p>
          ) : (
            <div className="space-y-3">
              {photos.map((p) => (
                <div key={p.id} className="border border-border rounded-xl overflow-hidden">
                  {editId === p.id ? (
                    <div className="p-4 space-y-3 bg-accent/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Title</Label>
                          <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs">Category</Label>
                          <Select value={editCategory} onValueChange={setEditCategory}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {CATEGORIES.map((cat) => (
                                <SelectItem key={cat} value={cat}>{CATEGORY_LABELS[cat]}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs">Image URL</Label>
                        <Input value={editImageUrl} onChange={(e) => setEditImageUrl(e.target.value)} />
                      </div>
                      {editImageUrl && (
                        <div className="rounded-lg overflow-hidden w-32 h-24 border border-border">
                          <img src={editImageUrl} alt="preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleUpdate} disabled={editSaving}>
                          {editSaving ? "Saving…" : "Save Changes"}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditId(null)}>
                          <X className="w-3 h-3 mr-1" /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 p-3">
                      <img src={p.imageUrl} alt={p.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{p.title}</p>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                          {CATEGORY_LABELS[p.category] || p.category}
                        </span>
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEdit(p)}>
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(p.id)}>
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ─────────────────────────── BLOG TEMPLATES ─────────────────────────── */

const BLOG_TEMPLATES: { label: string; body: string }[] = [
  {
    label: "📸 Photo Essay",
    body: `Introduction — set the scene and tell readers what this post is about.

The Story Begins — describe the journey, location, or moment that inspired this shoot. What were you thinking and feeling?

Technical Approach — talk about the gear you used, camera settings, time of day, lighting conditions.

The Key Shot — describe your favourite image from the shoot. What makes it special?

Lessons Learned — what did this experience teach you about photography or creativity?

Final Thoughts — wrap up with a reflection and invite readers to share their own experiences.`,
  },
  {
    label: "🌿 Tips & Tutorial",
    body: `Introduction — briefly explain what technique or tip this post covers and why it matters.

What You'll Need — list the equipment, settings, or prerequisites the reader should have.

Step 1: [First Step Title] — explain this step in detail. Be specific and practical.

Step 2: [Second Step Title] — continue with the next step. Include common mistakes to avoid.

Step 3: [Third Step Title] — the final key step or technique.

Pro Tips — share 2–3 advanced tips that will help readers go further.

Conclusion — summarise what was covered and encourage readers to try it out.`,
  },
  {
    label: "✈️ Travel Story",
    body: `The Journey Begins — where are you, and what drew you to this destination?

First Impressions — describe what you saw, smelled, and felt upon arriving. Be vivid and sensory.

Hidden Gems — share the places most tourists miss. What made them special?

The People — describe the locals you met. Small interactions can define a place.

Photography Highlights — what were your favourite shots? What was challenging to capture?

Practical Tips — best times to visit, permits, gear recommendations for other photographers.

Reflection — what did this journey mean to you? What did you bring home beyond photos?`,
  },
  {
    label: "🖼️ Behind the Scenes",
    body: `The Concept — what was the idea behind this shoot? Where did the inspiration come from?

Planning & Preparation — location scouting, weather research, permits, team?

On Location — describe the experience. What went right? What went wrong?

The Creative Process — how did you make decisions in the moment? Composition, timing, light?

The Results — which images are you most proud of and why?

What I'd Do Differently — honest reflection on what you would change next time.`,
  },
];

/* ─────────────────────────── BLOGS TAB ─────────────────────────── */

const EMPTY_BLOG = {
  title_en: "", title_ja: "",
  excerpt_en: "", excerpt_ja: "",
  body_en: "", body_ja: "",
  coverUrl: "", publishedAt: new Date().toISOString().split("T")[0],
};

function BlogsTab() {
  const [blogs, setBlogs] = useState<BlogDoc[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [form, setForm] = useState({ ...EMPTY_BLOG });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoadingBlogs(true);
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setBlogs(snap.docs.map((d) => ({ id: d.id, ...d.data() } as BlogDoc)));
    } catch (e) { console.error(e); }
    finally { setLoadingBlogs(false); }
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleSave = async () => {
    const { title_en, excerpt_en, body_en, coverUrl, publishedAt } = form;
    if (!title_en || !excerpt_en || !body_en || !coverUrl || !publishedAt) {
      alert("Please fill in the required English fields, cover URL, and date.");
      return;
    }
    try {
      setSaving(true);
      const payload = { ...form, createdAt: Timestamp.now() };
      if (editId) {
        await updateDoc(doc(db, "blogs", editId), payload);
      } else {
        await addDoc(collection(db, "blogs"), payload);
      }
      setForm({ ...EMPTY_BLOG });
      setEditId(null);
      setShowForm(false);
      setShowPreview(false);
      await fetchBlogs();
    } catch (e) { console.error(e); alert("Error saving blog post"); }
    finally { setSaving(false); }
  };

  const startEdit = (b: BlogDoc) => {
    setEditId(b.id);
    setForm({
      title_en: b.title_en, title_ja: b.title_ja || "",
      excerpt_en: b.excerpt_en, excerpt_ja: b.excerpt_ja || "",
      body_en: b.body_en, body_ja: b.body_ja || "",
      coverUrl: b.coverUrl, publishedAt: b.publishedAt,
    });
    setShowForm(true);
    setShowPreview(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({ ...EMPTY_BLOG });
    setShowForm(false);
    setShowPreview(false);
    setShowTemplates(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try { await deleteDoc(doc(db, "blogs", id)); await fetchBlogs(); }
    catch (e) { console.error(e); alert("Error deleting blog post"); }
  };

  const f = (key: keyof typeof EMPTY_BLOG) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const applyTemplate = (body: string) => {
    setForm((prev) => ({ ...prev, body_en: body }));
    setShowTemplates(false);
  };

  const previewParagraphs = form.body_en.split("\n\n").filter(Boolean);

  return (
    <div className="space-y-6">
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="w-4 h-4" /> New Blog Post
        </Button>
      )}

      {/* ── Blog Form ── */}
      {showForm && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {editId ? <><Pencil className="w-4 h-4" /> Edit Blog Post</> : <><Plus className="w-4 h-4" /> New Blog Post</>}
                </CardTitle>
                <CardDescription>
                  Fields marked <span className="text-destructive">*</span> are required. Japanese fields are optional.
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={cancelEdit}><X className="w-4 h-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Cover + Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Cover Image URL <span className="text-destructive">*</span></Label>
                <Input placeholder="https://res.cloudinary.com/..." value={form.coverUrl} onChange={f("coverUrl")} />
              </div>
              <div className="space-y-2">
                <Label>Published Date <span className="text-destructive">*</span></Label>
                <Input type="date" value={form.publishedAt} onChange={f("publishedAt")} />
              </div>
            </div>
            {form.coverUrl && (
              <div className="rounded-xl overflow-hidden h-48 border border-border">
                <img src={form.coverUrl} alt="cover preview" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Titles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title (English) <span className="text-destructive">*</span></Label>
                <Input placeholder="Post title in English" value={form.title_en} onChange={f("title_en")} />
              </div>
              <div className="space-y-2">
                <Label className="font-japanese">Title (日本語)</Label>
                <Input placeholder="日本語のタイトル" value={form.title_ja} onChange={f("title_ja")} className="font-japanese" />
              </div>
            </div>

            {/* Excerpts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Excerpt (English) <span className="text-destructive">*</span></Label>
                <Textarea
                  placeholder="A short teaser shown on the blog listing page…"
                  rows={3}
                  value={form.excerpt_en}
                  onChange={f("excerpt_en")}
                />
              </div>
              <div className="space-y-2">
                <Label className="font-japanese">Excerpt (日本語)</Label>
                <Textarea
                  placeholder="ブログ一覧に表示される短い説明…"
                  rows={3}
                  value={form.excerpt_ja}
                  onChange={f("excerpt_ja")}
                  className="font-japanese"
                />
              </div>
            </div>

            {/* Body — English with template picker + live preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <Label>Body (English) <span className="text-destructive">*</span></Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Separate paragraphs with a blank line (press Enter twice between sections).
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    type="button" size="sm" variant="outline" className="gap-1.5 text-xs"
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    <LayoutTemplate className="w-3.5 h-3.5" />
                    {showTemplates ? "Hide Templates" : "Use Template"}
                  </Button>
                  <Button
                    type="button" size="sm" variant="outline" className="gap-1.5 text-xs"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    {showPreview ? "Hide Preview" : "Live Preview"}
                  </Button>
                </div>
              </div>

              {/* Template Picker */}
              {showTemplates && (
                <div className="p-3 bg-accent/20 rounded-xl border border-border space-y-2">
                  <p className="text-xs text-muted-foreground font-medium">Choose a starting structure — you can edit it after applying:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {BLOG_TEMPLATES.map((tpl) => (
                      <button
                        key={tpl.label}
                        type="button"
                        onClick={() => applyTemplate(tpl.body)}
                        className="text-left p-3 rounded-lg bg-background border border-border hover:border-primary hover:bg-primary/5 transition-all text-xs font-medium leading-snug"
                      >
                        {tpl.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Editor + Live Preview */}
              <div className={cn(showPreview ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "block")}>
                {/* Editor */}
                <div className="space-y-1">
                  {showPreview && (
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Editor
                    </p>
                  )}
                  <Textarea
                    placeholder={`Write your full blog post here…\n\nPress Enter twice to start a new paragraph.\n\nEach double-newline becomes a separate paragraph on the site.`}
                    rows={16}
                    value={form.body_en}
                    onChange={f("body_en")}
                    className="font-mono text-sm resize-y"
                  />
                </div>

                {/* Live Preview */}
                {showPreview && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Live Preview
                    </p>
                    <div className="border border-border rounded-lg p-5 bg-background overflow-y-auto min-h-[300px] max-h-[500px]">
                      {form.coverUrl && (
                        <div className="rounded-lg overflow-hidden h-28 mb-4">
                          <img src={form.coverUrl} alt="cover" className="w-full h-full object-cover" />
                        </div>
                      )}
                      {form.title_en && (
                        <h2 className="font-display text-xl font-semibold mb-2 text-foreground leading-tight">{form.title_en}</h2>
                      )}
                      {form.excerpt_en && (
                        <p className="text-sm text-muted-foreground italic mb-4 pb-3 border-b border-border">{form.excerpt_en}</p>
                      )}
                      {previewParagraphs.length > 0 ? (
                        previewParagraphs.map((para, i) => (
                          <p key={i} className="text-sm text-foreground/85 leading-relaxed mb-4">{para}</p>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground italic">Start typing in the editor to see a preview here…</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Body — Japanese */}
            <div className="space-y-2">
              <Label className="font-japanese">Body (日本語) — optional</Label>
              <p className="text-xs text-muted-foreground">段落は空白行（Enter 2回）で区切ります。</p>
              <Textarea
                placeholder={"日本語の本文をここに書きます…\n\n空白行で段落を区切ってください。"}
                rows={10}
                value={form.body_ja}
                onChange={f("body_ja")}
                className="font-japanese text-sm resize-y"
              />
            </div>

            <div className="flex gap-3 pt-2 border-t border-border">
              <Button onClick={handleSave} disabled={saving} className="gap-2">
                {saving ? "Saving…" : editId ? "Update Post" : "Publish Post"}
              </Button>
              <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ── Blog List ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> All Blog Posts ({blogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loadingBlogs ? (
            <p className="text-muted-foreground text-sm py-4 text-center">Loading posts…</p>
          ) : blogs.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">No blog posts yet. Create one above.</p>
          ) : (
            <div className="space-y-3">
              {blogs.map((b) => (
                <div key={b.id} className="border border-border rounded-xl overflow-hidden">
                  <div className="flex items-center gap-3 p-3">
                    <img src={b.coverUrl} alt={b.title_en} className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{b.title_en}</p>
                      <p className="text-xs text-muted-foreground">{b.publishedAt}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <Button
                        size="icon" variant="ghost" className="h-8 w-8"
                        onClick={() => setExpandedId(expandedId === b.id ? null : b.id)}
                        title="Preview"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => startEdit(b)} title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="icon" variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(b.id)} title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  {expandedId === b.id && (
                    <div className="border-t border-border p-4 bg-accent/10 space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Excerpt</p>
                      <p className="text-sm">{b.excerpt_en}</p>
                      {b.excerpt_ja && <p className="text-sm font-japanese text-muted-foreground">{b.excerpt_ja}</p>}
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-3">Body Preview</p>
                      <p className="text-sm text-muted-foreground line-clamp-4">{b.body_en}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

/* ─────────────────────────── MAIN ADMIN ─────────────────────────── */

export default function Admin() {
  const { t, isJapanese } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"photos" | "blogs">("photos");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => { setUser(u); setAuthLoading(false); });
    return () => unsub();
  }, []);

  if (authLoading) return <div className="p-10 text-center text-muted-foreground">Checking authentication…</div>;
  if (!user) return <AdminLogin />;

  return (
    <PageLayout showFooter={false}>
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-4xl">

          <div className="flex items-center justify-between mb-8">
            <h1 className={cn("text-2xl font-semibold", isJapanese && "font-japanese")}>
              {t(translations.admin.title)}
            </h1>
            <Button variant="outline" onClick={() => signOut(auth)}>Logout</Button>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className={cn(!isConfigured && "border-destructive/50")}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Firebase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn("text-sm", isConfigured ? "text-green-600" : "text-destructive")}>
                  {isConfigured ? "✓ Connected" : "⚠ Not configured"}
                </p>
              </CardContent>
            </Card>
            <Card className={cn(!isCloudinaryConfigured && "border-destructive/50")}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Image className="w-4 h-4" /> Cloudinary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn("text-sm", isCloudinaryConfigured ? "text-green-600" : "text-destructive")}>
                  {isCloudinaryConfigured ? "✓ Connected" : "⚠ Not configured"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-xl mb-6 w-fit">
            <button
              onClick={() => setActiveTab("photos")}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === "photos" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Image className="w-4 h-4" /> Photos
            </button>
            <button
              onClick={() => setActiveTab("blogs")}
              className={cn(
                "flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all",
                activeTab === "blogs" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <BookOpen className="w-4 h-4" /> Blog Posts
            </button>
          </div>

          {activeTab === "photos" ? <PhotosTab /> : <BlogsTab />}

        </div>
      </section>
    </PageLayout>
  );
}