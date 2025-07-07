const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

const sampleEvents = [
  {
    title: 'Annual Finance Summit 2025',
    slug: 'annual-finance-summit-2025',
    description:
      'Join us for our annual finance summit featuring industry leaders, expert panels, and networking opportunities. Learn about the latest trends in trust management, investment strategies, and financial regulations in Cambodia.',
    location: 'Sofitel Phnom Penh Phokeethra',
    thumbnail: '/images/event/finance-summit.jpg',
    isPublished: true,
    startDate: new Date('2025-08-15T09:00:00'),
    endDate: new Date('2025-08-15T17:00:00'),
    registrationUrl: 'https://example.com/register/finance-summit',
  },
  {
    title: 'Investment Workshop for Beginners',
    slug: 'investment-workshop-beginners',
    description:
      'A comprehensive workshop designed for beginners who want to learn about investment opportunities in Cambodia. Topics include property investment, trust structures, and risk management.',
    location: 'Phillip Trustee Training Center',
    thumbnail: '/images/event/investment-workshop.jpg',
    isPublished: true,
    startDate: new Date('2025-07-20T14:00:00'),
    endDate: new Date('2025-07-20T17:00:00'),
    registrationUrl: 'https://example.com/register/investment-workshop',
  },
  {
    title: 'Trust Law Update Seminar',
    slug: 'trust-law-update-seminar',
    description:
      'Stay current with the latest changes in Cambodian trust law. This seminar will cover recent regulatory updates, compliance requirements, and best practices for trust management.',
    location: 'Raffles Hotel Le Royal',
    thumbnail: '/images/event/trust-law-seminar.jpg',
    isPublished: true,
    startDate: new Date('2025-09-10T09:30:00'),
    endDate: new Date('2025-09-10T12:30:00'),
    registrationUrl: null,
  },
  {
    title: 'Business Networking Evening',
    slug: 'business-networking-evening',
    description:
      'Connect with fellow professionals, potential partners, and industry experts in a relaxed networking environment. Light refreshments and drinks will be provided.',
    location: 'Rosewood Phnom Penh',
    thumbnail: '/images/event/networking-evening.jpg',
    isPublished: true,
    startDate: new Date('2025-10-05T18:00:00'),
    endDate: new Date('2025-10-05T21:00:00'),
    registrationUrl: 'https://example.com/register/networking-evening',
  },
  {
    title: 'Real Estate Investment Opportunities',
    slug: 'real-estate-investment-opportunities',
    description:
      'Explore the growing real estate market in Cambodia and learn how trust structures can facilitate foreign investment in property. Case studies and practical examples will be presented.',
    location: 'Cambodia Investment Conference Center',
    thumbnail: '/images/event/real-estate-investment.jpg',
    isPublished: false,
    startDate: new Date('2025-11-12T10:00:00'),
    endDate: new Date('2025-11-12T15:00:00'),
    registrationUrl: null,
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
