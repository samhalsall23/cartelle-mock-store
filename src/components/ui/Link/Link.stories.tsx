import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link } from "./Link";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A flexible link component with different styling variants for various backgrounds.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "on-dark", "on-dark-secondary"],
      description: "Visual style variant of the link",
    },
    href: {
      control: { type: "text" },
      description: "URL or path the link points to",
    },
    text: {
      control: { type: "text" },
      description: "Text content displayed in the link",
    },
  },
  args: {
    href: "#",
    text: "Click me",
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: "/home",
    text: "Home Page",
    variant: "default",
  },
};

export const OnDark: Story = {
  args: {
    href: "/about",
    text: "About Us",
    variant: "on-dark",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};

export const OnDarkSecondary: Story = {
  args: {
    href: "/contact",
    text: "Contact",
    variant: "on-dark-secondary",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
};
