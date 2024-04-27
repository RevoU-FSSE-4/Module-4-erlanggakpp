import React, { ReactNode, createContext, useState, SetStateAction } from "react";

interface CategoryProviderInterface {
    id: string;
    category_name: string;
    category_description: string;
    is_active: boolean;
}
interface CategoryContextInterface {
    categories: CategoryProviderInterface[];
    handleChangeCategories: (newCategory: CategoryProviderInterface) => void;
    setCategories: React.Dispatch<SetStateAction<CategoryProviderInterface[]>>;
}

export const CategoryProviderContext = createContext<CategoryContextInterface>({
    categories: [],
    handleChangeCategories: () => {},
    setCategories: () => {},
});

const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<CategoryProviderInterface[]>([]);
    const handleChangeCategories = (newCategory: CategoryProviderInterface) => {
        setCategories((oldcategories) => [...oldcategories, newCategory]);
    };
    return (
        <CategoryProviderContext.Provider value={{ categories, handleChangeCategories, setCategories }}>
            {children}
        </CategoryProviderContext.Provider>
    );
};

export default CategoryProvider;
