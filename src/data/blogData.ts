import { BilingualText } from "@/contexts/LanguageContext";

export interface BlogPost {
  id: string;
  title: BilingualText;
  excerpt: BilingualText;
  body: BilingualText;
  coverUrl: string;
  publishedAt: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: { en: "Chasing the Golden Hour", ja: "ゴールデンアワーを追いかけて" },
    excerpt: {
      en: "The magic that happens when the sun kisses the horizon — and how I capture it.",
      ja: "太陽が地平線にキスする瞬間の魔法 — そしてそれをどう捉えるか。",
    },
    body: {
      en: "Golden hour is that fleeting window of warm, diffused light just after sunrise or before sunset. It transforms even the most ordinary scenes into something extraordinary.\n\nI've spent years chasing this light across mountains, coastlines, and city rooftops. The key is preparation — scouting locations beforehand and arriving early. I typically shoot with a wide aperture to let in as much of that gorgeous warm light as possible.\n\nOne of my favorite techniques is backlighting, where you position your subject between yourself and the sun. The resulting rim light creates a dreamy, ethereal quality that's hard to replicate at any other time of day.\n\nThe challenge is speed. You have roughly 20-30 minutes of perfect light, and it changes constantly. I've learned to work quickly, adjusting my settings on the fly while staying present enough to notice unexpected compositions.",
      ja: "ゴールデンアワーとは、日の出直後や日没前の暖かく拡散した光のつかの間の時間です。最も普通のシーンさえも特別なものに変えてしまいます。\n\n私は何年もかけて、山、海岸線、街の屋上でこの光を追いかけてきました。重要なのは準備です — 事前にロケーションを下見し、早めに到着すること。\n\nお気に入りのテクニックの一つはバックライトで、被写体を自分と太陽の間に配置します。結果として得られるリムライトは、他の時間帯では再現しにくい夢のような雰囲気を生み出します。",
    },
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    publishedAt: "2025-02-15",
  },
  {
    id: "2",
    title: { en: "Wildlife Photography: Patience is Everything", ja: "野生動物写真：忍耐がすべて" },
    excerpt: {
      en: "What hours of waiting in the wild taught me about photography and life.",
      ja: "野生での何時間もの待機が、写真と人生について教えてくれたこと。",
    },
    body: {
      en: "Wildlife photography is perhaps the most humbling genre of photography. You can have the best equipment, perfect settings, and ideal conditions — but if the animal doesn't cooperate, you go home empty-handed.\n\nI've spent entire days hidden in blinds, barely moving, waiting for a single moment. An eagle diving for fish, a deer emerging from morning mist, a fox playing with its cubs. These moments are worth every minute of waiting.\n\nThe most important lesson I've learned is to respect the animals and their habitat. I use long telephoto lenses to maintain distance and never bait or disturb wildlife for a shot. The best wildlife photos come from understanding animal behavior and positioning yourself where the action will happen.\n\nMy gear essentials include a 200-600mm telephoto, a sturdy tripod, and plenty of patience. I also carry camouflage netting and always check wind direction to stay downwind of my subjects.",
      ja: "野生動物写真は、おそらく最も謙虚さを教えてくれる写真のジャンルです。最高の機材、完璧な設定、理想的な条件があっても、動物が協力してくれなければ手ぶらで帰ることになります。\n\n私はブラインドに隠れて丸一日、ほとんど動かずに一瞬を待ったことがあります。魚を狙って急降下する鷲、朝霧から現れる鹿、子供と遊ぶキツネ。これらの瞬間は、待つすべての時間に値します。",
    },
    coverUrl: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800",
    publishedAt: "2025-01-20",
  },
  {
    id: "3",
    title: { en: "Night Photography: Painting with Light", ja: "夜景写真：光で描く" },
    excerpt: {
      en: "How I capture the beauty of the night sky and city lights after dark.",
      ja: "夜空と街の灯りの美しさをどう捉えるか。",
    },
    body: {
      en: "There's something magical about the world after dark. The familiar becomes mysterious, ordinary streets transform into rivers of light, and the sky reveals its hidden treasures.\n\nNight photography requires a completely different approach. Long exposures, wide apertures, and high ISOs become your tools. I typically shoot between ISO 1600-6400 for cityscapes and up to ISO 12800 for astrophotography.\n\nFor city night scenes, I love capturing light trails from passing traffic. A 15-30 second exposure turns headlights and taillights into flowing ribbons of color. The key is finding elevated vantage points that give you interesting compositions.\n\nAstrophotography is my true passion within night photography. Capturing the Milky Way requires dark sky locations far from light pollution, a fast wide-angle lens (f/1.4-2.8), and the 500 rule to calculate maximum exposure time before stars start trailing.",
      ja: "暗闇の後の世界には何か魔法のようなものがあります。見慣れたものが神秘的になり、普通の道が光の川に変わり、空が隠された宝物を明らかにします。\n\n夜景写真にはまったく異なるアプローチが必要です。長時間露光、広い絞り、高いISOがツールとなります。\n\n都市の夜景では、通過する交通からの光の軌跡を捉えるのが好きです。15〜30秒の露出で、ヘッドライトとテールライトが流れるような色のリボンに変わります。",
    },
    coverUrl: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=800",
    publishedAt: "2024-12-10",
  },
  {
    id: "4",
    title: { en: "The Art of Food Photography", ja: "フード写真の芸術" },
    excerpt: {
      en: "Behind the scenes of making food look as delicious as it tastes.",
      ja: "食べ物を味と同じくらい美味しく見せる舞台裏。",
    },
    body: {
      en: "Food photography is where culinary art meets visual storytelling. Every dish has a story to tell, and my job is to make you taste it with your eyes.\n\nLighting is everything in food photography. I almost exclusively use natural light from a window, sometimes supplemented with a reflector to fill shadows. Harsh direct sunlight is usually avoided — soft, diffused light brings out textures and colors without creating distracting highlights.\n\nStyling is the other half of the equation. Fresh herbs, a drizzle of olive oil, steam rising from a hot dish — these small details make the difference between a snapshot and a compelling image. I work closely with chefs and food stylists to ensure every element is intentional.\n\nMy go-to setup is a 50mm or 90mm macro lens, shooting slightly above the dish at a 45-degree angle. This mimics how we naturally see food when seated at a table, making the image feel inviting and familiar.",
      ja: "フード写真は、料理の芸術とビジュアルストーリーテリングが出会う場所です。すべての料理には語るべきストーリーがあり、私の仕事はそれを目で味わわせることです。\n\nフード写真ではライティングがすべてです。私はほぼ窓からの自然光のみを使用し、時にはレフ板で影を補います。\n\nスタイリングはもう一つの重要な要素です。新鮮なハーブ、オリーブオイルのかけ方、熱い料理から立ち上る蒸気 — これらの小さなディテールが、スナップショットと魅力的な画像の違いを生み出します。",
    },
    coverUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
    publishedAt: "2024-11-05",
  },
  {
    id: "5",
    title: { en: "Travel Photography Tips from the Road", ja: "旅先からの旅行写真のヒント" },
    excerpt: {
      en: "Lessons learned from photographing cultures, landscapes, and stories around the world.",
      ja: "世界中の文化、風景、物語を撮影して学んだ教訓。",
    },
    body: {
      en: "Travel photography is about more than beautiful landscapes — it's about capturing the essence of a place and its people. After years of traveling with my camera, here are the lessons that transformed my work.\n\nFirst, research before you go, but remain open to surprises. I always study a destination's iconic shots, then deliberately look for perspectives no one else has captured. The best travel photos often come from wandering without a plan.\n\nSecond, engage with locals. Some of my most powerful portraits came from genuine conversations, not from pointing a camera at strangers. Learn a few words in the local language, ask permission, and show genuine interest in people's stories.\n\nThird, pack light. I've learned the hard way that carrying too much gear slows you down and makes you conspicuous. My travel kit is now just one camera body, a 24-70mm zoom, and a small prime lens. That's it.\n\nFinally, shoot during transitions — dawn, dusk, market opening times, festival preparations. These in-between moments often reveal the most authentic character of a place.",
      ja: "旅行写真は美しい風景以上のものです — それは場所とそこに住む人々の本質を捉えることです。\n\n行く前にリサーチしますが、サプライズにもオープンでいること。目的地の象徴的なショットを研究し、誰も撮っていない視点を意図的に探します。\n\n地元の人々と交流すること。最も力強いポートレートは、見知らぬ人にカメラを向けたのではなく、本当の会話から生まれました。",
    },
    coverUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
    publishedAt: "2024-10-18",
  },
  {
    id: "6",
    title: { en: "Portrait Photography: Capturing Personality", ja: "ポートレート写真：個性を捉える" },
    excerpt: {
      en: "How to go beyond a simple headshot and reveal the person behind the face.",
      ja: "単純なヘッドショットを超えて、顔の向こうにある人を明らかにする方法。",
    },
    body: {
      en: "A great portrait doesn't just show what someone looks like — it reveals who they are. The difference between a forgettable headshot and a compelling portrait lies in connection.\n\nBefore I pick up my camera, I spend time talking with my subject. I ask about their passions, their fears, what makes them laugh. This conversation serves two purposes: it relaxes them and gives me insight into their personality, which I can then reflect in the image.\n\nLighting for portraits is an art in itself. I prefer natural light whenever possible — a large window provides beautiful, soft illumination that flatters most faces. When I use artificial light, I keep it simple: one key light and a reflector.\n\nEnvironmental portraits, where the subject is photographed in their own space — a workshop, kitchen, studio — add layers of meaning. The environment tells part of their story without a single word.\n\nThe moment of capture matters too. I shoot continuously during conversation, watching for those micro-expressions — a genuine laugh, a thoughtful pause, a flash of vulnerability — that reveal the real person.",
      ja: "素晴らしいポートレートは、誰かがどのように見えるかを示すだけでなく、彼らが誰であるかを明らかにします。\n\nカメラを手に取る前に、被写体と話す時間を過ごします。彼らの情熱、恐れ、何が笑わせるかを聞きます。\n\n環境ポートレートは、被写体が自分のスペースで撮影されるもので、意味の層を加えます。環境が一言もなしに彼らのストーリーの一部を語ります。",
    },
    coverUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
    publishedAt: "2024-09-22",
  },
];
