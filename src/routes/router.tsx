import Layout from "@/components/Layout";
import RoutePath from "./routePath";
import { createBrowserRouter, Outlet, RouteObject } from "react-router-dom";
import ScrollTop from "@/components/common/ScrollTop";

import { TosPage } from "@/pages/Tos/page";
import { LoginPage } from "@/pages/Login/page";
import { NicknameCreatePage } from "@/pages/Onboarding/UserRegistration/Nickname/page";
import { MainPage } from "@/pages/Main/page";
import { CompleteRegistrationPage } from "@/pages/Onboarding/CompleteRegistration/page";
import { SelectProfilePage } from "@/pages/Onboarding/UserRegistration/Profile/page";
import { SelectPricePage } from "@/pages/Onboarding/UserRegistration/Price/page";
import { SelectLocationPage } from "@/pages/Onboarding/UserRegistration/Location/page";
import { SelectConceptPage } from "@/pages/Onboarding/UserRegistration/Concept/page";
import { SelectFeaturePage } from "@/pages/Onboarding/UserRegistration/Feature/page";
import { ReviewPage } from "@/pages/Review/page";
import { ReviewDetailPage } from "@/pages/Review/[id]/page";
import { ShowDetailPage } from "@/pages/ShowDetail/page";
import { BrowsePage } from "@/pages/Browse/page";
import { ClacoBookPage } from "@/pages/TicketBook/page";
import { ClacoBookDetailPage } from "@/pages/TicketBook/[id]/page";
import { TicketInfoPage } from "@/pages/TicketCreate/Info/page";
import { TicketSearchPage } from "@/pages/TicketCreate/Search/page";
import { TicketReviewPage } from "@/pages/TicketCreate/Review/page";
import { TicketDownloadPage } from "@/pages/TicketCreate/Download/page";
import { ClacoTicketDetailPage } from "@/pages/Ticket/[id]/page";
import { MyPage } from "@/pages/Mypage/page";
import { ClacoTicketReviewEditPage } from "@/pages/Ticket/[id]/edit/page";
import { BeforeOnBoardingPage } from "@/pages/Login/Kakao/BeforeOnBoarding/page";
import { AfterOnBoardingPage } from "@/pages/Login/Kakao/AfterOnBoarding/page";
import AuthenticatedLayout from "./AuthenticatedLayout";
import { UserEditPage } from "@/pages/Mypage/UserEdit/page";
import { PreferenceEditPage } from "@/pages/Mypage/PreferenceEdit/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        <Outlet />
      </>
    ),
    children: [
      { index: true, element: <LoginPage /> },
      { path: RoutePath.BeforeOnBoarding, element: <BeforeOnBoardingPage /> },
      { path: RoutePath.Tos, element: <TosPage /> },
      { path: RoutePath.AfterOnBoarding, element: <AfterOnBoardingPage /> },
    ],
  },
  {
    path: "/",
    element: (
      <>
        <ScrollTop />
        <AuthenticatedLayout /> {/* 인증된 사용자만 접근 가능 */}
      </>
    ),
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: RoutePath.Main, element: <MainPage /> },
          { path: RoutePath.Browse, element: <BrowsePage /> },
          { path: RoutePath.TicketBook, element: <ClacoBookPage /> },
          { path: RoutePath.MyPage, element: <MyPage /> },
        ],
      },
      {
        path: RoutePath.Create,
        children: [
          { index: true, element: <NicknameCreatePage /> },
          { path: RoutePath.CreateProfile, element: <SelectProfilePage /> },
          { path: RoutePath.CreatePrice, element: <SelectPricePage /> },
          { path: RoutePath.CreateLocation, element: <SelectLocationPage /> },
          { path: RoutePath.CreateConcept, element: <SelectConceptPage /> },
          { path: RoutePath.CreateFeature, element: <SelectFeaturePage /> },
          {
            path: RoutePath.CreateComplete,
            element: <CompleteRegistrationPage />,
          },
        ],
      },
      { path: RoutePath.Show, element: <ShowDetailPage /> },
      {
        path: RoutePath.ShowReviews,
        children: [
          { index: true, element: <ReviewPage /> },
          { path: RoutePath.ShowReviewDetail, element: <ReviewDetailPage /> },
        ],
      },
      { path: RoutePath.TicketDetail, element: <ClacoTicketDetailPage /> },
      {
        path: RoutePath.TicketReviewEdit,
        element: <ClacoTicketReviewEditPage />,
      },
      { path: RoutePath.TicketBookDetail, element: <ClacoBookDetailPage /> },
      {
        path: RoutePath.TicketCreate,
        children: [
          { path: RoutePath.TicketSearch, element: <TicketSearchPage /> },
          { path: RoutePath.TicketInfo, element: <TicketInfoPage /> },
          { path: RoutePath.TicketReview, element: <TicketReviewPage /> },
          { path: RoutePath.TicketDownload, element: <TicketDownloadPage /> },
        ],
      },
      { path: RoutePath.MyPageUserEdit, element: <UserEditPage /> },
      {
        path: RoutePath.MyPagePreferenceEdit,
        element: <PreferenceEditPage />,
      },
    ],
  },
  { path: "*", element: <div>Not found page</div> },
];

const Router = createBrowserRouter(routes);

export default Router;
