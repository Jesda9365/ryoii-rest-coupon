var routes = [
  {
    path: "/",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    layout: "#S",
  },
  {
    path: "/admin/brand-restaurants",
    name: "Brand Restaurant",
    icon: "ni ni-badge text-primary",
    layout: "/admin",
  },
  {
    path: "/admin/restaurants",
    name: "Restaurants",
    icon: "ni ni-shop text-primary",
    layout: "/admin",
  },
  {
    path: "/admin/master-coupons",
    name: "Master Coupon",
    icon: "ni ni-archive-2 text-primary",
    layout: "/admin",
  },  
  {
    path: "/admin/coupons",
    name: "Coupons",
    icon: "ni ni-bullet-list-67 text-primary",
    layout: "/admin",
  },
  {
    path: "#",
    name: "Coupon Alarm",
    icon: "fa fa-bell text-danger",
    layout: "/admin",
  },
  {
    path: "#",
    name: "Transactions",
    icon: "ni ni-book-bookmark text-primary",
    layout: "/admin",
  },
  {
    path: "/admin/users",
    name: "Member",
    icon: "fa fa-address-book text-primary",
    layout: "/admin",
  },
  {
    path: "/admin/users",
    name: "Restaurant User",
    icon: "fa fa-users text-primary",
    layout: "/admin",
  },
  {
    path: "/admin/users",
    name: "Admin User",
    icon: "fa fa-user-circle text-primary",
    layout: "/admin",
  },
  {
    path: "#",
    name: "Settings",
    icon: "ni ni-settings text-primary",
    layout: "/admin",
  },
  /*{
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    layout: "/auth",
  },*/
];
export default routes;
