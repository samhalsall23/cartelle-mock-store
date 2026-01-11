import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroup";

const meta = {
  title: "UI/ToggleGroup",
  component: ToggleGroup,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A toggle group component that allows users to select from a set of options. Items are visually connected with rounded ends.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
      description: "Whether to allow single or multiple selections",
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline"],
      description: "Visual style variant of the toggle group",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable all toggle items",
    },
  },
  args: {
    type: "single",
    variant: "outline",
    disabled: false,
  },
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Sizes: Story = {
  args: {
    type: "single",
    variant: "outline",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="xs" variant={args.variant}>
        XS
      </ToggleGroupItem>
      <ToggleGroupItem value="s" variant={args.variant}>
        S
      </ToggleGroupItem>
      <ToggleGroupItem value="m" variant={args.variant}>
        M
      </ToggleGroupItem>
      <ToggleGroupItem value="l" variant={args.variant}>
        L
      </ToggleGroupItem>
      <ToggleGroupItem value="xl" variant={args.variant}>
        XL
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const OutlineVariant: Story = {
  args: {
    type: "single",
    variant: "outline",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="left" variant="outline">
        Left
      </ToggleGroupItem>
      <ToggleGroupItem value="center" variant="outline">
        Center
      </ToggleGroupItem>
      <ToggleGroupItem value="right" variant="outline">
        Right
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const DefaultVariant: Story = {
  args: {
    type: "single",
    variant: "default",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="bold" variant="default">
        Bold
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" variant="default">
        Italic
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" variant="default">
        Underline
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const MultipleSelection: Story = {
  args: {
    type: "multiple",
    variant: "outline",
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="option1" variant={args.variant}>
        Option 1
      </ToggleGroupItem>
      <ToggleGroupItem value="option2" variant={args.variant}>
        Option 2
      </ToggleGroupItem>
      <ToggleGroupItem value="option3" variant={args.variant}>
        Option 3
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};

export const Disabled: Story = {
  args: {
    type: "single",
    variant: "outline",
    disabled: true,
  },
  render: (args) => (
    <ToggleGroup {...args}>
      <ToggleGroupItem value="xs" variant={args.variant}>
        XS
      </ToggleGroupItem>
      <ToggleGroupItem value="s" variant={args.variant}>
        S
      </ToggleGroupItem>
      <ToggleGroupItem value="m" variant={args.variant}>
        M
      </ToggleGroupItem>
    </ToggleGroup>
  ),
};
