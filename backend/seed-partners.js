// const { PrismaClient } = require('./generated/prisma');

// const prisma = new PrismaClient();

// async function seedPartners() {
//   console.log('Seeding partners...');

//   const partners = [
//     {
//       name: 'Phillip Bank',
//       logo: '/images/about/1-phillip-bank.jpg',
//       website: 'https://www.phillipbank.com.kh',
//       description: 'Financial Institution',
//     },
//     {
//       name: 'Phillip General Insurance',
//       logo: '/images/about/1-phillip-general-insurance.png',
//       website: 'https://www.phillipinsurance.com.kh',
//       description: 'Insurance Provider',
//     },
//     {
//       name: 'SaRaNa Law',
//       logo: '/images/event/SARANA LAW_2.jpg',
//       website: 'https://www.saranalaw.com',
//       description: 'Legal Services',
//     },
//     {
//       name: 'Yi Fung Real Estate',
//       logo: '/images/event/Yi Fung Real Estate_1.jpg',
//       website: 'https://www.yifung.com.kh',
//       description: 'Real Estate',
//     },
//     {
//       name: 'Sunpay',
//       logo: '/images/event/Sunpay_2.jpg',
//       website: 'https://www.sunpay.com.kh',
//       description: 'Payment Solutions',
//     },
//     {
//       name: 'Dragon Land',
//       logo: '/images/partners/Dragon Land.jpg',
//       website: 'https://www.dragonland.com.kh',
//       description: 'Real Estate',
//     },
//     {
//       name: 'Rose Mavel',
//       logo: '/images/partners/1_Rose_Mavel.jpg',
//       website: 'https://www.rosemavel.com',
//       description: 'Business Partner',
//     },
//     {
//       name: 'La Maision',
//       logo: '/images/partners/2_La_Maision.jpg',
//       website: 'https://www.lamaision.com',
//       description: 'Business Partner',
//     },
//     {
//       name: 'Vimean Samnang',
//       logo: '/images/partners/3_Vimean_Samnang.jpg',
//       website: 'https://www.vimeansamnang.com',
//       description: 'Business Partner',
//     },
//     {
//       name: 'IPS',
//       logo: '/images/partners/4_IPS.jpg',
//       website: 'https://www.ips.com.kh',
//       description: 'Technology Services',
//     },
//     {
//       name: 'SaRaNa',
//       logo: '/images/partners/5_SaRaNa.jpg',
//       website: 'https://www.sarana.com',
//       description: 'Business Partner',
//     },
//     {
//       name: 'YI Dung',
//       logo: '/images/partners/6_YI Dung.jpg',
//       website: 'https://www.yidung.com',
//       description: 'Business Partner',
//     },
//   ];

//   for (const partner of partners) {
//     const existing = await prisma.partner.findFirst({
//       where: { name: partner.name },
//     });

//     if (existing) {
//       await prisma.partner.update({
//         where: { id: existing.id },
//         data: partner,
//       });
//     } else {
//       await prisma.partner.create({
//         data: partner,
//       });
//     }
//   }

//   console.log('Partners seeded successfully!');
// }

// seedPartners()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
