import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserProfileProviderContext } from "./providers/UserProfileProvider";
import CategoryForm from "./CategoryForm";
import { CategoryProviderContext } from "./providers/CategoryProvider";

function CategoryDashboard() {
    const { name, email, setUserProfile } = useContext(UserProfileProviderContext);
    const { categories, setCategories } = useContext(CategoryProviderContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCategories, setIsLoadingCategories] = useState(true);
    async function fetchCategories() {
        try {
            let token = localStorage.getItem("token");
            const options = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                    // Add any additional headers as needed
                },
            };
            const response = await fetch("https://library-crud-sample.vercel.app/api/category", options);

            if (!response.ok) {
                throw new Error("Failed to fetch Categories");
            }
            const data = await response.json();
            setCategories(data);
            setIsLoadingCategories(false);
        } catch (error) {
            alert(error);
        }
    }
    useEffect(() => {
        async function fetchUserProfile() {
            try {
                let token = localStorage.getItem("token");
                const options = {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                        // Add any additional headers as needed
                    },
                };
                const response = await fetch("https://library-crud-sample.vercel.app/api/user/profile", options);
                if (!response.ok) {
                    throw new Error("Failed to fetch User Profile");
                }
                const data = await response.json();
                setUserProfile(data);
                setIsLoading(false);
            } catch (error) {
                alert(error);
            }
        }

        fetchUserProfile();
        fetchCategories();
    }, []);

    const navigate = useNavigate();
    const handleLogout = async () => {
        let token = localStorage.getItem("token");
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
                // Add any additional headers as needed
            },
        };
        const response = await fetch("https://library-crud-sample.vercel.app/api/user/logout", options);
        const data = await response.json();
        localStorage.removeItem("token");
        navigate("/login");
    };

    const handleDelete = async (id: string) => {
        try {
            setIsLoadingCategories(true);
            let token = localStorage.getItem("token");
            const options = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                    // Add any additional headers as needed
                },
            };
            const response = await fetch(`https://library-crud-sample.vercel.app/api/category/${id}`, options);
            if (!response.ok) {
                throw new Error("Failed to Delete Category");
            }
            const data = await response.json();
            fetchCategories();
        } catch (error) {}
    };

    return (
        <div className="w-full h-screen">
            {isLoading == true ? (
                <h1 className="mt-24">Loading....</h1>
            ) : (
                <>
                    <nav className="bg-white border-gray-200 dark:bg-gray-900">
                        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                                Hello, {name}!
                            </span>
                            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                                <ul className="text-md flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="text-md block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <CategoryForm fetchCategories={fetchCategories} setIsLoadingCategories={setIsLoadingCategories} />
                    {isLoadingCategories && <h1 className="relative overflow-x-auto mt-6">Loading Categories ...</h1>}
                    {categories.length !== 0 && isLoadingCategories == false && (
                        <div className="relative overflow-x-auto mt-6">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Category ID
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Category Desc
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((cat) => {
                                        return (
                                            <tr
                                                key={`${cat.id}-row`}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {cat.id}
                                                </th>
                                                <td className="px-6 py-4"> {cat.category_name}</td>
                                                <td className="px-6 py-4">{cat.category_description}</td>
                                                <td className="px-6 py-4">
                                                    {" "}
                                                    <button
                                                        onClick={() => handleDelete(cat.id)}
                                                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default CategoryDashboard;
