export const ThankYouTemplate = `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terima Kasih Sudah Melamar</title>
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
        <h1>Terima Kasih Sudah Melamar!</h1>
        <p>Halo {{ name }},</p>
        <p>Terima kasih atas ketertarikan Anda untuk melamar di JobsSukabumi. Kami telah menerima lamaran Anda dan sedang meninjau berkas Anda.</p>
        <p>Kami menghargai waktu yang Anda luangkan untuk melamar ke perusahaan kami. Proses seleksi mungkin akan memakan waktu beberapa minggu, dan kami akan segera menghubungi Anda jika ada informasi lebih lanjut yang diperlukan atau untuk tahap selanjutnya.</p>
        <p>Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami</p>
        <p>Salam hangat,</p>
        <p>Admin JobsSukabumi</p>
        <div class="footer">
            <p>&copy; JobsSukabumi</p>
        </div>
    </div>
</body>
</html>
`;
