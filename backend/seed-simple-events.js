const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

const sampleEvents = [
  {
    title: 'Annual Financial Advisory Summit 2025',
    slug: 'annual-financial-advisory-summit-2025',
    description:
      'Join us for our premier annual summit bringing together financial advisors, trust professionals, and industry experts. This comprehensive event features keynote presentations, panel discussions, and networking opportunities focused on the latest trends in trust management, investment strategies, and regulatory updates in Cambodia. Learn from seasoned professionals and discover new opportunities for growth in the financial services sector.',
    thumbnail: '/images/events/financial-summit-thumbnail.jpg',
    published: true,
  },
  {
    title: 'Introduction to Trust Services Workshop',
    slug: 'introduction-trust-services-workshop',
    description:
      'A beginner-friendly workshop designed for individuals and businesses interested in understanding trust services and their benefits. This hands-on session covers the fundamentals of trust structures, estate planning, asset protection, and succession planning. Perfect for entrepreneurs, high-net-worth individuals, and professionals looking to expand their knowledge of trust services in Cambodia.',
    thumbnail: '/images/events/trust-workshop-thumbnail.jpg',
    published: true,
  },
];

async function seedSimpleEvents() {
  try {
    console.log('Starting to seed simple events...');

    // Insert sample events
    for (const eventData of sampleEvents) {
      // Check if event with this slug already exists
      const existingEvent = await prisma.event.findUnique({
        where: { slug: eventData.slug },
      });

      if (!existingEvent) {
        const event = await prisma.event.create({
          data: eventData,
        });
        console.log(`✅ Created event: ${event.title}`);
      } else {
        console.log(`⚠️  Event already exists: ${eventData.title}`);
      }
    }

    console.log('✅ Successfully seeded simple events!');
  } catch (error) {
    console.error('❌ Error seeding events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedSimpleEvents();
