const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function checkPartners() {
  try {
    console.log('Checking partners in database...');
    const partners = await prisma.partner.findMany();
    console.log(`Found ${partners.length} partners in database:`);

    if (partners.length === 0) {
      console.log('No partners found in database!');
    } else {
      partners.forEach((partner, index) => {
        console.log(
          `${index + 1}. ID: ${partner.id}, Name: ${partner.name}, Logo: ${partner.logo || 'N/A'}`,
        );
      });
    }
  } catch (error) {
    console.error('Error checking partners:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPartners();
