/** Classic deferred script: works with file:// and GitHub Pages. Keep script order in index.html. */
(() => {
  "use strict";
  /** Edit visitor-facing text here. Keep English and Indonesian entries aligned.
   * Arrays in copy.slides: [eyebrow, title, ...body]. Services/process use the named lists below.
   * This is trusted, repository-owned content rendered as HTML: never insert untrusted user input. */
  const copy = {
    en: {
      nav: ["Hello", "Services", "Projects", "Process", "Contact"],
      role: "Independent software engineer",
      hint: "Use the menu or arrows; swipe on mobile",
      slides: [
        [
          "Hey, I\u2019m Yu. Software engineer.",
          "Have an idea?",
          "I build web, mobile, and desktop applications and help businesses put automation and AI to work.",
          "See what I\u2019m building \u2197",
        ],
        ["Useful software starts with real work.", "What I help with\u2026"],
        [
          "From idea to everyday use.",
          "Bicless ERP",
          "A desktop application that helps staffing teams manage employee records, track document expiry dates, and check whether workers meet job requirements.",
          "Built independently|I handle the design and all development of Bicless, bringing employee records, document tracking, and follow-up tasks into one application.",
          "In active use",
        ],
        ["From the first conversation to ongoing care.", "How I work\u2026"],
        [
          "Your next project starts with a conversation.",
          "Let\u2019s build it.",
          "Have an idea or a workflow that could work better? Tell me what you need, and we can explore the right next step.",
          "Available for remote freelance projects and collaborations worldwide.",
        ],
      ],
    },
    id: {
      nav: ["Halo", "Layanan", "Proyek", "Proses", "Kontak"],
      role: "Software engineer independen",
      hint: "Gunakan menu atau panah; geser pada ponsel",
      slides: [
        [
          "Halo, saya Yu. Software engineer.",
          "Punya ide?",
          "Saya membangun aplikasi web, mobile, dan desktop, serta membantu bisnis menerapkan otomasi dan AI.",
          "Lihat yang sedang saya bangun \u2197",
        ],
        [
          "Software bermanfaat berawal dari kebutuhan nyata.",
          "Yang bisa saya bantu\u2026",
        ],
        [
          "Dari ide hingga digunakan sehari-hari.",
          "Bicless ERP",
          "Aplikasi desktop yang membantu tim penyedia tenaga kerja mengelola data karyawan, memantau masa berlaku dokumen, dan memeriksa kelengkapan persyaratan kerja.",
          "Dikembangkan secara mandiri|Saya menangani desain dan seluruh pengembangan Bicless, menyatukan data karyawan, pemantauan dokumen, dan tindak lanjut dalam satu aplikasi.",
          "Sudah digunakan",
        ],
        [
          "Dari diskusi awal hingga perawatan aplikasi.",
          "Cara saya bekerja\u2026",
        ],
        [
          "Proyek berikutnya dimulai dari percakapan.",
          "Mari wujudkan.",
          "Punya ide aplikasi atau pekerjaan yang ingin dipermudah? Ceritakan kebutuhan Anda, lalu kita bahas langkah berikutnya.",
          "Terbuka untuk proyek freelance remote dan kolaborasi di seluruh dunia.",
        ],
      ],
    },
  };

  const galleryImages = [
    [
      "assets/images/bicless-dashboard-real.webp",
      "Operations dashboard",
      "Dashboard operasional",
    ],
    [
      "assets/images/bicless-employees-real.webp",
      "Employee records",
      "Data karyawan",
    ],
    [
      "assets/images/bicless-equipment-real.webp",
      "Equipment & requirements",
      "Alat & persyaratan",
    ],
  ];

  const serviceGroups = {
    id: [
      [
        "Buat aplikasi baru",
        "Punya proses bisnis yang perlu wadah lebih rapi?",
        ["Aplikasi web, mobile & desktop", "Alat internal & dashboard"],
      ],
      [
        "Kurangi kerja manual",
        "Terlalu banyak salin data dan tugas berulang?",
        ["Otomasi & integrasi aplikasi", "Asisten AI & pengolahan dokumen"],
      ],
      [
        "Benahi aplikasi Anda",
        "Aplikasi sudah ada, tapi belum sesuai kebutuhan?",
        ["Tambah fitur yang dibutuhkan", "Perbaiki bug & alur penggunaan"],
      ],
      [
        "Konsultasi teknologi",
        "Punya ide, tapi belum tahu harus mulai dari mana?",
        [
          "Pilihan teknologi & rencana aplikasi",
          "Peluang penerapan AI untuk bisnis",
        ],
      ],
    ],
    en: [
      [
        "Build a new application",
        "Need a better home for your business workflow?",
        ["Web, mobile & desktop apps", "Internal tools & dashboards"],
      ],
      [
        "Cut the manual work",
        "Too much copying data and repeating the same tasks?",
        ["Automation & app integrations", "AI assistants & document workflows"],
      ],
      [
        "Improve your existing app",
        "Already have software that needs some attention?",
        ["Add the features you need", "Fix bugs & awkward workflows"],
      ],
      [
        "Technology consulting",
        "Have an idea, but unsure where to start?",
        [
          "Technology choices & app planning",
          "Practical AI opportunities for your business",
        ],
      ],
    ],
  };

  const projectSamples = {
    id: [
      [
        "Aplikasi mobile",
        "Contoh tempat untuk proyek mobile: jelaskan siapa penggunanya dan kebutuhan yang dibantu.",
        "Yang ditampilkan",
        "Nantinya diisi screenshot aplikasi, fitur utama, dan peran Anda.",
      ],
      [
        "Otomasi alur kerja",
        "Contoh tempat untuk proyek otomasi: jelaskan proses manual yang ingin dipermudah.",
        "Yang ditampilkan",
        "Nantinya diisi alur sebelum dan sesudah, integrasi, dan hasil yang dapat dibuktikan.",
      ],
      [
        "Asisten AI",
        "Contoh tempat untuk proyek AI: jelaskan tugas yang dibantu dan bagaimana pengguna memakainya.",
        "Yang ditampilkan",
        "Nantinya diisi contoh interaksi, sumber informasi, dan batas kemampuan solusi.",
      ],
    ],
    en: [
      [
        "Mobile App",
        "A place for a mobile project: introduce its users and the need it addresses.",
        "What belongs here",
        "Replace with app screenshots, key features, and your role in the project.",
      ],
      [
        "Automation",
        "A place for an automation project: explain the manual process it simplifies.",
        "What belongs here",
        "Replace with the before-and-after workflow, integrations, and verified results.",
      ],
      [
        "AI assistant",
        "A place for an AI project: explain the task it supports and how people use it.",
        "What belongs here",
        "Replace with example interactions, information sources, and the limits of the solution.",
      ],
    ],
  };

  const processSteps = {
    id: [
      [
        "Ceritakan kebutuhan Anda",
        "Ceritakan cara kerja dan kendala Anda. Kita tentukan masalah yang perlu diselesaikan.",
        "Hasil: kebutuhan dan tujuan yang jelas.",
      ],
      [
        "Sepakati rencana",
        "Kita sepakati fitur, perkiraan waktu, dan biaya sebelum pengembangan dimulai.",
        "Hasil: rencana kerja yang disepakati.",
      ],
      [
        "Lihat progres, beri masukan",
        "Coba versi yang saya bangun secara bertahap. Beri masukan untuk menyempurnakan alurnya.",
        "Hasil: aplikasi yang ditinjau bersama.",
      ],
      [
        "Uji dan mulai gunakan",
        "Kita uji alur utama dan perbaiki kendala, lalu serahkan akses dan panduan sesuai kesepakatan.",
        "Hasil: aplikasi siap digunakan dan dikelola.",
      ],
      [
        "Rawat dan kembangkan",
        "Perbaikan bug, pembaruan fitur, dan dukungan setelah rilis sesuai kesepakatan.",
        "Hasil: aplikasi mengikuti kebutuhan bisnis.",
      ],
    ],
    en: [
      [
        "Tell me what you need",
        "Share your workflow and challenges. We identify the problem worth solving.",
        "Outcome: clear needs and priorities.",
      ],
      [
        "Agree on a plan",
        "We agree on features, estimated timing, and cost before development begins.",
        "Outcome: an agreed project plan.",
      ],
      [
        "Try it and share feedback",
        "Try working versions as I build. Your feedback helps refine the workflow.",
        "Outcome: software reviewed together.",
      ],
      [
        "Test and start using it",
        "We test key workflows and fix issues, then hand over access and guidance as agreed.",
        "Outcome: software ready to use and manage.",
      ],
      [
        "Maintain and improve",
        "Bug fixes, feature updates, and post-launch support under an agreed maintenance scope.",
        "Outcome: software that keeps up with your needs.",
      ],
    ],
  };

  const heroText = {
    id: {
      first: "Punya ide?",
      prefix: "Mari kita ",
      suffix: "",
      words: ["wujudkan", "bangun", "kembangkan"],
    },
    en: {
      first: "Have an idea?",
      prefix: "Let&#8217;s make it ",
      suffix: "",
      words: ["real", "work", "happen"],
    },
  };

  Object.assign(window.Portfolio, {
    copy,
    galleryImages,
    serviceGroups,
    projectSamples,
    processSteps,
    heroText,
  });
})();
