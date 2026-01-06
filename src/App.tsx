import './App.scss'
import {RouterProvider} from "react-router";
import router from "./router.tsx";
import {BookingProvider} from "./modules/booking/context/booking-context.tsx";

function App() {
    return (
        <BookingProvider>
            <RouterProvider router={router} />
        </BookingProvider>
  )
}

export default App
