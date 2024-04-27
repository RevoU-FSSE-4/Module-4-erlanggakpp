import React, { SetStateAction, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CategoryForm {
    categoryDescription: string;
    categoryName: string;
}

interface CategoryFormProps {
    fetchCategories: () => Promise<void>;
    setIsLoadingCategories: React.Dispatch<SetStateAction<boolean>>;
}

function CategoryForm({ fetchCategories, setIsLoadingCategories }: CategoryFormProps) {
    const [isLoading, setIsloading] = useState(false);
    async function handleSubmit(values: CategoryForm, resetForm: () => void) {
        try {
            setIsloading(true);
            let token = localStorage.getItem("token");
            const body = {
                category_name: values.categoryDescription,
                category_description: values.categoryName,
                is_active: true,
            };
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,

                    // Add any additional headers as needed
                },
                body: JSON.stringify(body),
            };
            const response = await fetch("https://library-crud-sample.vercel.app/api/category/create", options);
            if (!response.ok) {
                throw new Error("Failed to Create New Category");
            }
            const data = await response.json();
            setIsLoadingCategories(true);
            await fetchCategories();
            resetForm();
            setIsloading(false);
        } catch (error) {
            alert(error);
        }
    }

    const CategoryFormValidation = Yup.object({
        categoryDescription: Yup.string().required("Required"),
        categoryName: Yup.string().required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            categoryDescription: "",
            categoryName: "",
        },
        validationSchema: CategoryFormValidation,
        onSubmit: (values, { resetForm }) => {
            handleSubmit(values, resetForm);
        },
    });
    return (
        <div className="flex flex-col justify-center items-center mb-3">
            {isLoading ? (
                <h1>Submitting...</h1>
            ) : (
                <form className="flex flex-col w-2/6" onSubmit={formik.handleSubmit}>
                    <label className="block text-white text-sm font-bold mb-2 mt-2" htmlFor="categoryName">
                        Category Name
                    </label>
                    <input
                        type="text"
                        id="categoryName"
                        name="categoryName"
                        onChange={formik.handleChange}
                        className="required:border-red-500 shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formik.values.categoryName}
                    />
                    {formik.touched.categoryName && formik.errors.categoryName ? (
                        <div className="text-red-500 text-xs italic mt-1">{formik.errors.categoryName}</div>
                    ) : null}
                    <label className="block text-white text-sm font-bold mb-2 mt-2" htmlFor="categoryDescription">
                        Category Description
                    </label>
                    <input
                        className="required:border-red-500 shadow appearance-none text-sm border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="categoryDescription"
                        id="categoryDescription"
                        name="categoryDescription"
                        onChange={formik.handleChange}
                        value={formik.values.categoryDescription}
                    />
                    {formik.touched.categoryDescription && formik.errors.categoryDescription ? (
                        <div className="text-red-500 text-xs italic mt-1">{formik.errors.categoryDescription}</div>
                    ) : null}
                    <button
                        type="submit"
                        className="text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
}
export default CategoryForm;
