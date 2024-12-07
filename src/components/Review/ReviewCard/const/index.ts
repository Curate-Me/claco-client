import Profile from "@/assets/images/profile.png";
import ReviewImage from "@/assets/images/review.png";
import Review1 from "@/assets/images/poster1.gif";
import Review2 from "@/assets/images/poster2.gif";
import Review3 from "@/assets/images/poster3.webp";
import Review4 from "@/assets/images/poster4.gif";
import Review5 from "@/assets/images/poster5.gif";
import Review6 from "@/assets/images/poster6.gif";
import Review7 from "@/assets/images/poster7.gif";
import { Review } from "@/types";

export const REVIEW_MOCK_DATA: Review[] = [
  {
    ticketReviewId: 1,
    userName: "울랄라",
    profileImage: Profile,
    createdDate: "2024.10.27",
    watchSit: "9층 B열 14번",
    starRate: 4.0,
    content:
      "크리스마스 밤, 클라라의 집에서 뭐가 벌어지는 것 같긴한데, 내용이 어떻게 될까요. 저는 모르겠습니다만 이렇게 두줄이 넘어가면 말줄임이 되어야 하지 않을까",
    reviewImages: [{ imageUrl: Review6 }, { imageUrl: Review1 }],
    placeReviews: [
      { placeCategoryId: 1, categoryName: "음향이 좋아요" },
      { placeCategoryId: 2, categoryName: "좌석 간격이 넓어요" },
      { placeCategoryId: 3, categoryName: "좌석이 편안해요" },
      { placeCategoryId: 4, categoryName: "시야가 탁 트여있어요" },
      { placeCategoryId: 5, categoryName: "주차가 편리해요" },
    ],
    tagReviews: [
      { tagCategoryId: 1, tagName: "웅장한", iconUrl: "https://..." },
      { tagCategoryId: 2, tagName: "섬세한", iconUrl: "https://..." },
    ],
  },
  {
    ticketReviewId: 2,
    userName: "발레러버",
    profileImage: Profile,
    createdDate: "2024.10.25",
    watchSit: "1층 R열 23번",
    starRate: 4.5,
    content:
      "발레단의 움직임이 정말 아름다웠어요. 특히 주인공의 독무 장면은 잊을 수 없을 것 같네요. 공연장의 분위기도 좋았고 객석에서 보이는 각도도 훌륭했습니다.",
    reviewImages: [
      { imageUrl: ReviewImage },
      { imageUrl: Review4 },
      { imageUrl: Review5 },
    ],
    placeReviews: [
      { placeCategoryId: 4, categoryName: "시야가 탁 트여있어요" },
      { placeCategoryId: 3, categoryName: "좌석이 편안해요" },
      { placeCategoryId: 1, categoryName: "음향이 좋아요" },
      { placeCategoryId: 5, categoryName: "주차가 편리해요" },
    ],
    tagReviews: [
      { tagCategoryId: 2, tagName: "섬세한", iconUrl: "https://..." },
      { tagCategoryId: 3, tagName: "고전적인", iconUrl: "https://..." },
    ],
  },
  {
    ticketReviewId: 3,
    userName: "공연매니아",
    profileImage: Profile,
    createdDate: "2024.10.23",
    watchSit: "2층 C열 7번",
    starRate: 3.5,
    content:
      "무용수들의 실력은 훌륭했지만, 좌석이 좀 불편했네요. 앞좌석과의 간격이 좁아서 무릎이 불편했어요. 하지만 공연 자체는 매우 인상적이었습니다.무용수들의 실력은 훌륭했지만, 좌석이 좀 불편했네요. 앞좌석과의 간격이 좁아서 무릎이 불편했어요. 하지만 공연 자체는 매우 인상적이었습니다.무용수들의 실력은 훌륭했지만, 좌석이 좀 불편했네요. 앞좌석과의 간격이 좁아서 무릎이 불편했어요. 하지만 공연 자체는 매우 인상적이었습니다.무용수들의 실력은 훌륭했지만, 좌석이 좀 불편했네요. 앞좌석과의 간격이 좁아서 무릎이 불편했어요. 하지만 공연 자체는 매우 인상적이었습니다.",
    reviewImages: [],
    placeReviews: [
      { placeCategoryId: 6, categoryName: "좌석 간격이 좁아요" },
      { placeCategoryId: 7, categoryName: "시야 확보가 어려워요" },
      { placeCategoryId: 1, categoryName: "음향이 좋아요" },
      { placeCategoryId: 8, categoryName: "주차 공간이 부족해요" },
    ],
    tagReviews: [
      { tagCategoryId: 1, tagName: "웅장한", iconUrl: "https://..." },
    ],
  },
  {
    ticketReviewId: 4,
    userName: "클래식팬",
    profileImage: Profile,
    createdDate: "2024.10.20",
    watchSit: "VIP석 A열 12번",
    starRate: 5.0,
    content:
      "오케스트라의 연주가 정말 완벽했어요! 음향 시설이 잘 되어있어서 섬세한 소리까지 잘 들렸고, VIP석이라 그런지 시야도 정말 좋았습니다. 다음에도 또 오고 싶네요.",
    reviewImages: [
      { imageUrl: Review2 },
      { imageUrl: Review3 },
      { imageUrl: Review4 },
    ],
    placeReviews: [
      { placeCategoryId: 1, categoryName: "음향이 좋아요" },
      { placeCategoryId: 4, categoryName: "시야가 탁 트여있어요" },
      { placeCategoryId: 3, categoryName: "좌석이 편안해요" },
      { placeCategoryId: 2, categoryName: "좌석 간격이 넓어요" },
      { placeCategoryId: 5, categoryName: "주차가 편리해요" },
    ],
    tagReviews: [
      { tagCategoryId: 1, tagName: "웅장한", iconUrl: "https://..." },
      { tagCategoryId: 2, tagName: "섬세한", iconUrl: "https://..." },
      { tagCategoryId: 3, tagName: "고전적인", iconUrl: "https://..." },
    ],
  },
  {
    ticketReviewId: 5,
    userName: "드라큘미",
    profileImage: Profile,
    createdDate: "2024.11.14",
    watchSit: "VIP석 C열 8번",
    starRate: 5.0,
    content:
      "크리스마스 밤, 클라라의 집에서 뭐가 벌어지는 것 같긴한데, 내용이 어떻게 될까요...(중략)...지금은 열시다",
    reviewImages: [
      { imageUrl: Review4 },
      { imageUrl: Review2 },
      { imageUrl: Review7 },
    ],
    placeReviews: [
      { placeCategoryId: 1, categoryName: "음향이 좋아요" },
      { placeCategoryId: 4, categoryName: "시야가 탁 트여있어요" },
      { placeCategoryId: 3, categoryName: "좌석이 편안해요" },
      { placeCategoryId: 2, categoryName: "좌석 간격이 넓어요" },
      { placeCategoryId: 5, categoryName: "주차가 편리해요" },
    ],
    tagReviews: [
      { tagCategoryId: 1, tagName: "웅장한", iconUrl: "https://..." },
      { tagCategoryId: 5, tagName: "서정적인", iconUrl: "https://..." },
    ],
  },
];

/*
음향이 좋아요
음향이 나빠요
좌석 간격이 넓어요
좌석 간격이 좁아요
좌석이 편안해요
좌석이 불편해요
시야가 탁 트여있어요
시야 확보가 어려워요
주차가 편리해요
주차 공간이 부족해요
*/
