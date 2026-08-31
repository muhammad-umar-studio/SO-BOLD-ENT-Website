export default {
  name: 'order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: 'orderId',
      title: 'Order ID (Internal)',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'paypalOrderId',
      title: 'PayPal Order ID',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'payerEmail',
      title: 'Payer Email',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'payerName',
      title: 'Payer Name',
      type: 'string',
    },
    {
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'object',
      fields: [
        { name: 'addressLine1', title: 'Address Line 1', type: 'string' },
        { name: 'addressLine2', title: 'Address Line 2', type: 'string' },
        { name: 'adminArea2', title: 'City', type: 'string' },
        { name: 'adminArea1', title: 'State / Province', type: 'string' },
        { name: 'postalCode', title: 'Postal Code', type: 'string' },
        { name: 'countryCode', title: 'Country Code', type: 'string' },
      ],
    },
    {
      name: 'items',
      title: 'Order Line Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'productId', title: 'Product ID', type: 'string' },
            { name: 'productTitle', title: 'Product Title', type: 'string' },
            { name: 'variantName', title: 'Variant Name', type: 'string' },
            { name: 'unitPrice', title: 'Unit Price (USD)', type: 'number' },
            { name: 'quantity', title: 'Quantity', type: 'number' },
            { name: 'totalPrice', title: 'Total Price (USD)', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'subtotalPaid',
      title: 'Subtotal Paid (USD)',
      type: 'number',
    },
    {
      name: 'shippingPaid',
      title: 'Shipping Paid (USD)',
      type: 'number',
    },
    {
      name: 'totalPaid',
      title: 'Total Paid (USD)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'Pending' },
          { title: 'Paid', value: 'Paid' },
          { title: 'Shipped', value: 'Shipped' },
          { title: 'Cancelled', value: 'Cancelled' },
        ],
      },
      initialValue: 'Pending',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
};
