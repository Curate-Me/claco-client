const RoutePath = {
  /*로그인 페이지 */
  Login: "/",
  BeforeOnBoarding: "/oauth/callback/sign-up",
  AfterOnBoarding: "/oauth/callback/main",

  /*약관동의 페이지 */
  Tos: "/tos",

  /*온보딩 관련 페이지 */
  Create: "/create",
  CreateProfile: "/create/profile",
  CreatePrice: "/create/price",
  CreateLocation: "/create/location",
  CreateConcept: "/create/concept",
  CreateFeature: "/create/feature",
  CreateComplete: "/create/complete",

  /*메인 페이지 */
  Main: "/main",

  /*공연 상세보기 페이지 */
  Show: "/show/:id",

  /*공연 리뷰 보기 페이지 */
  ShowReviews: "/show/:id/reviews",
  ShowReviewDetail: "/show/:id/reviews/:reviewId",

  /*둘러보기 페이지 */
  Browse: "/browse",

  /*클라코북 페이지 */
  TicketBook: "/ticketbook",
  TicketBookDetail: "/ticketbook/:id",

  /*클라코 티켓 페이지 */
  TicketDetail: "/ticket/:id",
  TicketReviewEdit: "/ticket/:id/edit",

  /*클라코 티켓 등록 페이지 */
  TicketCreate: "/ticketcreate",
  TicketSearch: "/ticketcreate/search",
  TicketInfo: "/ticketcreate/info",
  TicketReview: "/ticketcreate/review",
  TicketDownload: "/ticketcreate/download",

  /*마이 페이지 */
  MyPage: "/mypage",
  MyPageUserEdit: "/mypage/user",
  MyPagePreferenceEdit: "/mypage/preference",
} as const;

export default RoutePath;
