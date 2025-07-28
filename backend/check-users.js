const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUsers() {
  try {
    const users = await prisma.user.findMany();
    console.log('Total users:', users.length);
    console.log(
      'Users:',
      users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
      })),
    );

    const admins = users.filter((u) => u.role === 'ADMIN');
    const editors = users.filter((u) => u.role === 'EDITOR');
    console.log('Admins:', admins.length);
    console.log('Editors:', editors.length);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
