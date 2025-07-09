const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function verifyEvents() {
  try {
    console.log('🔍 Verifying events in database...\n');

    // Get all events with their images
    const events = await prisma.event.findMany({
      include: {
        images: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    console.log(`📊 Total Events Found: ${events.length}\n`);

    events.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title}`);
      console.log(`   Slug: ${event.slug}`);
      console.log(`   Published: ${event.published ? '✅ Yes' : '❌ No'}`);
      console.log(`   Description: ${event.description.substring(0, 100)}...`);
      console.log(`   Thumbnail: ${event.thumbnail || 'No thumbnail'}`);
      console.log(`   Images: ${event.images.length} additional images`);
      console.log(`   Created: ${event.createdAt.toLocaleDateString()}`);
      console.log('');
    });

    // Get total image count
    const totalImages = await prisma.eventImage.count();
    console.log(`📸 Total Event Images: ${totalImages}`);
  } catch (error) {
    console.error('❌ Error verifying events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyEvents();
