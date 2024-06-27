import { Navigate, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Orders from "../pages/Orders";
import Payment from "../pages/Payment";
import MainLayout from "../components/Layouts/MainLayout";
import SingleProductDetails from "../pages/Products/components/SingleProductDetails";
import NotFoundPage from "../pages/404Page/NotFoundPage";
import OrdersHistory from "../pages/OrdersHistory/OrdersHistory";
import SingleOrder from "../pages/OrdersHistory/SingleOrder";
import CardPage from "../pages/Payment/CardPage/CardPage"
import OtpPage from "../pages/Payment/CardPage/OtpPage";

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout />
        }
      >
        <Route index element={<Navigate to="/home" />} />
        <Route  path="home" element={<Main />} />
        <Route index path="home/:id" element={<Main />} />
        {/* <Route index path="/:id/:productId" element={<SingleProductDetails />} /> */}
        <Route path="home/:id/orders" element={<Orders />} />
        <Route path="home/:id/orders-history" element={<OrdersHistory />} />
        <Route path="home/:id/orders-history/:orderId" element={<SingleOrder />} />
        <Route path="home/:id/payment" element={<Payment />}/>
        <Route path="home/:id/payment/card-page" element={<CardPage />}/>
        <Route path="home/:id/payment/card-page/otp-page" element={<OtpPage />}/>
        <Route path="home/:id/*" element={<NotFoundPage />}/>

        {/* <Route path="*" element={<NotFoundPage />} /> */}
        
      </Route>
    </Routes>
  );
}
