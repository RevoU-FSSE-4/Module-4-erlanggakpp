import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginPageForm {
    email: string;
    password: string;
}

function LoginPage() {
    const navigate = useNavigate();
    async function handleLogin(credential: LoginPageForm) {
        try {
            const body = {
                email: credential.email,
                password: credential.password,
            };
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Add any additional headers as needed
                },
                body: JSON.stringify(body),
            };
            console.log(body);

            const response = await fetch("https://library-crud-sample.vercel.app/api/user/login", options);
            if (!response.ok) {
                throw new Error("Failed to Login");
            }
            const data = await response.json();
            console.log(data);

            localStorage.setItem("token", data.token);
            navigate("/dashboard");
        } catch (error) {
            alert(error);
        }
    }

    const loginValidation = Yup.object({
        password: Yup.string()
            .min(6, "Password must be 8 characters long")
            .matches(/[0-9]/, "Password requires a number")
            .matches(/[a-z]/, "Password requires a lowercase letter")
            .matches(/[A-Z]/, "Password requires an uppercase letter")
            .matches(/[^\w]/, "Password requires a symbol"),
        email: Yup.string().email("Invalid email address").required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            email: "",
        },
        validationSchema: loginValidation,
        onSubmit: (values) => {
            handleLogin(values);
        },
    });
    return (
        <form className="flex flex-col" onSubmit={formik.handleSubmit}>
            <label className="block text-white text-md font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                className="required:border-red-500 shadow appearance-none text-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-xs italic mt-1">{formik.errors.email}</div>
            ) : null}
            <label className="block text-white text-md font-bold mb-2" htmlFor="password">
                Password
            </label>
            <input
                className="required:border-red-500 shadow appearance-none text-md border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-xs italic mt-1">{formik.errors.password}</div>
            ) : null}
            <button
                type="submit"
                className="text-white mt-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
}
export default LoginPage;
