import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Navbar } from "./Navbar";

const meta = {
  title: "Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main navigation bar component for the Cartelle mock store. Contains brand name, navigation links, and search icon.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "The default navbar appearance with all navigation links.",
      },
    },
  },
};
