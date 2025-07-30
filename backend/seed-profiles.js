// const { PrismaClient } = require('../generated/prisma');

// const prisma = new PrismaClient();

// const profilesData = [
//     {
//         name: 'ONG TEONG HOON',
//         title: 'Chairman',
//         image: '/images/profile/ceo.jpg',
//         desc: 'Mr. Ong started working in the financial sector in 1977, with Standard Chartered Bank, as a Management Trainee. For 25 years with the Bank, he had been through all aspects of Commercial Banking apart from Treasury function, and he ended his banking career as Country Manager for the Bank in Cambodia in from 2000 to 2002. This was after being the Bank\'s Chief Representative in Myanmar between 1995 and 2000; and before that, Regional Manager, Asia Pacific Region covering Financial Institutions.\n\n Soon after that, he joined Phillip Securities Pte Ltd and covered various functions, including a stint in Phillip Securities Thailand PLC as its acting CEO, and was the Director of OTC Capital prior to being assigned to KREDIT Microfinance in 2012. He is currently serving as Chairman of both Phillip General Insurance(Cambodia) Plc and Phillip Trustee Cambodia in addition to being shareholder representative for Phillip General Insurance(Cambodia) Plc, Phillip Life Assurance(Cambodia) Plc, and Phillip Bank Plc.\n\n Mr.Ong is a graduate from the University of Singapore with a Bachelor of Business Administration and is an Associate of the Chartered Institute of Bankers since 1978.',
//         order: 1,
//         isActive: true,
//     },
//     {
//         name: 'Sopheap Proeung',
//         title: 'General Manager',
//         image: '/images/profile/mr_sopheap.jpg',
//         desc: 'Sopheap is the General Manager of Phillip trustee (Cambodia). As a founding member of the Group\'s Trust services in Cambodia over two years ago, he has been instrumental in developing the Kingdom\'s nascent Trust landscape and driving its business growth. Prior to his current role, Sopheap has over 20 years of experience in various roles across the NGOs, Microfinance and banking sectors.',
//         order: 2,
//         isActive: true,
//     },
//     {
//         name: 'Phang Vichet',
//         title: 'Legal & Compliance Manager',
//         image: '/images/profile/legal_manager.jpg',
//         desc: 'Vichet is a Legal & Compliance Manager of Phillip Trustee (Cambodia) Co., Ltd. and a practicing notary in Cambodia upon completion of the notary profession training from the Royal Academy for Judicial Professions and nomination of notary in 2016 and the master\'s degree in Private Law from Lumière Lyon 2 University from France in 2008. Vichet has worked as Legal Consultant for a law firm for 4 years, as Case Manager for Civil Party Lead Co-Lawyers of the Extra-ordinary Chamber in the Court of Cambodia for 4 years, and as Legal Manager for banks for 8 years. Vichet is also a part-time lecturer of law at RULE for 16 years, and at the Royal Academy for Judicial Professions since 2023.\n\n s Legal & Compliance Manager of Phillip Trustee, Vichet has key work to review, advise on the contracts, and legal documents, identify legal risk, conduct risk profiling of customers, update laws and regulations to the senior management of the company.',
//         order: 3,
//         isActive: true,
//     },
//     {
//         name: 'Kong Rothana',
//         title: 'Accounting and Finance Manager',
//         image: '/images/profile/kong_rothana.jpg',
//         desc: 'Rothana is the Accounting and Finance Manager of Phillip trustee (Cambodia) Co, Ltd. Before joining the Company, he was the Senior External Audit Manager at an audit which involved various sector such Real Estate Company, Manufacturing, Trading Company, and Microfinance and banking sectors.\n\n He is pursuing the Association of Chartered Certified Accountants (ACCA) at CamEd Business School. In 2015, he got a bachelor\'s degree of Banking and Finance from the Royal University of Law and Economic (RULE). Moreover, he got the other degree of Intensive English Academic Purpose (IEAP) program from Pannasastra University of Law and Economics (PUC).',
//         order: 4,
//         isActive: true,
//     },
//     {
//         name: 'Ho Souven',
//         title: 'Operation Supervisor',
//         image: '/images/profile/ho_souven.jpg',
//         desc: 'Souven is Operation Supervisor of Phillip Trustee (Cambodia) Co., Ltd. and hold completed bachelor\'s degree of Law in 2016 from Royal University of Law and Economics. Souven used to work as Credit admin supervisor at one of Cambodia\'s Largest Commercial Banks in Cambodia for over 4 years. Prior to his posting in Phillip Trustee (Cambodia) Co., Ltd. he used to work at one of a well-known French\'s bank in Cambodia as Credit Admin Deputy Team leader for over 2 years.\n\n As Operation Supervisor of Phillip Trustee, Souven has key work to control operation process of client onboarding, update operational process and propose implementation trust operation to the management of the company.',
//         order: 5,
//         isActive: true,
//     },
// ];

// async function seedProfiles() {
//     console.log('Starting to seed profiles...');
    
//     try {
//         // Check if profiles already exist
//         const existingProfiles = await prisma.profile.findMany();
        
//         if (existingProfiles.length > 0) {
//             console.log(`Found ${existingProfiles.length} existing profiles. Skipping seeding.`);
//             return;
//         }
        
//         // Create profiles
//         const createdProfiles = [];
//         for (const profileData of profilesData) {
//             const profile = await prisma.profile.create({
//                 data: profileData,
//             });
//             createdProfiles.push(profile);
//             console.log(`Created profile: ${profile.name}`);
//         }
        
//         console.log(`Successfully seeded ${createdProfiles.length} profiles.`);
        
//     } catch (error) {
//         console.error('Error seeding profiles:', error);
//         throw error;
//     }
// }

// async function main() {
//     try {
//         await seedProfiles();
//     } catch (error) {
//         console.error('Error in main:', error);
//         process.exit(1);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// if (require.main === module) {
//     main();
// }

// module.exports = { seedProfiles };
