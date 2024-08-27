export const SendSelectedTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Selamat! Anda Lulus ke Tahap Selanjutnya</title>
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
        <h1>Selamat! Anda Lulus ke Tahap Selanjutnya</h1>
        <p>Halo {{ name }},</p>
        <p>Terima kasih atas ketertarikan Anda untuk melamar lewat situs JobsSukabumi. Kami senang menginformasikan bahwa Anda telah lulus tahap awal seleksi untuk posisi yang Anda lamar dan akan melanjutkan ke tahap berikutnya.</p>
        <p>Anda akan dihubungi oleh perusahaan terkait dalam waktu dekat.untuk detail lebih lanjut atau informasi tambahan yang perlu disiapkan.</p>
        <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.</p>
        <p>Salam hangat,</p>
        <p>Admin JobsSukabumi</p>
        <div class="footer">
            <p>&copy; JobsSukabumi</p>
        </div>
    </div>
</body>
</html>
`;
