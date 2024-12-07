import { FeatureType } from "@/types";
import grand from "@/assets/images/Genre/grand.png";
import delicate from "@/assets/images/Genre/delicate.png";
import classical from "@/assets/images/Genre/classical.png";
import modern from "@/assets/images/Genre/modern.png";
import lyrical from "@/assets/images/Genre/lyrical.png";
import dynamic from "@/assets/images/Genre/dynamic.png";
import romantic from "@/assets/images/Genre/romantic.png";
import tragic from "@/assets/images/Genre/tragic.png";
import familiar from "@/assets/images/Genre/familiar.png";
import novel from "@/assets/images/Genre/novel.png";

export const features: FeatureType[] = [
  {
    title: "웅장한",
    description: [
      "큰 규모의 오케스트라나 무대 장치,",
      "강렬한 감정이 느껴지는 공연",
    ],
    image: grand,
  },
  {
    title: "섬세한",
    description: [
      "작은 규모의 연주나 무대",
      "미세한 감정의 변화와 정교함이",
      "돋보이는 공연",
    ],
    image: delicate,
  },
  {
    title: "고전적인",
    description: [
      "고전적인 형식과 규칙을 따르는",
      "클래식 공연",
      "예) 고전 교향곡",
    ],
    image: classical,
  },
  {
    title: "현대적인",
    description: ["혁신적이고 새로운 형식의 공연", "예) 현대 무용"],
    image: modern,
  },
  {
    title: "역동적인",
    description: ["강한 움직임과 템포가 특징인", "빠르고 에너지 넘치는 공연"],
    image: dynamic,
  },
  {
    title: "서정적인",
    description: ["감정적으로 부드럽고 서정적인", "음악과 무대"],
    image: lyrical,
  },
  {
    title: "낭만적인",
    description: ["따뜻하고 감미로운 분위기로", "사랑과 감성을 주제로 한 공연"],
    image: romantic,
  },
  {
    title: "비극적인",
    description: ["슬프고 어두운 감정을 전달하는 공연"],
    image: tragic,
  },
  {
    title: "친숙한",
    description: [
      "대중들에게 친숙한 곡이나",
      "춤을 기반으로 한 공연",
      "예) 지브리 OST 공연, 비발디 ‘사계’ ",
    ],
    image: familiar,
  },
  {
    title: "새로운",
    description: ["평소 자주 들어보지 못했던", "새로운 곡을 기반으로 한 공연"],
    image: novel,
  },
];
