import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { NavbarSubMenu } from "./NavbarSubMenu";

const meta = {
  title: "Base/Navbar/NavbarSubMenu",
  component: NavbarSubMenu,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The dropdown submenu component for the navigation bar. Displays additional navigation options when triggered.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NavbarSubMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Show: Story = {
  args: {
    show: true,
    categories: ["All", "New Arrivals"],
    collections: ["Skincare Products", "Furniture", "Technology", "Clothing"],
  },
  parameters: {
    docs: {
      description: {
        story: "The default navbar dropdown submenu appearance.",
      },
    },
  },
};

export const ButtonToShow: Story = {
  args: {
    show: false,
    categories: ["All", "New Arrivals"],
    collections: ["Skincare Products", "Furniture", "Technology", "Clothing"],
  },
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <div className="p-4">
        <button
          onClick={() => setShow(!show)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {show ? "Hide" : "Show"} Submenu
        </button>
        <NavbarSubMenu
          show={show}
          categories={["All", "New Arrivals"]}
          collections={[
            "Skincare Products",
            "Furniture",
            "Technology",
            "Clothing",
          ]}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive story with a button to toggle the submenu visibility. Click the button to see the smooth animations.",
      },
    },
  },
};
