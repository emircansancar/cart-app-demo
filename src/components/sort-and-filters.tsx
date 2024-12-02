import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useMemo, useState } from "react";
import { RiSearchLine } from "@remixicon/react";

import { useAppStore } from "@/store/useAppStore";
import { SortOptionsEnum } from "@/constants/main-constants";

function SortAndFilters() {
  const { sortBy, setSortBy, setFilters, products, getBrands, getModels } =
    useAppStore();

  const [searchInputBrand, setSearchInputBrand] = useState("");
  const [searchInputModel, setSearchInputModel] = useState("");

  const brands = useMemo(
    () =>
      getBrands().filter((brand) =>
        brand.toLowerCase().includes(searchInputBrand.toLowerCase()),
      ),
    [products, searchInputBrand],
  );

  const models = useMemo(
    () =>
      getModels().filter((brand) =>
        brand.toLowerCase().includes(searchInputModel.toLowerCase()),
      ),
    [products, searchInputModel],
  );

  return (
    <>
      <Card>
        <CardBody>
          <RadioGroup
            label="Sort By"
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOptionsEnum)}
          >
            <Radio value={SortOptionsEnum.CREATED_AT_ASC}>Old to new</Radio>
            <Radio value={SortOptionsEnum.CREATED_AT_DESC}>New to old</Radio>
            <Radio value={SortOptionsEnum.PRICE_ASC}>Price hight to low</Radio>
            <Radio value={SortOptionsEnum.PRICE_DESC}>Price low to high</Radio>
          </RadioGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <div className="text-md text-default-500 mb-3">Brands</div>
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              labelPlacement="outside"
              placeholder="Search..."
              startContent={
                <RiSearchLine className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
              value={searchInputBrand}
              onChange={(e) => setSearchInputBrand(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardBody className="max-h-48 overflow-y-scroll">
          <CheckboxGroup
            onChange={(value) =>
              setFilters((filters) => {
                filters.brand = value;
              })
            }
          >
            {brands.map((brand) => (
              <Checkbox key={brand} value={brand}>
                {brand}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <div className="text-md text-default-500 mb-3">Models</div>
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              labelPlacement="outside"
              placeholder="Search..."
              startContent={
                <RiSearchLine className="text-base text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="search"
              value={searchInputModel}
              onChange={(e) => setSearchInputModel(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardBody className="max-h-48 overflow-y-scroll">
          <CheckboxGroup
            onChange={(value) =>
              setFilters((filters) => {
                filters.model = value;
              })
            }
          >
            {models.map((model) => (
              <Checkbox key={model} value={model}>
                {model}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </CardBody>
      </Card>
    </>
  );
}

export default SortAndFilters;
