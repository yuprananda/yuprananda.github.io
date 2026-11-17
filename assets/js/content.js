/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  /** Edit visitor-facing text here. Keep English and Indonesian entries aligned.
   * Arrays in copy.slides: [eyebrow, title, ...body]. Services/process use the named lists below.
   * This is trusted, repository-owned content rendered as HTML: never insert untrusted user input. */
  const copy = {
    en: {
      nav: ["Hello", "Philosophy", "Tech", "Projects", "Thoughts", "Contact"],
      role: "Frontend developer",
      hint: "Use the menu or arrows; swipe on mobile",
      slides: [
        [
          "Hello, I\u2019m Yu \u2014 glad you\u2019re here.",
          "Where every screen feels effortless.",
          "Great interfaces never ask for attention. I craft quiet, thoughtful web experiences that get out of the way and let people focus on what matters.",
          "Read my philosophy",
        ],
        [
          "Guided by intention, not by noise.",
          "Screens are easy to build. Only care makes them feel human.",
          "Beyond instant templates, great interfaces still come from human taste\u2014anchored in three quiet principles.",
        ],
        [
          "Craft & fundamentals.",
          "One foundation. Built for mobile, web, & desktop.",
          "Every device brings its own ergonomics. I anchor every interface in core web fundamentals, then pick the right stack for the screen.",
        ],
        [
          "Selected work \u00b7 Visual novel web",
          "Rehearsal",
          "A bilingual promotional site for MangMengMong Studio \u2014 atmospheric CG scenes, tactile notebook modals, and calm pacing.",
        ],
        [
          "Thoughts \u00b7 Personal notes",
          "Notes on AI, craft, and choosing frontend.",
          "Conversations on staying rooted in fundamentals, why frontend still matters, and fighting generic interfaces with human care.",
        ],
        [
          "Great interfaces start with a shared vision.",
          "Let\u2019s make it beautiful.",
          "Looking for a frontend developer who cares deeply about user experience, simplicity, and visual craft? Tell me what you have in mind.",
          "Available for remote projects and design-focused collaborations worldwide.",
        ],
      ],
    },
    id: {
      nav: ["Halo", "Filosofi", "Teknologi", "Proyek", "Thoughts", "Kontak"],
      role: "Frontend developer",
      hint: "Gunakan menu atau panah; geser pada ponsel",
      slides: [
        [
          "Halo, saya Yu \u2014 senang Anda mampir.",
          "Saat setiap layar terasa begitu ringan.",
          "Antarmuka yang baik tidak pernah membingungkan. Saya merancang tampilan yang tenang dan terukur, sehingga setiap orang bisa menggunakannya tanpa perlu berpikir dua kali.",
          "Baca filosofi saya",
        ],
        [
          "Berangkat dari rasa, bukan sekadar tren.",
          "Layar mudah dibuat. Hanya rasa yang membuatnya terasa akrab.",
          "Di luar tampilan serba instan, antarmuka terbaik tetap lahir dari kepekaan manusia pada tiga prinsip tenang.",
        ],
        [
          "Fondasi & perangkat.",
          "Satu fondasi. Untuk mobile, web, & desktop.",
          "Setiap perangkat punya ritme dan batasannya sendiri. Saya bertumpu pada fundamental web, lalu memilih teknologi paling pas untuk layarnya.",
        ],
        [
          "Karya pilihan \u00b7 Web visual novel",
          "Rehearsal",
          "Situs promosional dua bahasa untuk MangMengMong Studio \u2014 latar CG atmosferik, modal bergaya buku catatan, dan ritme visual yang tenang.",
        ],
        [
          "Thoughts \u00b7 Catatan pribadi",
          "Pemikiran soal AI, rasa, & pilihan frontend.",
          "Obrolan singkat tentang menjaga fundamental, kenapa peran frontend tetap penting, dan melawan tampilan generik dengan perhatian manusia.",
        ],
        [
          "Antarmuka yang baik berawal dari visi yang searah.",
          "Mari buat lebih indah.",
          "Mencari frontend developer yang mengutamakan pengalaman pengguna, kesederhanaan, dan keindahan visual? Ceritakan ide yang ingin Anda wujudkan.",
          "Terbuka untuk proyek remote dan kolaborasi di seluruh dunia.",
        ],
      ],
    },
  };

  const galleryImages = [
    [
      "assets/images/bicless-dashboard-real.webp",
      "Overview dashboard",
      "Ringkasan utama",
    ],
    [
      "assets/images/bicless-employees-real.webp",
      "Employee directory",
      "Direktori karyawan",
    ],
    [
      "assets/images/bicless-equipment-real.webp",
      "Readiness & requirements",
      "Kesiapan & persyaratan",
    ],
  ];

  const serviceGroups = {
    id: [
      [
        "Experience",
        "Pengalaman Manusiawi",
        "Mengalir wajar, merespons lembut, dan tak pernah membuat pengguna merasa asing.",
        "\u201cLayar terbaik terasa seperti ruang yang teduh: mudah dipahami dan ramah disentuh.\u201d",
        "terasa akrab.",
      ],
      [
        "Simplicity",
        "Kesederhanaan Jernih",
        "Menyisihkan kerumitan hingga yang tersisa hanyalah kejelasan dan ruang bernapas.",
        "\u201cSederhana berarti menepikan kebisingan agar hal terpenting langsung terlihat.\u201d",
        "begitu jernih.",
      ],
      [
        "Beauty",
        "Keindahan Teduh",
        "Proporsi jujur dan tipografi lega yang tetap hangat meski dilihat ribuan kali.",
        "\u201cTren mudah berganti, namun ketelitian pada ritme dan proporsi selalu hidup.\u201d",
        "indah tenang.",
      ],
    ],
    en: [
      [
        "Experience",
        "Human Experience",
        "Flowing naturally, responding gently, and never making anyone feel lost.",
        "\u201cThe best interface feels like a calm room: intuitive and quietly attentive.\u201d",
        "feel human.",
      ],
      [
        "Simplicity",
        "Quiet Simplicity",
        "Clearing away visual clutter until only clarity and breathing room remain.",
        "\u201cSimplicity is removing the noise so what truly matters can shine.\u201d",
        "quietly simple.",
      ],
      [
        "Beauty",
        "Timeless Beauty",
        "Honest proportions and breathable type that stay warm after thousands of uses.",
        "\u201cTrends fade quickly, but care given to rhythm and proportion stays timeless.\u201d",
        "timeless.",
      ],
    ],
  };

  /** Under-maintenance gallery slots for #projects. Replace with real case studies when ready. */
  const projects = {
    id: [
      {
        slug: "maintenance-main",
        num: "01",
        name: "Galeri Sedang Dirawat",
        category: "Dalam Pemeliharaan",
        status: "Under maintenance",
        kicker: "RUANG PAMER · 01 / 03",
        headline: "Karya pilihan sedang disiapkan kembali.",
        desc: "Halaman proyek ini sedang dalam pemeliharaan agar setiap studi kasus nantinya tampil utuh, jernih, dan mudah ditelusuri.",
        tagline: "Pembaruan materi & kurasi studi kasus sedang berlangsung.",
      },
      {
        slug: "maintenance-apps",
        num: "02",
        name: "Slot Aplikasi Web",
        category: "Segera Hadir",
        status: "Dalam antrean",
        kicker: "RUANG PAMER · 02 / 03",
        headline: "Arsip antarmuka aplikasi sedang dirapikan.",
        desc: "Dokumentasi alur pengguna, interaksi mikro, dan tampilan antarmuka aplikasi akan dipajang di bingkai ini.",
        tagline: "Dokumentasi alur & interaksi aplikasi akan tampil di sini.",
      },
      {
        slug: "maintenance-editorial",
        num: "03",
        name: "Slot Situs Editorial",
        category: "Segera Hadir",
        status: "Dalam antrean",
        kicker: "RUANG PAMER · 03 / 03",
        headline: "Eksplorasi tipografi & tata letak web.",
        desc: "Kumpulan situs editorial dan halaman produk yang mengutamakan proporsi, ritme baca, dan ketenangan visual.",
        tagline: "Koleksi situs web dengan fokus ritme visual & proporsi.",
      },
    ],
    en: [
      {
        slug: "maintenance-main",
        num: "01",
        name: "Gallery Under Maintenance",
        category: "Maintenance",
        status: "Under maintenance",
        kicker: "EXHIBITION · 01 / 03",
        headline: "Selected works are currently being prepared.",
        desc: "This gallery is under maintenance while full case studies are curated and refined to meet the standard of the rest of the site.",
        tagline: "Curating case studies and preparing live previews.",
      },
      {
        slug: "maintenance-apps",
        num: "02",
        name: "Web App Slot",
        category: "Coming Soon",
        status: "Queued",
        kicker: "EXHIBITION · 02 / 03",
        headline: "Product interface studies are being archived.",
        desc: "Detailed walkthroughs of user flows, clear interactions, and calm web workspaces will live inside this frame.",
        tagline: "Product flow studies and interface details will live here.",
      },
      {
        slug: "maintenance-editorial",
        num: "03",
        name: "Editorial Web Slot",
        category: "Coming Soon",
        status: "Queued",
        kicker: "EXHIBITION · 03 / 03",
        headline: "Typography and proportion studies.",
        desc: "Editorial websites and brand experiences focused on breathable pacing, visual clarity, and timeless restraint.",
        tagline: "Editorial websites shaped around proportion and visual calm.",
      },
    ],
  };

  const heroText = {
    id: {
      first: "Saat setiap layar",
      prefix: "terasa ",
      suffix: "",
      words: ["begitu ringan.", "begitu alami.", "begitu indah."],
    },
    en: {
      first: "Where every screen",
      prefix: "feels ",
      suffix: "",
      words: ["effortless.", "intuitive.", "timeless."],
    },
  };

  const techStack = {
    en: {
      fundamentalsLabel: "Core Fundamentals",
      fundamentals: [
        { id: "html", code: "HTML5", label: "HTML5" },
        { id: "css", code: "CSS3", label: "CSS3" },
        { id: "js", code: "JS", label: "JavaScript" },
        { id: "ts", code: "TS", label: "TypeScript" },
      ],
      devices: [
        {
          id: "mobile",
          label: "Mobile",
          px: 390,
          framePct: 52,
          chromeLabel: "iOS & Android",
          sub: "iOS & Android",
          items: [
            { id: "flutter", name: "Flutter", tag: "Cross-Platform" },
            { id: "kotlin", name: "Kotlin", tag: "Native Android" },
            { id: "react-native", name: "React Native", tag: "JS / TS Native" },
          ],
        },
        {
          id: "web",
          label: "Web",
          px: 1024,
          framePct: 78,
          chromeLabel: "yuprananda.dev",
          sub: "Browser & Responsive",
          items: [
            { id: "react", name: "React", tag: "UI Library" },
            { id: "vue", name: "Vue", tag: "UI Framework" },
            { id: "svelte", name: "Svelte", tag: "UI Compiler" },
            { id: "tailwind", name: "Tailwind CSS", tag: "Styling" },
            { id: "shadcn", name: "shadcn/ui", tag: "Components" },
          ],
        },
        {
          id: "desktop",
          label: "Desktop",
          px: 1440,
          framePct: 100,
          chromeLabel: "Yu Studio.app",
          sub: "Web-Powered App",
          items: [
            { id: "electron", name: "Electron", tag: "Cross-OS App" },
            { id: "tauri", name: "Tauri", tag: "Web UI App" },
          ],
        },
      ],
    },
    id: {
      fundamentalsLabel: "Fondasi Utama",
      fundamentals: [
        { id: "html", code: "HTML5", label: "HTML5" },
        { id: "css", code: "CSS3", label: "CSS3" },
        { id: "js", code: "JS", label: "JavaScript" },
        { id: "ts", code: "TS", label: "TypeScript" },
      ],
      devices: [
        {
          id: "mobile",
          label: "Mobile",
          px: 390,
          framePct: 52,
          chromeLabel: "iOS & Android",
          sub: "iOS & Android",
          items: [
            { id: "flutter", name: "Flutter", tag: "Lintas Platform" },
            { id: "kotlin", name: "Kotlin", tag: "Android Native" },
            { id: "react-native", name: "React Native", tag: "JS / TS Native" },
          ],
        },
        {
          id: "web",
          label: "Web",
          px: 1024,
          framePct: 78,
          chromeLabel: "yuprananda.dev",
          sub: "Browser & Responsif",
          items: [
            { id: "react", name: "React", tag: "UI Library" },
            { id: "vue", name: "Vue", tag: "UI Framework" },
            { id: "svelte", name: "Svelte", tag: "UI Compiler" },
            { id: "tailwind", name: "Tailwind CSS", tag: "Styling" },
            { id: "shadcn", name: "shadcn/ui", tag: "Komponen" },
          ],
        },
        {
          id: "desktop",
          label: "Desktop",
          px: 1440,
          framePct: 100,
          chromeLabel: "Yu Studio.app",
          sub: "Aplikasi Desktop",
          items: [
            { id: "electron", name: "Electron", tag: "Aplikasi Desktop" },
            { id: "tauri", name: "Tauri", tag: "Web UI Desktop" },
          ],
        },
      ],
    },
  };

  const contactMeta = {
    en: {
      titleMuted: "Let\u2019s make it",
      titleFocus: "beautiful",
      metaSpecs: [
        { label: "Status", value: "Open \u00b7 Remote", live: true },
        { label: "Response", value: "Within 24 hours" },
      ],
      windowTitle: "New Message",
      toLabel: "To",
      copyLabel: "Copy",
      copiedLabel: "Copied",
      subjectPlaceholder: "Subject",
      defaultSubject: "Let us discuss a project",
      bodyPlaceholder: "Write your message here...",
      ghostPhrases: [
        "Hi Yu, let\u2019s craft a clean product interface together...",
        "Hi Yu, we\u2019re looking for a frontend developer for our web app...",
        "Hi Yu, I\u2019d love to collaborate on a thoughtful new design...",
      ],
      ctaLabel: "Send",
      clearLabel: "Discard draft",
      profilesLabel: "Profiles",
    },
    id: {
      titleMuted: "Mari buat",
      titleFocus: "lebih indah",
      metaSpecs: [
        { label: "Status", value: "Terbuka \u00b7 Remote", live: true },
        { label: "Respons", value: "Dalam 24 jam" },
      ],
      windowTitle: "Pesan Baru",
      toLabel: "Kepada",
      copyLabel: "Salin",
      copiedLabel: "Tersalin",
      subjectPlaceholder: "Subjek",
      defaultSubject: "Diskusi proyek baru",
      bodyPlaceholder: "Tulis pesan Anda di sini...",
      ghostPhrases: [
        "Halo Yu, mari bangun antarmuka produk yang rapi bersama...",
        "Halo Yu, kami mencari frontend developer untuk aplikasi web...",
        "Halo Yu, saya ingin berdiskusi tentang kolaborasi desain...",
      ],
      ctaLabel: "Kirim",
      clearLabel: "Hapus draf",
      profilesLabel: "Profil",
    },
  };

  const featuredProjects = [
    {
      id: "rehearsal",
      device: "laptop",
      name: "Rehearsal",
      studio: "MangMengMong Studio",
      url: "https://mangmengmong-studio.github.io/page-rehearsal/",
      urlDisplay: "mangmengmong-studio.github.io/page-rehearsal",
      ctaLabel: {
        en: "Visit live site",
        id: "Kunjungi situs",
      },
      preview: "assets/images/rehearsal-hero-ella.webp",
      previewAlt: {
        en: "Rehearsal visual novel website \u2014 Ella CG opening screen",
        id: "Situs visual novel Rehearsal \u2014 layar pembuka CG Ella",
      },
      eyebrow: {
        en: "Selected work \u00b7 Visual novel web",
        id: "Karya pilihan \u00b7 Web visual novel",
      },
      titleMuted: "MangMengMong Studio",
      titleInk: "Rehearsal",
      description: {
        en: "A bilingual promotional site for MangMengMong Studio \u2014 atmospheric CG scenes, tactile notebook modals, and calm pacing.",
        id: "Situs promosional dua bahasa untuk MangMengMong Studio \u2014 latar CG atmosferik, modal bergaya buku catatan, dan ritme visual yang tenang.",
      },
      gallery: [
        [
          "assets/images/rehearsal-hero-ella.webp",
          "Opening Stage \u00b7 Ella",
          "Layar Pembuka \u00b7 Ella",
          "Layered CG backdrop, release update card, and character quote",
          "Latar CG berlapis, kartu pembaruan rilis, dan kutipan karakter",
        ],
        [
          "assets/images/rehearsal-hero-manda.webp",
          "Scene Switcher \u00b7 Manda",
          "Pengganti Latar \u00b7 Manda",
          "Crossfading CG scenery paired with live dialogue switching",
          "Transisi halus antar latar CG seiring pergantian dialog",
        ],
        [
          "assets/images/rehearsal-story.webp",
          "Story Modal \u00b7 Notebook",
          "Modal Cerita \u00b7 Buku Catatan",
          "Ruled-paper dialog sheet with washi tape and soft blur",
          "Lembar dialog bergaris kertas dengan detail selotip dan latar kabur",
        ],
        [
          "assets/images/rehearsal-gallery.webp",
          "Atmosphere Grid \u00b7 Polaroids",
          "Galeri Suasana \u00b7 Polaroid",
          "Tilted polaroid film frames opening into full illustration views",
          "Bingkai film polaroid miring yang membuka pratinjau penuh",
        ],
      ],
    },
    {
      id: "jikanda",
      device: "desktop",
      name: "Jikanda",
      studio: {
        en: "Desktop Focus Companion",
        id: "Aplikasi Fokus Desktop",
      },
      url: "https://github.com/yuprananda/jikanda",
      urlDisplay: "github.com/yuprananda/jikanda",
      ctaLabel: {
        en: "View on GitHub",
        id: "Lihat di GitHub",
      },
      preview: "assets/images/jikanda-focus.webp",
      previewAlt: {
        en: "Jikanda desktop focus companion \u2014 dark Deep Focus workspace",
        id: "Aplikasi fokus desktop Jikanda \u2014 ruang Deep Focus mode gelap",
      },
      eyebrow: {
        en: "Selected work \u00b7 Desktop app",
        id: "Karya pilihan \u00b7 Aplikasi desktop",
      },
      titleInk: "Jikanda",
      description: {
        en: "A calm, local-first desktop focus timer \u2014 Pomodoro, Deep Focus, Flow, floating mini timer, and shareable PNG session cards.",
        id: "Timer fokus desktop yang tenang dan bekerja luring \u2014 mode Pomodoro, Deep Focus, Flow, timer mini melayang, serta ekspor kartu PNG.",
      },
      gallery: [
        [
          "assets/images/jikanda-focus.webp",
          "Deep Focus \u00b7 Dark Workspace",
          "Deep Focus \u00b7 Tema Gelap",
          "50-minute countdown ring paired with session tasks and minimal controls",
          "Cincin hitung mundur 50 menit bersama daftar tugas dan kontrol ringkas",
        ],
        [
          "assets/images/jikanda-focus-light.webp",
          "Pomodoro \u00b7 Light Theme",
          "Pomodoro \u00b7 Tema Terang",
          "25/5 focus cadence styled in a quiet monochrome paper palette",
          "Ritme fokus 25/5 dalam palet monokrom terang yang lapang",
        ],
        [
          "assets/images/jikanda-mini.webp",
          "Mini Timer \u00b7 Always on Top",
          "Timer Mini \u00b7 Melayang",
          "Compact draggable companion window keeping the active session within reach",
          "Jendela ringkas yang tetap mudah diakses saat bekerja di aplikasi lain",
        ],
        [
          "assets/images/jikanda-history.webp",
          "Session History \u00b7 Insights",
          "Riwayat Sesi \u00b7 Ringkasan",
          "Local 7-day focus summary with direct session editing and zero cloud tracking",
          "Ringkasan fokus 7 hari lokal dengan suntingan sesi tanpa pelacakan awan",
        ],
        [
          "assets/images/jikanda-cards.webp",
          "Card Studio \u00b7 Offline Export",
          "Studio Kartu \u00b7 Ekspor PNG",
          "Story 9:16 and Feed 4:5 achievement card builder exported directly to disk",
          "Pembuat kartu pencapaian Story 9:16 dan Feed 4:5 yang disimpan lokal",
        ],
      ],
    },
    {
      id: "aku-oregairu",
      device: "mobile",
      name: "Aku Oregairu",
      studio: {
        en: "Progressive Web App \u00b7 Reader",
        id: "Aplikasi Web Progresif (PWA)",
      },
      url: "https://muhammadyusufprananda.github.io/aku-oregairu/",
      urlDisplay: "muhammadyusufprananda.github.io/aku-oregairu",
      ctaLabel: {
        en: "Open web app",
        id: "Buka aplikasi",
      },
      preview: "assets/images/oregairu-home.webp",
      previewAlt: {
        en: "Aku Oregairu PWA mobile app \u2014 volume collection screen",
        id: "Aplikasi PWA mobile Aku Oregairu \u2014 layar koleksi volume",
      },
      eyebrow: {
        en: "Selected work \u00b7 Mobile PWA",
        id: "Karya pilihan \u00b7 PWA Mobile",
      },
      titleInk: "Aku Oregairu",
      description: {
        en: "An installable bilingual light novel reader PWA \u2014 volume shelves, chapter tracking, customizable paper themes, and calm mobile typography.",
        id: "PWA pembaca novel ringan dwibahasa yang bisa dipasang di ponsel \u2014 rak koleksi volume, riwayat baca, tema kertas, dan tipografi nyaman.",
      },
      gallery: [
        [
          "assets/images/oregairu-home.webp",
          "Volume Collection \u00b7 Home",
          "Koleksi Volume \u00b7 Beranda",
          "Atmospheric Yukino hero stage introducing the bilingual Oregairu volume library",
          "Tampilan utama beranda dengan sampul atmosferik dan daftar koleksi volume",
        ],
        [
          "assets/images/oregairu-volume.webp",
          "Volume Detail \u00b7 Chapter Index",
          "Detail Volume \u00b7 Daftar Bab",
          "Clean chapter index with instant Indonesian and English language switching",
          "Daftar bab rapi dengan pilihan bahasa Indonesia dan Inggris dalam satu ketukan",
        ],
        [
          "assets/images/oregairu-chapter.webp",
          "Chapter Reader \u00b7 Paper Theme",
          "Mode Baca \u00b7 Tema Kertas",
          "Paginated reading view in warm paper palette with serif typography and progress indicator",
          "Halaman baca terpaginasi dengan tema kertas hangat, huruf serif, dan penanda progres",
        ],
        [
          "assets/images/oregairu-reader-alt.webp",
          "Reader Settings \u00b7 Typography & Themes",
          "Pengaturan Baca \u00b7 Tipografi & Tema",
          "Floating sheet for font size, serif/sans-serif family, line height, alignment, and theme mode",
          "Panel pengaturan ukuran huruf, jenis font, spasi baris, perataan, dan tema tampilan",
        ],
        [
          "assets/images/oregairu-reader.webp",
          "Illustration Viewer \u00b7 Lightbox",
          "Penampil Ilustrasi \u00b7 Layar Penuh",
          "Zoomable full-bleed cover and novel illustrations integrated smoothly inside the reader flow",
          "Ilustrasi novel yang terintegrasi rapi di dalam alur baca bersama kontrol navigasi bab",
        ],
      ],
    },
  ];

  const thoughtsData = {
    en: {
      headingMuted: "Thoughts in",
      headingInk: "dialogue.",
      sidebarTitle: "Chats",
      sidebarSub: "Pick a topic",
      typingStatus: "typing\u2026",
      replayLabel: "Replay dialog",
      backLabel: "Back to chats",
      sidebarHint: "Tap a chat to open",
      humanName: "Yu \u00b7 Developer",
      contacts: [
        {
          id: "ai-developer",
          icon: "sparkle",
          name: "AI & Developer",
          roleStatus: "online \u00b7 AI assists, Yu leads",
          peerName: "AI",
          time: "10:15",
          preview: "Taste, touch, and direction stay mine.",
          dayTag: "Today \u00b7 AI & Developer",
          footerNote: "AI assists \u2014 taste & direction stay mine.",
          messages: [
            {
              role: "peer",
              time: "10:12",
              text: "AI can generate interfaces and code in seconds now. Where does that leave your role as a developer?",
            },
            {
              role: "human",
              time: "10:13",
              parts: [
                "I never forget ",
                { strong: "fundamentals" },
                ", I stand by my ",
                { strong: "philosophy" },
                ", and I don\u2019t reject ",
                { strong: "progress" },
                ".",
              ],
            },
            {
              role: "peer",
              time: "10:13",
              text: "So you don\u2019t push AI away from your workflow?",
            },
            {
              role: "human",
              time: "10:14",
              parts: [
                "Not at all. ",
                { strong: "AI is an assistant" },
                " for exploring options and speeding up repetition\u2014yet without fundamentals, we only accept whatever it outputs.",
              ],
            },
            {
              role: "peer",
              time: "10:14",
              text: "Then what makes an interface feel genuinely crafted rather than generated?",
            },
            {
              role: "human",
              time: "10:15",
              parts: [
                "Human care. Speed comes from tools, while ",
                { strong: "taste, touch, and direction" },
                " remain decided by me as a developer.",
              ],
            },
          ],
        },
        {
          id: "why-frontend",
          icon: "code",
          name: "Why Frontend?",
          roleStatus: "online \u00b7 Bridge of user & system",
          peerName: "Reader",
          time: "10:22",
          preview: "Frontend bridges logic and human care.",
          dayTag: "Today \u00b7 Why Frontend Matters",
          footerNote: "Frontend guards the human experience.",
          messages: [
            {
              role: "peer",
              time: "10:20",
              text: "With no-code tools and UI generators everywhere, does frontend development still matter?",
            },
            {
              role: "human",
              time: "10:20",
              parts: [
                "Even more than before. A screen that merely renders is very different from an ",
                { strong: "interface real people enjoy using" },
                ".",
              ],
            },
            {
              role: "peer",
              time: "10:21",
              text: "Can\u2019t AI generate responsive components quickly too?",
            },
            {
              role: "human",
              time: "10:21",
              parts: [
                "For common patterns, yes. Yet ",
                { strong: "real state, accessibility, edge cases, and performance" },
                " still need someone who truly understands the browser.",
              ],
            },
            {
              role: "peer",
              time: "10:22",
              text: "So what defines a frontend developer\u2019s real value today?",
            },
            {
              role: "human",
              time: "10:22",
              parts: [
                "Being the ",
                { strong: "guardian of user experience" },
                "\u2014the bridge that makes complex systems feel ",
                { strong: "simple, fast, and human" },
                ".",
              ],
            },
          ],
        },
        {
          id: "frontend-focus",
          icon: "layers",
          name: "Why Only Frontend",
          roleStatus: "online \u00b7 Beyond generic screens",
          peerName: "Reader",
          time: "10:30",
          preview: "Crafted by a human with full attention.",
          dayTag: "Today \u00b7 Choosing Frontend",
          footerNote: "Spending extra care where users touch.",
          messages: [
            {
              role: "peer",
              time: "10:28",
              text: "AI can help with frontend, backend, even deployment now. Why still brand yourself strictly as a frontend developer?",
            },
            {
              role: "human",
              time: "10:28",
              parts: [
                "In this AI era, anyone can ship a product\u2014",
                { strong: "I can do front, back, and deploy too" },
                " with AI helping along the way.",
              ],
            },
            {
              role: "peer",
              time: "10:29",
              text: "Then why double down on branding yourself around frontend?",
            },
            {
              role: "human",
              time: "10:29",
              parts: [
                "The longer I build, the more I feel the need to ",
                { strong: "spend more time on the front" },
                ", because too many products now look ",
                { strong: "generic" },
                ".",
              ],
            },
            {
              role: "peer",
              time: "10:30",
              text: "What do you want people to feel from that choice?",
            },
            {
              role: "human",
              time: "10:30",
              parts: [
                "I want to help change that\u2014so the ",
                { strong: "taste and touch" },
                " I put in make people feel it was truly ",
                { strong: "crafted by a human with full care" },
                ".",
              ],
            },
          ],
        },
      ],
    },
    id: {
      headingMuted: "Pemikiran dalam",
      headingInk: "ruang dialog.",
      sidebarTitle: "Obrolan",
      sidebarSub: "Pilih topik",
      typingStatus: "sedang mengetik\u2026",
      replayLabel: "Putar ulang dialog",
      backLabel: "Kembali ke obrolan",
      sidebarHint: "Ketuk obrolan untuk membuka",
      humanName: "Yu \u00b7 Developer",
      contacts: [
        {
          id: "ai-developer",
          icon: "sparkle",
          name: "AI & Developer",
          roleStatus: "online \u00b7 AI pembantu, Yu penentu",
          peerName: "AI",
          time: "10:15",
          preview: "Rasa, sentuhan, dan arah tetap milik saya.",
          dayTag: "Hari ini \u00b7 AI & Developer",
          footerNote: "AI pembantu \u2014 rasa & arah tetap milik Yu.",
          messages: [
            {
              role: "peer",
              time: "10:12",
              text: "AI sekarang bisa menyusun tampilan dan kode dalam hitungan detik. Di mana posisimu sebagai developer?",
            },
            {
              role: "human",
              time: "10:13",
              parts: [
                "Saya orang yang tidak melupakan ",
                { strong: "fundamental" },
                ", berpendirian dengan ",
                { strong: "filosofi" },
                " yang dimiliki, dan tidak menolak ",
                { strong: "perkembangan" },
                ".",
              ],
            },
            {
              role: "peer",
              time: "10:13",
              text: "Jadi kamu tidak anti bekerja berdampingan dengan AI?",
            },
            {
              role: "human",
              time: "10:14",
              parts: [
                "Sama sekali tidak. ",
                { strong: "AI adalah pembantu" },
                " untuk draf dan eksplorasi\u2014namun tanpa fundamental, kita hanya menerima mentah-mentah keluarannya.",
              ],
            },
            {
              role: "peer",
              time: "10:14",
              text: "Lalu apa yang membuat karya developer tetap punya nyawa dan karakter?",
            },
            {
              role: "human",
              time: "10:15",
              parts: [
                "Kepekaan manusia. Alat memberi kecepatan, tapi yang menentukan ",
                { strong: "rasa, sentuhan, dan arah" },
                " tetaplah saya sebagai developer.",
              ],
            },
          ],
        },
        {
          id: "why-frontend",
          icon: "code",
          name: "Kenapa Frontend?",
          roleStatus: "online \u00b7 Jembatan manusia & sistem",
          peerName: "Tanya",
          time: "10:22",
          preview: "Frontend menjaga jembatan sistem & rasa.",
          dayTag: "Hari ini \u00b7 Pentingnya Frontend",
          footerNote: "Frontend menjaga pengalaman nyata pengguna.",
          messages: [
            {
              role: "peer",
              time: "10:20",
              text: "Sekarang sudah banyak no-code dan generator UI. Apakah peran frontend developer masih sepenting dulu?",
            },
            {
              role: "human",
              time: "10:20",
              parts: [
                "Justru makin penting. Tampilan yang sekadar jadi berbeda jauh dengan ",
                { strong: "antarmuka yang nyaman dipakai manusia sungguhan" },
                ".",
              ],
            },
            {
              role: "peer",
              time: "10:21",
              text: "Bukannya AI juga bisa menyusun komponen responsif dengan cepat?",
            },
            {
              role: "human",
              time: "10:21",
              parts: [
                "Bisa untuk pola umum. Tapi ",
                { strong: "state nyata, aksesibilitas, edge case, dan performa" },
                " tetap butuh orang yang paham betul cara browser bekerja.",
              ],
            },
            {
              role: "peer",
              time: "10:22",
              text: "Jadi nilai utama seorang frontend developer hari ini apa?",
            },
            {
              role: "human",
              time: "10:22",
              parts: [
                "Menjadi ",
                { strong: "penjaga pengalaman pengguna" },
                "\u2014jembatan yang membuat logika sistem terasa ",
                { strong: "sederhana, cepat, dan manusiawi" },
                ".",
              ],
            },
          ],
        },
        {
          id: "frontend-focus",
          icon: "layers",
          name: "Fokus Frontend",
          roleStatus: "online \u00b7 Melawan tampilan generik",
          peerName: "Tanya",
          time: "10:30",
          preview: "Dibuat manusia dengan perhatian penuh.",
          dayTag: "Hari ini \u00b7 Kenapa Hanya Frontend",
          footerNote: "Memberi perhatian penuh di sisi terdepan.",
          messages: [
            {
              role: "peer",
              time: "10:28",
              text: "AI bisa bantu front, back, sampai deploy. Kenapa kamu tetap memilih membranding diri sebagai frontend dev saja?",
            },
            {
              role: "human",
              time: "10:28",
              parts: [
                "Di era AI ini semua orang bisa membuat produk\u2014",
                { strong: "saya pun bisa" },
                " mengerjakan front, back, hingga deploy dengan bantuan AI.",
              ],
            },
            {
              role: "peer",
              time: "10:29",
              text: "Lalu kenapa justru tetap fokus membranding diri di bagian front?",
            },
            {
              role: "human",
              time: "10:29",
              parts: [
                "Makin ke sini saya justru merasa perlu ",
                { strong: "menghabiskan waktu lebih lama di front" },
                ", karena sekarang semakin banyak ",
                { strong: "tampilan yang terasa generik" },
                ".",
              ],
            },
            {
              role: "peer",
              time: "10:30",
              text: "Harapan apa yang ingin kamu bawa lewat fokus itu?",
            },
            {
              role: "human",
              time: "10:30",
              parts: [
                "Saya ingin ikut membantu mengubahnya\u2014agar ",
                { strong: "rasa dan sentuhan" },
                " yang saya beri membuat orang merasa karya ini ",
                { strong: "dibuat manusia dengan perhatian penuh" },
                ".",
              ],
            },
          ],
        },
      ],
    },
  };

  Object.assign(window.Portfolio, {
    copy,
    galleryImages,
    serviceGroups,
    projects,
    featuredProjects,
    techStack,
    heroText,
    thoughtsData,
    contactMeta,
  });
})();
