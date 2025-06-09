import { Test, TestingModule } from '@nestjs/testing';
import { PartnersService } from './partners.service';
import { PrismaService } from '../prisma/prisma.service';
import { Logger, NotFoundException } from '@nestjs/common';

describe('PartnersService', () => {
  let service: PartnersService;
  let prismaService: PrismaService;

  const mockPartner = {
    id: '1',
    name: 'Test Partner',
    description: 'Test Description',
    logoUrl: 'http://example.com/logo.png',
    websiteUrl: 'http://example.com',
    createdAt: new Date('2025-06-07'),
    updatedAt: new Date('2025-06-07'),
  };

  const mockPrismaService = {
    partner: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PartnersService,
        Logger,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();
    service = module.get<PartnersService>(PartnersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a partner', async () => {
      const createPartnerDto = {
        name: 'Test Partner',
        description: 'Test Description',
        logoUrl: 'http://example.com/logo.png',
        websiteUrl: 'http://example.com',
      };
      mockPrismaService.partner.create.mockResolvedValue(mockPartner);

      const result = await service.create(createPartnerDto);
      expect(result).toEqual(mockPartner);
      expect(mockPrismaService.partner.create).toHaveBeenCalledWith({
        data: createPartnerDto,
      });
    });
  });

  describe('findAll', () => {
    it('should return all partners', async () => {
      const partners = [mockPartner];
      mockPrismaService.partner.findMany.mockResolvedValue(partners);

      const result = await service.findAll();
      expect(result).toEqual(partners);
      expect(mockPrismaService.partner.findMany).toHaveBeenCalledWith({
        orderBy: {
          createdAt: 'desc',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a partner', async () => {
      mockPrismaService.partner.findUnique.mockResolvedValue(mockPartner);

      const result = await service.findOne('1');
      expect(result).toEqual(mockPartner);
      expect(mockPrismaService.partner.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if partner not found', async () => {
      mockPrismaService.partner.findUnique.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a partner', async () => {
      const updatePartnerDto = {
        name: 'Updated Partner',
        description: 'Updated Description',
      };
      mockPrismaService.partner.findUnique.mockResolvedValueOnce(mockPartner);
      mockPrismaService.partner.update.mockResolvedValue({
        ...mockPartner,
        ...updatePartnerDto,
      });

      const result = await service.update('1', updatePartnerDto);
      expect(result).toEqual({
        ...mockPartner,
        ...updatePartnerDto,
      });
      expect(mockPrismaService.partner.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPrismaService.partner.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updatePartnerDto,
      });
    });

    it('should throw NotFoundException if partner not found during update', async () => {
      mockPrismaService.partner.findUnique.mockResolvedValueOnce(null);
      await expect(service.update('1', { name: 'Test' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a partner', async () => {
      mockPrismaService.partner.findUnique.mockResolvedValueOnce(mockPartner);
      mockPrismaService.partner.delete.mockResolvedValue(mockPartner);

      const result = await service.remove('1');
      expect(result).toEqual(mockPartner);
      expect(mockPrismaService.partner.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(mockPrismaService.partner.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if partner not found during removal', async () => {
      mockPrismaService.partner.findUnique.mockResolvedValueOnce(null);
      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
