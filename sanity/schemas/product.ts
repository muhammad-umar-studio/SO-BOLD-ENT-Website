export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'sku',
      title: 'SKU',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Microphones', value: 'Microphones' },
          { title: 'Studio Monitors', value: 'Studio Monitors' },
          { title: 'Audio Interfaces', value: 'Audio Interfaces' },
          { title: 'Synthesizers & Controllers', value: 'Synthesizers & Controllers' },
          { title: 'Studio Accessories', value: 'Studio Accessories' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'compareAtPrice',
      title: 'Compare at Price (USD)',
      type: 'number',
      description: 'Original price for sale badge display',
    },
    {
      name: 'stock',
      title: 'Stock Inventory',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'variants',
      title: 'Product Variants',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Variant',
          fields: [
            { name: 'id', title: 'Variant ID', type: 'string' },
            { name: 'name', title: 'Variant Name (e.g. Cardioid Capsule, 8-Channel)', type: 'string' },
            { name: 'sku', title: 'Variant SKU', type: 'string' },
            { name: 'priceOffset', title: 'Price Offset (+/- USD)', type: 'number' },
            { name: 'stock', title: 'Variant Stock', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'features',
      title: 'Features / Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'isFeatured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    },
  ],
};
