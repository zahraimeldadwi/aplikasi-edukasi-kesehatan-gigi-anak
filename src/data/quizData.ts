import { QuizQuestion } from '../types';

export const GRAND_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Apa fungsi utama dari gigi geraham di dalam mulut kita?',
    options: [
      'Memotong makanan menjadi kecil',
      'Merobek makanan yang liat',
      'Mengunyah dan menghaluskan makanan',
      'Membantu mata melihat dengan jelas',
    ],
    correctIndex: 2,
    explanation:
      'Gigi geraham memiliki permukaan yang lebar dan bergelombang khusus untuk mengunyah dan menghaluskan makanan sebelum ditelan.',
    category: 'Anatomi Gigi',
    icon: '🦷',
  },
  {
    id: 2,
    question: 'Gigi apakah yang berada di bagian paling depan dan berfungsi untuk memotong makanan?',
    options: ['Gigi geraham', 'Gigi seri', 'Gigi taring', 'Gigi bungsu'],
    correctIndex: 1,
    explanation: 'Gigi seri berbentuk pipih seperti pahat kecil di depan mulut, berguna untuk memotong atau menggigit makanan.',
    category: 'Anatomi Gigi',
    icon: '🦷',
  },
  {
    id: 3,
    question: 'Gigi taring memiliki ujung yang runcing. Apa fungsi utama gigi taring?',
    options: ['Merobek makanan', 'Menghisap air minum', 'Mencium aroma makanan', 'Mengunyah makanan halus'],
    correctIndex: 0,
    explanation: 'Ujung gigi taring yang runcing berguna untuk merobek makanan seperti daging atau roti yang kenyal.',
    category: 'Anatomi Gigi',
    icon: '🦷',
  },
  {
    id: 4,
    question: 'Apa yang menyebabkan karies atau gigi berlubang?',
    options: [
      'Sering minum air putih hangat',
      'Terlalu sering makan manis dan jarang membersihkan gigi',
      'Sering makan sayuran dan buah segar',
      'Menyikat gigi dua kali sehari',
    ],
    correctIndex: 1,
    explanation:
      'Kuman di mulut memakan sisa gula dari makanan manis lalu menghasilkan asam yang perlahan mengikis gigi hingga berlubang.',
    category: 'Karies Gigi',
    icon: '👾',
  },
  {
    id: 5,
    question: 'Apa itu plak gigi?',
    options: [
      'Lapisan pelindung yang membuat gigi berkilau',
      'Lapisan tipis lengket berisi kuman yang menempel di gigi',
      'Makanan yang disimpan di dalam saku',
      'Vitamin cair untuk memperkuat gusi',
    ],
    correctIndex: 1,
    explanation:
      'Plak adalah lapisan kotoran dan jutaan kuman yang menempel di gigi jika gigi tidak dibersihkan dengan benar.',
    category: 'Plak & Karang Gigi',
    icon: '🦠',
  },
  {
    id: 6,
    question: 'Jika karang gigi sudah menempel keras di gigi, apa yang sebaiknya kita lakukan?',
    options: [
      'Mencungkilnya sendiri dengan jarum atau peniti',
      'Membiarkannya bertambah tebal',
      'Minta bantuan orang tua untuk diperiksa ke dokter gigi',
      'Menggosoknya sekuat tenaga dengan sikat kawat',
    ],
    correctIndex: 2,
    explanation:
      'Karang gigi tidak boleh dicungkil sendiri karena berbahaya melukai gusi. Dokter gigi memiliki alat khusus yang aman.',
    category: 'Plak & Karang Gigi',
    icon: '🪨',
  },
  {
    id: 7,
    question: 'Apa salah satu tanda gusi mengalami peradangan (gingivitis)?',
    options: [
      'Gusi berwarna merah muda kenyal dan segar',
      'Gusi tampak merah tua, bengkak, dan mudah berdarah',
      'Gigi tiba-tiba tumbuh sayap',
      'Napas terasa sangat wangi seperti mint',
    ],
    correctIndex: 1,
    explanation:
      'Gusi yang meradang akan terlihat memerah, bengkak, dan bisa mengeluarkan darah saat menyikat gigi akibat tumpukan kuman plak.',
    category: 'Kesehatan Gusi',
    icon: '🩸',
  },
  {
    id: 8,
    question: 'Jika gusi sedikit berdarah saat menyikat gigi, apa yang sebaiknya dilakukan?',
    options: [
      'Berhenti sama sekali menyikat gigi selamanya',
      'Tetap bersihkan gigi dengan lembut dan gunakan sikat berbulu halus',
      'Menyikat gigi lebih keras lagi sampai sakit',
      'Menutup mulut rapat-rapat dan tidak makan',
    ],
    correctIndex: 1,
    explanation:
      'Gusi berdarah bukan alasan berhenti menyikat gigi. Bersihkan gigi dengan lembut agar kuman penyebab radang gusi hilang.',
    category: 'Kesehatan Gusi',
    icon: '🩸',
  },
  {
    id: 9,
    question: 'Berapa lama waktu yang dianjurkan untuk menyikat seluruh bagian gigi?',
    options: ['10 detik', '30 detik', 'Sekitar 2 menit', '15 menit'],
    correctIndex: 2,
    explanation:
      'Menyikat gigi selama kurang lebih 2 menit memastikan semua sisi luar, dalam, dan kunyah gigi dibersihkan dengan tuntas.',
    category: 'Cara Menyikat Gigi',
    icon: '⏰',
  },
  {
    id: 10,
    question: 'Kapan dua waktu paling penting untuk menyikat gigi setiap hari?',
    options: [
      'Hanya saat mau mandi sore',
      'Setelah bangun tidur dan sebelum makan sarapan',
      'Setelah sarapan pagi dan sebelum tidur malam',
      'Hanya saat hendak pergi ke pesta ulang tahun',
    ],
    correctIndex: 2,
    explanation:
      'Menyikat gigi setelah sarapan membersihkan sisa makanan pagi, dan menyikat sebelum tidur melindungi gigi dari kuman sepanjang malam.',
    category: 'Cara Menyikat Gigi',
    icon: '🪥',
  },
  {
    id: 11,
    question: 'Apa fungsi kandungan fluoride pada pasta gigi anak?',
    options: [
      'Membuat warna gigi menjadi pelangi',
      'Memperkuat lapisan email gigi dan melindungi dari karies',
      'Membuat rasa pasta gigi menjadi pedas',
      'Menggantikan fungsi air minum',
    ],
    correctIndex: 1,
    explanation:
      'Fluoride adalah mineral pelindung yang memperkuat lapisan luar gigi agar tidak mudah larut oleh asam buatan kuman.',
    category: 'Pasta Gigi',
    icon: '🧪',
  },
  {
    id: 12,
    question: 'Apa yang harus dilakukan dengan busa pasta gigi setelah selesai menyikat gigi?',
    options: [
      'Ditelan sampai habis ke dalam perut',
      'Dibuang atau diludahkan lalu berkumur air bersih',
      'Dibiarkan di dalam mulut berjam-jam',
      'Diusapkan ke mata dan dahi',
    ],
    correctIndex: 1,
    explanation:
      'Pasta gigi tidak boleh ditelan! Setelah menyikat gigi, buang busanya ke wastafel lalu berkumurlah dengan air bersih secukupnya.',
    category: 'Pasta Gigi',
    icon: '💧',
  },
  {
    id: 13,
    question: 'Manakah kelompok makanan dan minuman yang paling baik dan menyehatkan bagi gigi?',
    options: [
      'Permen manis, permen karet, dan minuman soda',
      'Susu, keju, sayuran hijau, buah apel, dan air putih',
      'Kue cokelat, sirup kental, dan es krim manis',
      'Ciki gurih asin dan kerupuk',
    ],
    correctIndex: 1,
    explanation:
      'Susu dan keju kaya kalsium untuk gigi, sayur dan buah kaya serat yang membersihkan gigi, serta air putih menjaga mulut tetap basah.',
    category: 'Makanan Sehat',
    icon: '🍎',
  },
  {
    id: 14,
    question: 'Apa yang harus dilakukan saat mulutmu sedang mengalami sariawan?',
    options: [
      'Makan keripik yang sangat pedas dan asam',
      'Mengorek luka sariawan dengan tangan kotor',
      'Cukup minum air putih, makan makanan bergizi, dan jaga kebersihan mulut',
      'Tidak mau minum seharian penuh',
    ],
    correctIndex: 2,
    explanation:
      'Saat sariawan, minum banyak air putih dan makan buah bergizi membantu luka lekas sembuh. Hindari makanan pedas yang membuat perih.',
    category: 'Sariawan',
    icon: '🌋',
  },
  {
    id: 15,
    question: 'Selain gigi, bagian mana di dalam mulut yang juga sebaiknya dibersihkan dengan lembut saat menyikat gigi?',
    options: ['Lidah', 'Hidung', 'Telinga', 'Alis'],
    correctIndex: 0,
    explanation:
      'Banyak kuman dan sisa makanan yang menempel di permukaan lidah dan menyebabkan bau mulut. Bersihkan lidah lembut dari belakang ke depan.',
    category: 'Napas Segar',
    icon: '👅',
  },
  {
    id: 16,
    question: 'Kebiasaan manakah di bawah ini yang dapat merusak gigi pahlawanmu?',
    options: [
      'Minum air putih saat haus',
      'Menggunakan gigi untuk membuka bungkus snack atau tutup botol',
      'Makan wortel dan buah segar',
      'Menyikat gigi secara teratur',
    ],
    correctIndex: 1,
    explanation:
      'Gigi bukan alat gunting atau pembuka botol! Menggigit benda keras atau membuka kemasan plastik dapat membuat gigi retak atau patah.',
    category: 'Kebiasaan Baik',
    icon: '⚠️',
  },
  {
    id: 17,
    question: 'Berapa kali sebaiknya kita memeriksakan gigi ke dokter gigi?',
    options: [
      'Hanya kalau gigi sudah copot semua',
      'Secara rutin minimal setiap 6 bulan sekali',
      '10 tahun sekali saja',
      'Tidak perlu sama sekali jika tidak sakit',
    ],
    correctIndex: 1,
    explanation:
      'Pemeriksaan rutin setiap 6 bulan membantu dokter gigi menemukan lubang kecil sejak dini sebelum gigi terasa sakit.',
    category: 'Pemeriksaan Gigi',
    icon: '🏥',
  },
  {
    id: 18,
    question: 'Kapan kamu harus segera memberitahu orang tua tentang kondisi gigimu?',
    options: [
      'Hanya saat ingin membeli mainan baru',
      'Ketika gigi terasa ngilu, sakit, atau ada gusi yang bengkak',
      'Saat gigi tidak ada masalah sama sekali',
      'Tidak perlu memberi tahu siapapun',
    ],
    correctIndex: 1,
    explanation:
      'Jika gigi sakit, ngilu, atau gusi bengkak dan berdarah, segera beri tahu ayah atau ibu agar bisa dibantu diperiksa ke klinik gigi.',
    category: 'Perawatan Mandiri',
    icon: '🗣️',
  },
  {
    id: 19,
    question: 'Bagaimana gerakan yang benar saat menyikat bagian luar gigi depan?',
    options: [
      'Menggosok kasar ke kiri dan kanan sekuat tenaga',
      'Gerakan melingkar memutar lembut dari arah gusi ke gigi',
      'Mengetuk-ngetuk sikat ke gigi depan',
      'Menggosok hanya selama 2 detik',
    ],
    correctIndex: 1,
    explanation:
      'Gerakan memutar lembut dari batas gusi ke ujung gigi membantu mengangkat plak kuman tanpa melukai gusi yang lembut.',
    category: 'Cara Menyikat Gigi',
    icon: '🪥',
  },
  {
    id: 20,
    question: 'Apakah kita tidak boleh sama sekali memakan kue atau cokelat manis?',
    options: [
      'Boleh, asalkan jangan terlalu sering dan segera berkumur atau sikat gigi setelahnya',
      'Harus makan permen manis 10 bungkus setiap jam',
      'Boleh makan permen sebelum tidur lalu langsung tidur tanpa sikat gigi',
      'Sama sekali tidak boleh tersenyum',
    ],
    correctIndex: 0,
    explanation:
      'Kita boleh menikmati makanan manis, asalkan tidak terlalu sering dan selalu ingat berkumur atau menyikat gigi setelah memakannya.',
    category: 'Makanan Sehat',
    icon: '🍫',
  },
];
