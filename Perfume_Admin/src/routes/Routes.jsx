import Login from "../pages/auth/Login";
import Banner from "../pages/Dashboard/Banner/Banner";
import Coupon from "../pages/Dashboard/Banner/Coupon";
import Slider from "../pages/Dashboard/Banner/Slider";
import Home from "../pages/Dashboard/home/Home";
import OrderStatus from "../pages/Dashboard/Order_Config/OrderStatus";
import Products from "../pages/Dashboard/Product/Product";
import Product_Inquiry from "../pages/Dashboard/Product_Inquiry/Product_Inquiry";
import AllOrders from "../pages/Dashboard/Order_Config/AllOrders";
import PaymentMethod from "../pages/Dashboard/Website_Config/PaymentMethod";
import ShippingPartners from "../pages/Dashboard/Website_Config/ShippingPartners";
import SocialLinks from "../pages/Dashboard/Website_Config/SocialLinks";
import Variants from "../pages/Dashboard/Product_Config/Variants";
import Category from "../pages/Dashboard/Product_Config/Category";
import Addproduct from "../pages/Dashboard/Product/Addproduct";
import Brand from "../pages/Dashboard/Product_Config/Brand";
import Add_SubAdmin from "../pages/Dashboard/Sub_Admin/Add_SubAdmin";
import AllSubAdmins from "../pages/Dashboard/AllSubAdmins/AllSubAdmins";
import Stock from "../pages/Dashboard/Stock/Stock";
import InquiryEmail from "../pages/Dashboard/InquiryEmial/InquiryEmail";


// import NotFound from "../pages/NotFound";

export const privateRoutes = [
  {
    path: "/dashboard",
    element: <Home />
  },
  {
    path: "/slider",
    element: <Slider />,
  },
  {
    path: "/banner",
    element: <Banner />
  },
  {
    path: "/coupon",
    element: <Coupon />
  },
  {
    path: "/product-inquiry",
    element: <Product_Inquiry />
  },
  {
    path: "/products",
    element: <Products />
  },
  {
    path: "/category",
    element: <Category />
  },
  {
    path: "/variants",
    element: <Variants />
  },
  {
    path: "/brands",
    element: <Brand />
  },
  {
    path: "/order-status",
    element: <OrderStatus />
  },
  {
    path: "/all-orders",
    element: <AllOrders />
  },
  {
    path: "/payment-method",
    element: <PaymentMethod />
  },
  {
    path: "/shipping-partners",
    element: <ShippingPartners />
  },
  {
    path: "/social-links",
    element: <SocialLinks />
  },
  {
    path: "/products/add-product",
    element: <Addproduct />
  },
  {
    path: "/products/edit-product/:id",
    element: <Addproduct />
  },
  {
    path: "/addSubAdmin",
    element: <Add_SubAdmin />
  },
  {
    path: "/AllSubAdmins",
    element: <AllSubAdmins />
  },
  {
    path: "/stock",
    element: <Stock />
  },
  {
    path: "/inquiry-emails",
    element: <InquiryEmail />
  }
];

export const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  }
];
