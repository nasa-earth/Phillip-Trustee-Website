const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

const sampleEvents = [
  {
    title: 'Annual Finance Summit 2025',
    slug: 'annual-finance-summit-2025',
    description:
      'Join us for our annual finance summit featuring industry leaders, expert panels, and networking opportunities. Learn about the latest trends in trust management, investment strategies, and financial regulations in Cambodia.',
    thumbnail: '/images/event/finance-summit.jpg',
    published: true,
  },
  {
    title: 'Investment Workshop for Beginners',
    slug: 'investment-workshop-beginners',
    description:
      'A comprehensive workshop designed for beginners who want to learn about investment opportunities in Cambodia. Topics include property investment, trust structures, and risk management.',
    thumbnail: '/images/event/investment-workshop.jpg',
    published: true,
  },
  {
    title: 'Trust Law Update Seminar',
    slug: 'trust-law-update-seminar',
    description:
      'Stay current with the latest changes in Cambodian trust law. This seminar will cover recent regulatory updates, compliance requirements, and best practices for trust management.',
    thumbnail: '/images/event/trust-law-seminar.jpg',
    published: true,
  },
  {
    title: 'Business Networking Evening',
    slug: 'business-networking-evening',
    description:
      'Connect with fellow professionals, potential partners, and industry experts in a relaxed networking environment. Light refreshments and drinks will be provided.',
    thumbnail: '/images/event/networking-evening.jpg',
    published: true,
  },
  {
    title: 'Draft Event: Upcoming Conference',
    slug: 'draft-upcoming-conference',
    description:
      'This is a draft event that is not yet published. It will not appear on the public events page.',
    thumbnail: '/images/event/draft-conference.jpg',
    published: false,
  },
  {
    title: 'Real Estate Investment Opportunities',
    slug: 'real-estate-investment-opportunities',
    description:
      'Explore the growing real estate market in Cambodia and learn how trust structures can facilitate foreign investment in property. Case studies and practical examples will be presented.',
    thumbnail: '/images/event/real-estate-investment.jpg',
    published: false,
  },
];

async function seedEvents() {
  try {
    console.log('Starting to seed events...');

    // Delete existing events (optional)
    await prisma.event.deleteMany();
    console.log('Cleared existing events');

    // Insert sample events
    for (const eventData of sampleEvents) {
      const event = await prisma.event.create({
        data: eventData,
      });
      console.log(`Created event: ${event.title}`);
    }

    console.log('✅ Successfully seeded events!');
  } catch (error) {
    console.error('❌ Error seeding events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedEvents();
