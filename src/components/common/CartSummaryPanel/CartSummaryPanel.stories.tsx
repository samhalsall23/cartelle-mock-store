import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CartSummaryPanel } from "./CartSummaryPanel";

const meta = {
  title: "Cart/CartSummaryPanel",
  component: CartSummaryPanel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A summary panel component that displays cart totals including subtotal, shipping costs, and final total. Features a sticky positioning on desktop viewports and includes a checkout button. Typically displayed alongside cart items in the shopping cart page.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    summary: {
      control: "object",
      description: "Cart summary with subtotal, shipping, and total amounts",
    },
  },
} satisfies Meta<typeof CartSummaryPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    summary: {
      subtotal: "$1,234.56",
      shipping: "$15.00",
      total: "$1,249.56",
      itemCount: 5,
    },
  },
};

export const SmallOrder: Story = {
  args: {
    summary: {
      subtotal: "$29.99",
      shipping: "$8.00",
      total: "$37.99",
      itemCount: 1,
    },
  },
};

export const FreeShipping: Story = {
  args: {
    summary: {
      subtotal: "$495.00",
      shipping: "Free",
      total: "$495.00",
      itemCount: 2,
    },
  },
};

export const LargeOrder: Story = {
  args: {
    summary: {
      subtotal: "$12,459.99",
      shipping: "$25.00",
      total: "$12,484.99",
      itemCount: 25,
    },
  },
};

export const CalculatedShipping: Story = {
  args: {
    summary: {
      subtotal: "$156.50",
      shipping: "Calculated at checkout",
      total: "$156.50",
      itemCount: 3,
    },
  },
};

export const WithDiscount: Story = {
  args: {
    summary: {
      subtotal: "$199.99",
      shipping: "$10.00",
      total: "$209.99",
      itemCount: 4,
    },
  },
};

export const InSidebar: Story = {
  args: {
    summary: {
      subtotal: "$598.00",
      shipping: "$12.00",
      total: "$610.00",
      itemCount: 3,
    },
  },
  decorators: [
    (Story) => (
      <div className="flex gap-8">
        <div className="flex-1 min-h-150 bg-neutral-02 rounded-lg p-6">
          <p className="text-neutral-10">Cart items would go here...</p>
        </div>
        <Story />
      </div>
    ),
  ],
};

export const MobileView: Story = {
  args: {
    summary: {
      subtotal: "$345.00",
      shipping: "$10.00",
      total: "$355.00",
      itemCount: 6,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletView: Story = {
  args: {
    summary: {
      subtotal: "$789.99",
      shipping: "$15.00",
      total: "$804.99",
      itemCount: 8,
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
