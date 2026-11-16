/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  /** Edit visitor-facing text here. Keep English and Indonesian entries aligned.
   * Arrays in copy.slides: [eyebrow, title, ...body]. Services/process use the named lists below.
   * This is trusted, repository-owned content rendered as HTML: never insert untrusted user input. */
  const copy = {
    en: {
      nav: ["Hello", "Philosophy", "Tech", "Projects", "Contact"],
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
          "Projects",
          "Under maintenance.",
          "Selected case studies are currently being prepared.",
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
      nav: ["Halo", "Filosofi", "Teknologi", "Proyek", "Kontak"],
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
          "Proyek",
          "Under maintenance.",
          "Studi kasus pilihan sedang disiapkan.",
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

  /** Under-maintenance gallery slots for #work. Replace with real case studies when ready. */
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

  Object.assign(window.Portfolio, {
    copy,
    galleryImages,
    serviceGroups,
    projects,
    techStack,
    heroText,
    contactMeta,
  });
})();
