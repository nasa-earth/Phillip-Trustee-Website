import { Test, TestingModule } from '@nestjs/testing';
import { EventsService } from './events.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuditService } from '../common/services/audit.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-events.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Prisma } from '../../generated/prisma';

describe('EventsService', () => {
  let service: EventsService;
  let prisma: PrismaService;
  let audit: AuditService;

  const mockPrismaService = {
    event: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockAuditService = {
    log: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
        {
          provide: AuditService,
          useValue: mockAuditService,
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    prisma = module.get<PrismaService>(PrismaService);
    audit = module.get<AuditService>(AuditService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const createDto: CreateEventDto = {
      title: 'Test Event',
      slug: 'test-event',
      description: 'Test Description',
      startDate: '2025-07-01T10:00:00Z',
      endDate: '2025-07-01T12:00:00Z',
      location: 'Test Location',
      published: false,
    };

    const userId = 'test-user-id';

    it('should create an event successfully', async () => {
      const createdEvent = {
        id: 'test-id',
        ...createDto,
        startDate: new Date(createDto.startDate),
        endDate: new Date(createDto.endDate),
        isPublished: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.event.create.mockResolvedValue(createdEvent);

      const result = await service.create(createDto, userId);

      expect(result).toEqual(createdEvent);
      expect(mockPrismaService.event.create).toHaveBeenCalled();
      expect(mockAuditService.log).toHaveBeenCalledWith({
        action: 'create',
        entity: 'Event',
        entityId: createdEvent.id,
        userId,
        details: `Created event: ${createdEvent.title}`,
      });
    });

    it('should throw ConflictException when slug already exists', async () => {
      mockPrismaService.event.create.mockRejectedValue({
        code: 'P2002',
        meta: { target: ['slug'] },
      });

      await expect(service.create(createDto, userId)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all published events when publishedOnly is true', async () => {
      const events = [
        {
          id: '1',
          title: 'Event 1',
          isPublished: true,
        },
      ];

      mockPrismaService.event.findMany.mockResolvedValue(events);

      const result = await service.findAll(true);

      expect(result).toEqual(events);
      expect(mockPrismaService.event.findMany).toHaveBeenCalledWith({
        where: { isPublished: true },
        orderBy: { startDate: 'desc' },
      });
    });
  });

  describe('findOne', () => {
    it('should return an event if found', async () => {
      const event = {
        id: '1',
        title: 'Event 1',
        isPublished: true,
      };

      mockPrismaService.event.findFirst.mockResolvedValue(event);

      const result = await service.findOne('1');

      expect(result).toEqual(event);
    });

    it('should throw NotFoundException if event not found', async () => {
      mockPrismaService.event.findFirst.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    const updateDto: UpdateEventDto = {
      title: 'Updated Event',
    };

    const userId = 'test-user-id';

    it('should update an event successfully', async () => {
      const existingEvent = {
        id: '1',
        title: 'Old Title',
        isPublished: true,
      };

      const updatedEvent = {
        ...existingEvent,
        ...updateDto,
      };

      mockPrismaService.event.findFirst.mockResolvedValue(existingEvent);
      mockPrismaService.event.update.mockResolvedValue(updatedEvent);

      const result = await service.update('1', updateDto, userId);

      expect(result).toEqual(updatedEvent);
      expect(mockAuditService.log).toHaveBeenCalledWith({
        action: 'update',
        entity: 'Event',
        entityId: '1',
        userId,
        details: `Updated event: Old Title -> Updated Event`,
      });
    });

    it('should throw NotFoundException if event not found', async () => {
      mockPrismaService.event.findFirst.mockResolvedValue(null);

      await expect(service.update('1', updateDto, userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    const userId = 'test-user-id';

    it('should delete an event successfully', async () => {
      const event = {
        id: '1',
        title: 'Event to Delete',
        isPublished: true,
      };

      mockPrismaService.event.findFirst.mockResolvedValue(event);
      mockPrismaService.event.delete.mockResolvedValue(event);

      const result = await service.remove('1', userId);

      expect(result).toEqual(event);
      expect(mockAuditService.log).toHaveBeenCalledWith({
        action: 'delete',
        entity: 'Event',
        entityId: '1',
        userId,
        details: `Deleted event: Event to Delete`,
      });
    });

    it('should throw NotFoundException if event not found', async () => {
      mockPrismaService.event.findFirst.mockResolvedValue(null);

      await expect(service.remove('1', userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
