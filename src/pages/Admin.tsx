import { useState } from "react";
import { Upload, Image, Settings, LogIn } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedSection } from "@/components/common/AnimatedSection";
import { useLanguage, translations, CATEGORIES } from "@/contexts/LanguageContext";
import { isConfigured } from "@/lib/firebase";
import { isCloudinaryConfigured } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const { t, isJapanese } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) onLogin();
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
              <CardDescription>
                {!isConfigured && (
                  <span className="text-destructive">Firebase not configured. Using demo mode.</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  {t(translations.admin.login)}
                </Button>
              </form>
            </CardContent>
          </Card>
        </AnimatedSection>
      </section>
    </PageLayout>
  );
}

function UploadForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const categoryLabels: Record<string, string> = {
    landscape: "Landscape",
    wildlife: "Wildlife",
    nightscene: "Night Scene",
    food: "Food",
    travel: "Travel",
    portrait: "Portrait",
    tuffy: "Tuffy",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload New Photo</CardTitle>
        <CardDescription>Add a photo to your gallery via Cloudinary</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Photo title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {categoryLabels[cat]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Cloudinary Image URL</Label>
          <Input id="imageUrl" placeholder="https://res.cloudinary.com/..." value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground text-sm mb-3">Or drag and drop files here</p>
          <Button disabled={!isCloudinaryConfigured} size="sm">
            <Upload className="w-4 h-4 mr-2" /> Upload to Cloudinary
          </Button>
          {!isCloudinaryConfigured && (
            <p className="text-sm text-muted-foreground mt-3">Configure Cloudinary to enable uploads</p>
          )}
        </div>
        <Button className="w-full" disabled={!title || !category}>
          Save to Gallery
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const { t, isJapanese } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <PageLayout showFooter={false}>
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <h1 className={cn("text-2xl font-semibold", isJapanese && "font-japanese")}>
              {t(translations.admin.title)}
            </h1>
            <Button variant="outline" onClick={() => setIsLoggedIn(false)}>
              {t(translations.admin.logout)}
            </Button>
          </div>

          {/* Status */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Card className={cn(!isConfigured && "border-destructive/50")}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Settings className="w-4 h-4" /> Firebase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className={cn("text-sm", isConfigured ? "text-secondary-foreground" : "text-destructive")}>
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
                <p className={cn("text-sm", isCloudinaryConfigured ? "text-secondary-foreground" : "text-destructive")}>
                  {isCloudinaryConfigured ? "✓ Connected" : "⚠ Not configured"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upload Form */}
          <UploadForm />
        </div>
      </section>
    </PageLayout>
  );
}
