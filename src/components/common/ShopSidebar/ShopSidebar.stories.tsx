import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ShopSidebar } from "./ShopSidebar";

const meta = {
  title: "Base/ShopSidebar",
  component: ShopSidebar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A navigation sidebar component for the shop page. Displays category filters including 'All', 'New arrivals', and an expandable 'Collections' accordion with seasonal collections.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ShopSidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    collections: [
      { href: "/shop/collections/shorts", label: "Shorts" },
      { href: "/shop/collections/spring-summer", label: "Spring/Summer" },
      { href: "/shop/collections/fall-winter", label: "Fall/Winter" },
    ],
  },
};

export const CollectionsOpen: Story = {
  args: {
    collections: [
      { href: "/shop/collections/shorts", label: "Shorts" },
      { href: "/shop/collections/spring-summer", label: "Spring/Summer" },
      { href: "/shop/collections/fall-winter", label: "Fall/Winter" },
    ],
    collectionsOpenByDefault: true,
  },
};
