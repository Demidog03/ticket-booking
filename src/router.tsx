import {createBrowserRouter} from "react-router";
import MainLayout from "./shared/ui/layouts/main.layout.tsx";
import HomePage from "./pages/home.page.tsx";
import SearchResultsPage from "./pages/search-results.page.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                index: true, // path: "/",
                element: <HomePage/>
            },
            {
                path: 'search-results',
                element: <SearchResultsPage/>
            }
        ]
    },
    {
        path: "/test",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <div>Test Page</div>
            }
        ]
    },
]);

export default router;