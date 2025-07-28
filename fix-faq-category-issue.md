# Fix for FAQ Category Issue

## Problem

In the file `backend\src\admin\admin.controller.ts` at line 40, there's an error:

```typescript
categories: await this.prisma.fAQCategory.count() // Add if you have categories
```

The error message is:
> [ts] Property 'fAQCategory' does not exist on type 'PrismaService'. (2339)

## Analysis

After examining the codebase, I found that:

1. There is no `FAQCategory` model defined in the Prisma schema.
2. Instead, the `FAQ` model has a `category` field which is a simple String type.
3. The admin controller is trying to access `this.prisma.fAQCategory.count()`, but this model doesn't exist.

## Solution

The solution is to count distinct categories from the FAQ table instead of trying to access a non-existent model. We can use Prisma's `groupBy` feature to group by the category field and then count the number of groups:

```typescript
const categories = await this.prisma.fAQ.groupBy({
  by: ['category'],
});
const categoryCount = categories.length;
```

Then we can use this value in the response:

```typescript
faqs: {
  total: totalFaqs,
  categories: categoryCount
}
```

## Implementation Steps

1. Switch to Code mode
2. Open `backend\src\admin\admin.controller.ts`
3. Replace line 40:
   ```typescript
   categories: await this.prisma.fAQCategory.count() // Add if you have categories
   ```
   
   With:
   ```typescript
   categories: (await this.prisma.fAQ.groupBy({ by: ['category'] })).length
   ```

4. Test the solution by making a request to the dashboard endpoint

## Benefits

- Fixes the TypeScript error
- Provides an accurate count of distinct FAQ categories
- Uses Prisma's built-in functionality for efficient database queries