
import { MenuCategory } from "@/components/menu/MenuCategory";

type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  available: boolean;
  image: string;
};

type Category = {
  id: string;
  name: string;
  items: MenuItem[];
};

type MenuCategoriesProps = {
  categories: Category[];
  expandedCategories: string[];
  toggleCategory: (categoryId: string) => void;
  onAddToCart: (item: MenuItem) => void;
};

export function MenuCategories({
  categories,
  expandedCategories,
  toggleCategory,
  onAddToCart
}: MenuCategoriesProps) {
  return (
    <div className="space-y-6 mb-6">
      {categories.map(category => (
        <MenuCategory
          key={category.id}
          id={category.id}
          name={category.name}
          items={category.items}
          isExpanded={expandedCategories.includes(category.id)}
          onToggle={toggleCategory}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
