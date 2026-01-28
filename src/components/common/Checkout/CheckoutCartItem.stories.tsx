import type { Meta, StoryObj } from '@storybook/react';
import CheckoutCartItem from './CheckoutCartItem';

const meta: Meta<typeof CheckoutCartItem> = {
  title: 'Common/Checkout/CheckoutCartItem',
  component: CheckoutCartItem,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CheckoutCartItem>;

export const Default: Story = {
  args: {
    // Provide default props here
    // Example:
    // product: { id: '1', name: 'Sample Product', price: 19.99, ... },
    // quantity: 1,
  },
};
