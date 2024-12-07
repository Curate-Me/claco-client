import { Navigate, Outlet } from "react-router-dom";

const AuthenticatedLayout = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    console.log("로그인이 필요한 서비스입니다");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AuthenticatedLayout;
