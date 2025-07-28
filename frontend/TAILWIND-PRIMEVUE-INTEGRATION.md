# Tailwind CSS + PrimeVue Integration Guide

This guide demonstrates how to effectively use Tailwind CSS with PrimeVue in your Nuxt.js project.

## Setup Complete ✅

Your project now has the proper integration between Tailwind CSS and PrimeVue:

1. **tailwindcss-primeui plugin installed** - Provides semantic color utilities
2. **CSS imports configured** - Both Tailwind and PrimeUI styles are imported
3. **Nuxt configuration** - Tailwind v4 with Vite plugin setup
4. **PrimeVue integration** - Using Aura theme with proper module configuration

## Key Integration Features

### 1. Semantic Color Utilities

The `tailwindcss-primeui` plugin provides semantic color classes that match your PrimeVue theme:

```html
<!-- Primary colors -->
<div class="bg-primary text-primary-contrast">Primary background</div>

<!-- Surface colors -->
<div class="bg-surface-0 text-surface-900">Light surface</div>
<div class="bg-surface-100 text-surface-700">Subtle background</div>

<!-- Muted text -->
<p class="text-muted-color">Muted text color</p>
```

### 2. Enhanced PrimeVue Components

Use Tailwind utilities to enhance PrimeVue components:

```html
<!-- Button with Tailwind enhancements -->
<button
  label="Enhanced Button"
  class="!shadow-lg hover:!shadow-xl !rounded-full !px-8 transition-all duration-300"
/>

<!-- Card with gradient and custom styling -->
<Card
  class="!shadow-2xl !border-0 !bg-gradient-to-br !from-primary-50 !to-surface-0"
>
  <template #content>
    <p class="text-surface-600 leading-relaxed">Enhanced card content</p>
  </template>
</Card>

<!-- Input with focus states -->
<InputText
  class="!w-full !rounded-lg focus:!border-primary-500 focus:!ring-2 focus:!ring-primary-200"
/>
```

### 3. Layout and Responsive Design

Combine PrimeVue components with Tailwind's powerful layout system:

```html
<!-- Responsive grid with PrimeVue components -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card
    v-for="item in items"
    :key="item.id"
    class="!shadow-lg hover:!shadow-xl transition-shadow"
  >
    <!-- Card content -->
  </Card>
</div>

<!-- Flexbox layouts -->
<div class="flex flex-wrap gap-4 items-center justify-between">
  <button label="Action 1" class="!rounded-full" />
  <button label="Action 2" severity="secondary" class="!rounded-full" />
</div>
```

## Important Tips

### 1. Override PrimeVue Styles

Use the `!` prefix to override PrimeVue's default styles:

```html
<button class="!bg-blue-500 !border-blue-500 hover:!bg-blue-600" />
```

### 2. Combine Semantic and Utility Colors

Mix semantic colors from the plugin with standard Tailwind colors:

```html
<div class="bg-primary border-2 border-blue-300 rounded-lg p-4">
  <p class="text-primary-contrast">Primary background with blue border</p>
</div>
```

### 3. Responsive Design

Use Tailwind's responsive prefixes with PrimeVue components:

```html
<DataTable
  class="!rounded-lg lg:!shadow-xl md:!mx-4 sm:!text-sm"
  responsiveLayout="scroll"
>
  <!-- Table content -->
</DataTable>
```

### 4. Form Layouts

Create beautiful forms combining both libraries:

```html
<div class="space-y-6 max-w-2xl mx-auto p-6 bg-surface-0 rounded-lg shadow-lg">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <label class="block text-sm font-medium text-surface-700 mb-2"
        >Name</label
      >
      <InputText class="!w-full !rounded-lg" />
    </div>
    <div>
      <label class="block text-sm font-medium text-surface-700 mb-2"
        >Email</label
      >
      <InputText type="email" class="!w-full !rounded-lg" />
    </div>
  </div>

  <div>
    <label class="block text-sm font-medium text-surface-700 mb-2"
      >Message</label
    >
    <textarea class="!w-full !rounded-lg !min-h-32" />
  </div>

  <div class="flex justify-end">
    <button label="Submit" class="!px-8 !py-3 !rounded-lg" />
  </div>
</div>
```

## Available Semantic Colors

The plugin provides these semantic color utilities:

- **Primary**: `bg-primary`, `text-primary`, `border-primary`
- **Primary Contrast**: `bg-primary-contrast`, `text-primary-contrast`
- **Surface**: `bg-surface-0` through `bg-surface-950`
- **Muted**: `text-muted-color`

## Demo Page

Visit `/tailwind-demo` to see live examples of all integration features.

## Advanced: Volt UI

For even deeper integration, consider using Volt UI, which provides unstyled PrimeVue components specifically designed for Tailwind CSS customization.

## Best Practices

1. **Use semantic colors** for theme consistency
2. **Combine layout utilities** with component functionality
3. **Override styles carefully** using the `!` prefix
4. **Test responsive behavior** across different screen sizes
5. **Maintain accessibility** when customizing components

This integration gives you the best of both worlds: PrimeVue's comprehensive component library with Tailwind's utility-first approach to styling.
