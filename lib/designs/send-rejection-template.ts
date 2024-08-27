export const SendRejectionTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih Sudah Melamar di JobsSukabumi</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            padding: 20px;
            margin: 20px auto;
            max-width: 600px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Terima Kasih atas Lamaran Anda</h1>
        <p>Halo {{ name }},</p>
        <p>Terima kasih telah melamar lewat situs JobsSukabumi. Setelah melihat dan mempertimbangkan CV/Resume anda, kami harus memberi tahu bahwa Anda <strong>tidak lulus ke tahap seleksi berikutnya.</strong></p>
        <p>Kami sangat menghargai waktu dan usaha yang Anda berikan dalam proses lamaran ini. Meskipun demikian, kami berharap Anda sukses dalam masa pencarian kerja dan semoga ada kesempatan lain untuk bekerja.</p>
        <p>Jangan Khawatir! JobsSukabumi masih menyediakan informasi lowongan kerja untuk anda.Tetap semangat ya</p>
        <p>Jika Anda memiliki pertanyaan atau membutuhkan umpan balik lebih lanjut, jangan ragu untuk menghubungi kami.</p>
        <p>Salam hangat,</p>
        <p>Admin JobsSukabumi</p>
        <div class="footer">
            <p>&copy; JobsSukabumi</p>
        </div>
    </div>
</body>
</html>
`;
