import { ReactComponent as Home } from "@/assets/svgs/home.svg";
import { ReactComponent as Search } from "@/assets/svgs/search.svg";
import { ReactComponent as Ticket } from "@/assets/svgs/ticket.svg";
import { ReactComponent as User } from "@/assets/svgs/user.svg";
import { useLocation, useNavigate } from "react-router-dom";

const CATEGORIES = [
  {
    text: "홈",
    image: <Home />,
    path: "/main",
  },
  {
    text: "둘러보기",
    image: <Search />,
    path: "/browse",
  },
  {
    text: "티켓북",
    image: <Ticket />,
    path: "/ticketbook",
  },
  {
    text: "마이페이지",
    image: <User />,
    path: "/mypage",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveCategory = () => {
    const currentCategory = CATEGORIES.find(
      (category) => category.path === location.pathname
    );
    return currentCategory?.text || CATEGORIES[0].text;
  };

  const handleFooter = (category: string) => {
    const targetCategory = CATEGORIES.find((item) => item.text === category);
    if (targetCategory) {
      navigate(targetCategory.path);
    }
  };

  return (
    <footer className="h-[74px] w-screen max-w-[450px] text-common-white bg-[#202020] shadow-footer fixed bottom-0 z-50">
      <div className="flex justify-around space-x-5 px-5 py-[10px]">
        {CATEGORIES.map((category, index) => (
          <div
            key={index}
            className={`flex-col items-center justify-center w-13 h-6 text-center cursor-pointer ${
              getActiveCategory() === category.text ? "text-primary-500" : ""
            }`}
            onClick={() => handleFooter(category.text)}
          >
            <span className="flex justify-center">{category.image}</span>
            <span
              className={`text-[11px] ${
                getActiveCategory() === category.text
                  ? "font-bold"
                  : "font-medium"
              } leading-none`}
            >
              {category.text}
            </span>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
