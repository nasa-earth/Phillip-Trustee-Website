import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

export const Public = () => SetMetadata('isPublic', true);

export const ApiPaginatedResponse = (type: any) => {
  return SetMetadata('swagger/apiResponse', {
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: `#/components/schemas/${type.name}` },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            take: { type: 'number' },
          },
        },
      },
    },
  });
};
