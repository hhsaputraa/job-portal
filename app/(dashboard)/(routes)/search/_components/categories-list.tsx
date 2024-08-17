"use client";

import { Category } from "@prisma/client";
import CategoriesListItem from "./category-list-item";

interface CategoriesListProps {
  categories: Category[];
}

const CategoriesList = ({ categories }: CategoriesListProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((category) => (
        <CategoriesListItem key={category.id} label={category.name} value={category.id} />
      ))}
    </div>
  );
};

export default CategoriesList;
