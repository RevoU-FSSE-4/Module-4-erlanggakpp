import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginPage from "./LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import QuotesPage from "./QuotesPage";
import RegisterPage from "./RegisterPage";
import MyProfile from "./MyProfile";
import CredentialProvider from "./providers/CredentialProvider";
import PrivateRoute from "./PrivateRoute";
import UserProfileProvider from "./providers/UserProfileProvider";
import CategoryDashboard from "./CategoryDashboard";
import CategoryProvider from "./providers/CategoryProvider";
import { NotFoundComponent } from "./NotFoundComponent";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <CategoryProvider>
                    <UserProfileProvider>
                        <CredentialProvider>
                            <Routes>
                                <Route path="/register" Component={RegisterPage} />
                                <Route path="/quotes" Component={QuotesPage} />
                                <Route path="/login" Component={LoginPage} />
                                <Route path="/myprofile" Component={MyProfile} />
                                <Route path="/" Component={PrivateRoute}>
                                    <Route path="/myprofile" Component={MyProfile} />
                                    <Route path="/dashboard" Component={CategoryDashboard} />
                                </Route>
                                <Route path="/404" Component={NotFoundComponent} />
                                <Route path="*" element={<Navigate to="/404" replace />} />
                            </Routes>
                        </CredentialProvider>
                    </UserProfileProvider>
                </CategoryProvider>
            </header>
        </div>
    );
}

export default App;
