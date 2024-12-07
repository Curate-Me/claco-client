import { TicketReview } from "@/types";

import Review1 from "@/assets/images/poster1.gif";
import Review2 from "@/assets/images/poster2.gif";
import Review3 from "@/assets/images/poster3.webp";
import Review4 from "@/assets/images/poster4.gif";
import Review5 from "@/assets/images/poster5.gif";
import Review6 from "@/assets/images/poster6.gif";

import classical from "@/assets/images/Genre/classical.png";
import delicate from "@/assets/images/Genre/delicate.png";
import dynamic from "@/assets/images/Genre/dynamic.png";
import familiar from "@/assets/images/Genre/familiar.png";
import grand from "@/assets/images/Genre/grand.png";
import lyrical from "@/assets/images/Genre/lyrical.png";
import modern from "@/assets/images/Genre/modern.png";
import novel from "@/assets/images/Genre/novel.png";
import romantic from "@/assets/images/Genre/romantic.png";
import tragic from "@/assets/images/Genre/classical.png";

export const TICKET_REVIEW_MOCK_DATA: TicketReview[] = [
  {
    ticketReviewId: 1,
    concertName: "오페라의 유령",
    nickname: "사용자1",
    watchDate: "2024-11-14",
    createdDate: "2024-11-14",
    watchPlace: "예술의 전당",
    watchRound: "17:00",
    runningTime: "150분",
    castings:
      "홍향기, 한상이, 엄재용, 이혜민, 김현수, 서현재, 최윤희, 권태환, 이현준, 허요완, 강효형, 박세은, 이은혜, 이주희, 홍승연, 김승현",
    watchSit: "1층 3열",
    concertTags: [
      { tagCategoryId: 1, tagName: "웅장한", iconUrl: grand },
      { tagCategoryId: 2, tagName: "섬세한", iconUrl: delicate },
      { tagCategoryId: 3, tagName: "고전적인", iconUrl: classical },
      { tagCategoryId: 4, tagName: "현대적인", iconUrl: modern },
      { tagCategoryId: 5, tagName: "서정적인", iconUrl: lyrical },
    ],
    starRate: 3.5,
    content:
      "공연이 재미있어요. 특히 주인공의 노래 실력이 인상적이었고 무대 연출도 훌륭했습니다.",
    placeReviews: [
      { placeCategoryId: 1, categoryName: "음향이 좋았어요" },
      { placeCategoryId: 2, categoryName: "좌석 간격이 넓어요" },
      { placeCategoryId: 3, categoryName: "좌석이 불편해요" },
      { placeCategoryId: 4, categoryName: "시야가 탁 트여있어요" },
      { placeCategoryId: 5, categoryName: "주차가 편리해요" },
    ],
    imageUrlS: [{ imageUrl: Review1 }, { imageUrl: Review2 }],
    editor: true,
  },
  {
    ticketReviewId: 2,
    concertName: "지킬앤하이드",
    nickname: "공연매니아",
    watchDate: "2024-11-13",
    createdDate: "2024-11-13",
    watchPlace: "샤롯데씨어터",
    watchRound: "19:30",
    runningTime: "165분",
    castings:
      "서현재, 최윤희, 권태환, 이현준, 허요완, Marianela Nuñez, Vadim Muntagirov, Leo Dixon, Mayara Magri",
    watchSit: "1층 R석 15번",
    concertTags: [
      { tagCategoryId: 6, tagName: "역동적인", iconUrl: dynamic },
      { tagCategoryId: 7, tagName: "낭만적인", iconUrl: romantic },
      { tagCategoryId: 8, tagName: "비극적인", iconUrl: tragic },
      { tagCategoryId: 9, tagName: "친숙한", iconUrl: familiar },
      { tagCategoryId: 10, tagName: "새로운", iconUrl: novel },
    ],
    starRate: 5.0,
    content:
      "조승우의 변신이 정말 놀라웠습니다. 한 명의 배우가 두 개의 캐릭터를 완벽하게 소화해내는 모습이 인상적이었어요.",
    placeReviews: [
      { placeCategoryId: 6, categoryName: "음향이 아쉬웠어요" },
      { placeCategoryId: 7, categoryName: "좌석 간격이 좁아요" },
      { placeCategoryId: 8, categoryName: "좌석이 편안해요" },
      { placeCategoryId: 9, categoryName: "시야 확보가 어려워요" },
      { placeCategoryId: 10, categoryName: "주차 공간이 부족해요" },
    ],
    imageUrlS: [
      { imageUrl: Review3 },
      { imageUrl: Review4 },
      { imageUrl: Review5 },
    ],
    editor: false,
  },
  {
    ticketReviewId: 3,
    concertName: "라보엠",
    nickname: "오페라덕후",
    watchDate: "2024-11-12",
    createdDate: "2024-11-12",
    watchPlace: "세종문화회관",
    watchRound: "14:00",
    runningTime: "180분",
    castings: "김수미, 이지연",
    watchSit: "",
    concertTags: [
      { tagCategoryId: 3, tagName: "고전적인", iconUrl: classical },
      { tagCategoryId: 4, tagName: "현대적인", iconUrl: modern },
      { tagCategoryId: 6, tagName: "역동적인", iconUrl: dynamic },
      { tagCategoryId: 7, tagName: "낭만적인", iconUrl: romantic },
      { tagCategoryId: 8, tagName: "비극적인", iconUrl: tragic },
    ],
    starRate: 4.5,
    content:
      "파리의 겨울을 배경으로 한 무대 연출이 아름다웠고, 미미와 로돌포의 이중창이 특히 감동적이었습니다.",
    placeReviews: [
      { placeCategoryId: 1, categoryName: "음향이 좋았어요" },
      { placeCategoryId: 2, categoryName: "좌석 간격이 넓어요" },
      { placeCategoryId: 3, categoryName: "좌석이 불편해요" },
      { placeCategoryId: 4, categoryName: "시야가 탁 트여있어요" },
      { placeCategoryId: 5, categoryName: "주차가 편리해요" },
    ],
    imageUrlS: [{ imageUrl: Review6 }],
    editor: true,
  },
];
