import { Test, TestingModule } from '@nestjs/testing';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { Logger } from '@nestjs/common';

describe('PartnersController', () => {
  let controller: PartnersController;
  let partnersService: PartnersService;

  const mockPartnersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnersController],
      providers: [
        Logger,
        {
          provide: PartnersService,
          useValue: mockPartnersService,
        },
      ],
    }).compile();
    controller = module.get<PartnersController>(PartnersController);
    partnersService = module.get<PartnersService>(PartnersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a partner', async () => {
      const createPartnerDto = {
        name: 'Test Partner',
        description: 'Test Description',
        logoUrl: 'http://example.com/logo.png',
        websiteUrl: 'http://example.com',
      };
      const expectedResult = { id: '1', ...createPartnerDto };
      mockPartnersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(createPartnerDto);
      expect(result).toEqual(expectedResult);
      expect(mockPartnersService.create).toHaveBeenCalledWith(createPartnerDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of partners', async () => {
      const expectedResult = [
        { id: '1', name: 'Partner 1' },
        { id: '2', name: 'Partner 2' },
      ];
      mockPartnersService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
      expect(mockPartnersService.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a partner by id', async () => {
      const expectedResult = { id: '1', name: 'Partner 1' };
      mockPartnersService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');
      expect(result).toEqual(expectedResult);
      expect(mockPartnersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a partner', async () => {
      const updatePartnerDto = {
        name: 'Updated Partner',
        description: 'Updated Description',
      };
      const expectedResult = { id: '1', ...updatePartnerDto };
      mockPartnersService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', updatePartnerDto);
      expect(result).toEqual(expectedResult);
      expect(mockPartnersService.update).toHaveBeenCalledWith(
        '1',
        updatePartnerDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a partner', async () => {
      const expectedResult = { id: '1', name: 'Partner 1' };
      mockPartnersService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');
      expect(result).toEqual(expectedResult);
      expect(mockPartnersService.remove).toHaveBeenCalledWith('1');
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
