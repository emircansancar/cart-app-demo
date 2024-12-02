import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { RiSearchLine, RiShoppingCartLine, RiUserLine } from "@remixicon/react";
import { useMemo } from "react";

import { ThemeSwitch } from "@/components/theme-switch";
import { useAppStore } from "@/store/useAppStore";

export const Navbar = () => {
  const { products, cart, filters, setFilters, getTotalAmount } = useAppStore();

  const totalAmount = useMemo(() => getTotalAmount(), [products, cart]);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <RiSearchLine className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={filters.searchText}
      onChange={(e) =>
        setFilters((filters) => {
          filters.searchText = e.target.value;
        })
      }
    />
  );

  return (
    <NextUINavbar isBordered maxWidth="2xl" position="sticky">
      <NavbarContent>
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">Cart App Demo</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>
      {/* basis-3/6 */}
      <NavbarContent className="hidden sm:flex">
        <NavbarItem className="hidden lg:flex grow">{searchInput}</NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden md:flex gap-6">
          <ThemeSwitch />

          <div className="flex items-center gap-1">
            <RiShoppingCartLine /> {totalAmount.toFixed(2)} ₺
          </div>

          <div className="flex items-center gap-1">
            <RiUserLine /> UserName
          </div>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
