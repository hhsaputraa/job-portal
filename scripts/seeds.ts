const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

const main = async () => {
  try {
    await database.category.createMany({
      data: [
        { name: "Teknologi Informasi" },
        { name: "Keuangan" },
        { name: "Kesehatan" },
        { name: "Pendidikan" },
        { name: "Konstruksi" },
        { name: "Manufaktur" },
        { name: "Pemasaran" },
        { name: "Desain" },
        { name: "Penulisan & Penyuntingan" },
        { name: "Hukum" },
        { name: "Transportasi & Logistik" },
        { name: "Sumber Daya Manusia" },
        { name: "Pariwisata & Perhotelan" },
        { name: "Pemerintahan & Layanan Publik" },
        { name: "Seni & Hiburan" },
      ],
    });
    console.log("Success");
  } catch (error) {
    console.log(`error on seeding the database categories : ${error}`);
  }
};

main();
