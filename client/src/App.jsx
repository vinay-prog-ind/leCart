import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Applayout from "./Applayout";
import AddProduct from "./components/AddProduct";
import Test from "./components/Test";
import { useUser } from "./context/users/useUser";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CategoriesProvider from "./context/categories/CategoriesProvider";
import Product from "./pages/Product";
import AdminLogin from "./pages/AdminLogin";
const queryClient = new QueryClient();

const ProtectedRoute = ({ isAuthenticated }) => {
    return isAuthenticated !== null ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};
const AdminProtected = ({ role }) => {
    return role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
};
function App() {
    const { username, role } = useUser();

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools />
                <CategoriesProvider>
                    <Router>
                        <Routes>
                            <Route
                                element={
                                    <ProtectedRoute
                                        isAuthenticated={username}
                                    />
                                }>
                                <Route element={<Applayout />}>
                                    <Route path="/test" element={<Test />} />
                                    <Route path="/" element={<Landing />} />
                                    <Route
                                        path="/product/:id"
                                        element={<Product />}
                                    />
                                  <Route element={<AdminProtected role={role} />}>
                                      <Route
                                          path="/admin/new"
                                          element={<AddProduct />}
                                      />
                                  </Route>
                                </Route>
                            </Route>
                            <Route
                                path="/login/admin"
                                element={<AdminLogin />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Router>
                </CategoriesProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
