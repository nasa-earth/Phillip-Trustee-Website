import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-events.dto';
import { Request as ExpressRequest } from 'express';

describe('EventsController', () => {
  let controller: EventsController;
  let eventsService: EventsService;

  const mockEventsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findBySlug: jest.fn(),
    findUpcoming: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRequest = {
    user: {
      id: 'user-123',
      email: 'admin@test.com',
      role: 'ADMIN',
    },
  } as any as ExpressRequest;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: mockEventsService,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    eventsService = module.get<EventsService>(EventsService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const validCreateEventDto: CreateEventDto = {
      title: 'Test Event',
      slug: 'test-event-2024',
      description: 'This is a test event description',
      thumbnail: 'https://example.com/thumbnail.jpg',
    };

    const mockCreatedEvent = {
      id: 'event-123',
      ...validCreateEventDto,
      createdAt: new Date('2024-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
    };

    it('should successfully create an event', async () => {
      mockEventsService.create.mockResolvedValue(mockCreatedEvent);

      const result = await controller.create(validCreateEventDto, mockRequest);

      expect(eventsService.create).toHaveBeenCalledWith(
        validCreateEventDto,
        'user-123',
      );
      expect(result).toEqual(mockCreatedEvent);
    });

    it('should create an event with minimal required fields', async () => {
      const minimalEventDto: CreateEventDto = {
        title: 'Minimal Event',
        slug: 'minimal-event',
        description: 'Minimal description',
      };

      const mockMinimalEvent = {
        id: 'event-456',
        ...minimalEventDto,
        thumbnail: null,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
        updatedAt: new Date('2024-01-01T00:00:00.000Z'),
      };

      mockEventsService.create.mockResolvedValue(mockMinimalEvent);

      const result = await controller.create(minimalEventDto, mockRequest);

      expect(eventsService.create).toHaveBeenCalledWith(
        minimalEventDto,
        'user-123',
      );
      expect(result).toEqual(mockMinimalEvent);
    });

    it('should throw ConflictException when slug already exists', async () => {
      const conflictError = new ConflictException(
        'Event with this slug already exists',
      );
      mockEventsService.create.mockRejectedValue(conflictError);

      await expect(
        controller.create(validCreateEventDto, mockRequest),
      ).rejects.toThrow(ConflictException);

      expect(eventsService.create).toHaveBeenCalledWith(
        validCreateEventDto,
        'user-123',
      );
    });

    it('should handle and re-throw other service errors', async () => {
      const genericError = new Error('Database connection failed');
      mockEventsService.create.mockRejectedValue(genericError);

      await expect(
        controller.create(validCreateEventDto, mockRequest),
      ).rejects.toThrow('Database connection failed');

      expect(eventsService.create).toHaveBeenCalledWith(
        validCreateEventDto,
        'user-123',
      );
    });

    it('should create an event with thumbnail', async () => {
      const eventWithThumbnailDto: CreateEventDto = {
        ...validCreateEventDto,
        thumbnail: 'https://example.com/thumbnail2.jpg',
      };

      const mockEventWithThumbnail = {
        ...mockCreatedEvent,
        thumbnail: 'https://example.com/thumbnail2.jpg',
      };

      mockEventsService.create.mockResolvedValue(mockEventWithThumbnail);

      const result = await controller.create(
        eventWithThumbnailDto,
        mockRequest,
      );

      expect(eventsService.create).toHaveBeenCalledWith(
        eventWithThumbnailDto,
        'user-123',
      );
      expect(result.thumbnail).toBe('https://example.com/thumbnail2.jpg');
    });

    it('should pass the correct user ID from the request', async () => {
      const customUserRequest = {
        user: {
          id: 'different-user-456',
          email: 'editor@test.com',
          role: 'EDITOR',
        },
      } as any as ExpressRequest;

      mockEventsService.create.mockResolvedValue({
        ...mockCreatedEvent,
        authorId: 'different-user-456',
      });

      await controller.create(validCreateEventDto, customUserRequest);

      expect(eventsService.create).toHaveBeenCalledWith(
        validCreateEventDto,
        'different-user-456',
      );
    });
  });
});
