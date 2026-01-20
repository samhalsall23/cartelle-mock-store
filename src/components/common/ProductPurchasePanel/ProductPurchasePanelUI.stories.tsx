import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProductPurchasePanelUI } from "./ProductPurchasePanelUI";

const meta = {
  title: "Common/ProductPurchasePanelUI",
  component: ProductPurchasePanelUI,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A panel component for purchasing a product, including price, quantity selection, and add-to-cart functionality.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    product: {
      control: "object",
      description: "Product object with sizes, name, price, and description.",
    },
    defaultSize: {
      control: "text",
      description: "Default selected size ID.",
    },
    isLoading: {
      control: "boolean",
      description: "Loading state for add to cart button.",
    },
    onAddToCart: {
      action: "addToCart",
      description: "Callback when add to cart is clicked.",
    },
  },
} satisfies Meta<typeof ProductPurchasePanelUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      id: "prod_1",
      name: "Mock Product",
      description: "A great product for testing.",
      price: "49.99",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: ["/assets/clothes-model.jpg"],
      slug: "mock-product",
      category: "DRESSES",
      sizeType: "Standard",
      sizes: [
        { id: "size_s", label: "S", productId: "prod_1", stock: 10 },
        { id: "size_m", label: "M", productId: "prod_1", stock: 5 },
      ],
    },
    defaultSize: "size_s",
    isLoading: false,
    isError: false,
    onAddToCart: async () => {},
  },
  render: (args) => (
    <div className="w-80">
      <ProductPurchasePanelUI {...args} />
    </div>
  ),
};
