import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddToCartButton } from "./AddToCartButton";
import { CartDialogProvider } from "@/providers";

const meta = {
  title: "Common/AddToCartButton",
  component: AddToCartButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A button component for adding products to the cart. Handles loading state, triggers cart dialog, and supports animated width.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    productId: {
      control: "text",
      description: "ID of the product to add to cart",
    },
    productName: {
      control: "text",
      description: "Name of the product",
    },
    price: {
      control: "text",
      description: "Product price",
    },
    imageUrl: {
      control: "text",
      description: "Product image URL",
    },
    size: {
      control: "text",
      description: "Product size (optional)",
    },
    category: {
      control: "text",
      description: "Product category (optional)",
    },
    className: {
      control: "text",
      description: "Custom className",
    },
  },
} satisfies Meta<typeof AddToCartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    productId: "prod_123",
    productName: "Cashmere Blend Turtleneck Sweater",
    price: "495.00",
    imageUrl: "/assets/clothes-model.jpg",
    size: "M",
    category: "Luxury Knitwear",
    className: "",
  },
  render: (args) => (
    <CartDialogProvider>
      <AddToCartButton {...args} />
    </CartDialogProvider>
  ),
};
