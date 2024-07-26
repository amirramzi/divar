"use client";

import { Input } from "@material-tailwind/react";
import { MdSearch } from "react-icons/md";
export default function SearchInput() {
  return (
    <div className="w-80 mr-6">
      <Input icon={<MdSearch />} size="md" />
    </div>
  );
}
