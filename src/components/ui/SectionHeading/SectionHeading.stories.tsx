import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SectionHeading } from "./SectionHeading";

const meta = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A section heading component that displays 'New Arrivals' with animated text effects.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SectionHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
