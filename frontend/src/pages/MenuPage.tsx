import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { MenuItem, Category } from '../types';
import { menuAPI } from '../services/api';


const categories: { value: Category; label: string }[] = [
  { value: 'appetizers', label: 'Appetizers' },
  { value: 'main_courses', label: 'Main Courses' },
  { value: 'desserts', label: 'Desserts' },
  { value: 'drinks', label: 'Drinks' },
  { value: 'specials', label: 'Specials' },
];

const MenuPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

  useEffect(() => {

    const fetchMenuItems = async () => {
      const response = await menuAPI.getMenuItems();
      setMenuItems(response.data  as MenuItem[]);
    };
    fetchMenuItems();
  }, []);

  // Filter items based on search term and category
  useEffect(() => {
    let filtered = [...menuItems];
    
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchTerm, selectedCategory, menuItems]);

  return (
    <div className="min-h-screen bg-lemon-light">
      {/* Hero Section */}
      <div className="bg-lemon-primary text-white py-16">
        <div className="container-custom">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-center">
            Our Menu
          </h1>
          <p className="text-center max-w-2xl mx-auto text-lg">
            Explore our diverse selection of Mediterranean dishes crafted with fresh, locally-sourced ingredients.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-lemon-gray" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search menu items..."
              className="input-field pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="md:w-72 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="w-5 h-5 text-lemon-gray" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category | '')}
              className="input-field pl-10 appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container-custom py-8">
        {categories.map((category) => {
          const categoryItems = filteredItems.filter(
            (item) => 
              !selectedCategory || // If no category is selected, show all categories
              selectedCategory === item.category // Otherwise only show selected category
          ).filter(item => 
            !selectedCategory && item.category === category.value // When no category filter, group by category
          );
          
          // Skip rendering category if it has no items to show
          if (selectedCategory && selectedCategory !== category.value) return null;
          if (!selectedCategory && categoryItems.length === 0) return null;

          return (
            <div key={category.value} className="mb-12">
              {!selectedCategory && (
                <h2 className="font-heading text-3xl font-bold mb-6 text-lemon-primary">{category.label}</h2>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(selectedCategory ? filteredItems : categoryItems).map((item) => (
                  <div key={item.id} className="card group hover:scale-[1.02] transition-transform duration-300">
                    <div className="relative h-52 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                      {item.category === 'specials' && (
                        <div className="absolute top-4 left-4 bg-lemon-secondary text-lemon-dark px-3 py-1 rounded-full font-medium text-sm">
                          Special
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-heading text-xl font-semibold">{item.name}</h3>
                        <span className="text-lemon-accent font-bold">${item.price.toFixed(2)}</span>
                      </div>
                      <p className="text-lemon-gray mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      {/* <button className="btn btn-outline w-full">Add to Cart</button> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No menu items found</h3>
            <p className="text-lemon-gray">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage;