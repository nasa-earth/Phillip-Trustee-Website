const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

const sampleEvents = [
  {
    title: 'Annual Finance Summit 2025',
    slug: 'annual-finance-summit-2025',
    description:
      'Join us for our annual finance summit featuring industry leaders, expert panels, and networking opportunities. Learn about the latest trends in trust management, investment strategies, and financial regulations in Cambodia. This premier event brings together professionals from across Southeast Asia to discuss emerging opportunities and challenges in the financial sector.',
    thumbnail: '/images/event/finance-summit.jpg',
    published: true,
  },
  {
    title: 'Investment Workshop for Beginners',
    slug: 'investment-workshop-beginners',
    description:
      'A comprehensive workshop designed for beginners who want to learn about investment opportunities in Cambodia. Topics include property investment, trust structures, and risk management. Our expert facilitators will guide you through practical exercises and real-world case studies to help you make informed investment decisions.',
    thumbnail: '/images/event/investment-workshop.jpg',
    published: true,
  },
  {
    title: 'Trust Law Update Seminar',
    slug: 'trust-law-update-seminar',
    description:
      'Stay current with the latest changes in Cambodian trust law. This seminar will cover recent regulatory updates, compliance requirements, and best practices for trust management. Legal experts will provide insights into upcoming legislation and its impact on existing trust structures.',
    thumbnail: '/images/event/trust-law-seminar.jpg',
    published: true,
  },
  {
    title: 'Business Networking Evening',
    slug: 'business-networking-evening',
    description:
      "Connect with fellow professionals, potential partners, and industry experts in a relaxed networking environment. Light refreshments and drinks will be provided. This is an excellent opportunity to expand your professional network and discover new business opportunities in Cambodia's growing economy.",
    thumbnail: '/images/event/networking-evening.jpg',
    published: true,
  },
  {
    title: 'Digital Transformation in Finance',
    slug: 'digital-transformation-finance',
    description:
      'Explore how digital technologies are revolutionizing the financial services industry in Cambodia. Learn about blockchain applications, digital payment systems, and how traditional trust services are adapting to the digital age. Industry pioneers will share their experiences and insights on successful digital transformation strategies.',
    thumbnail: '/images/event/digital-transformation.jpg',
    published: true,
  },
];

// Sample event images for each event
const eventImages = [
  // Images for Annual Finance Summit
  {
    eventSlug: 'annual-finance-summit-2025',
    images: [
      '/images/event/finance-summit-1.jpg',
      '/images/event/finance-summit-2.jpg',
      '/images/event/finance-summit-3.jpg',
    ],
  },
  // Images for Investment Workshop
  {
    eventSlug: 'investment-workshop-beginners',
    images: ['/images/event/workshop-1.jpg', '/images/event/workshop-2.jpg'],
  },
  // Images for Trust Law Seminar
  {
    eventSlug: 'trust-law-update-seminar',
    images: [
      '/images/event/seminar-1.jpg',
      '/images/event/seminar-2.jpg',
      '/images/event/seminar-3.jpg',
    ],
  },
  // Images for Networking Evening
  {
    eventSlug: 'business-networking-evening',
    images: [
      '/images/event/networking-1.jpg',
      '/images/event/networking-2.jpg',
    ],
  },
  // Images for Digital Transformation
  {
    eventSlug: 'digital-transformation-finance',
    images: [
      '/images/event/digital-1.jpg',
      '/images/event/digital-2.jpg',
      '/images/event/digital-3.jpg',
      '/images/event/digital-4.jpg',
    ],
  },
];

async function seedSampleEvents() {
  try {
    console.log('🌱 Starting to seed sample events...');

    // Clear existing events and their images
    console.log('🧹 Clearing existing events...');
    await prisma.eventImage.deleteMany();
    await prisma.event.deleteMany();
    console.log('✅ Cleared existing events');

    // Insert sample events
    console.log('📝 Creating events...');
    const createdEvents = [];

    for (const eventData of sampleEvents) {
      const event = await prisma.event.create({
        data: eventData,
      });
      createdEvents.push(event);
      console.log(`✅ Created event: ${event.title}`);
    }

    // Insert event images
    console.log('🖼️ Adding event images...');
    for (const eventImageData of eventImages) {
      // Find the created event by slug
      const event = createdEvents.find(
        (e) => e.slug === eventImageData.eventSlug,
      );
      if (event) {
        for (const imageUrl of eventImageData.images) {
          await prisma.eventImage.create({
            data: {
              url: imageUrl,
              eventId: event.id,
            },
          });
        }
        console.log(
          `✅ Added ${eventImageData.images.length} images for: ${event.title}`,
        );
      }
    }

    console.log('🎉 Successfully seeded all sample events and images!');
    console.log(
      `📊 Created ${createdEvents.length} events with ${eventImages.reduce((total, item) => total + item.images.length, 0)} images`,
    );
  } catch (error) {
    console.error('❌ Error seeding events:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedSampleEvents().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
