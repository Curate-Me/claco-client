import { ReactComponent as ClacoMain } from "@/assets/svgs/Claco_Main.svg";
import { ReactComponent as Light } from "@/assets/svgs/Light.svg";
import { ClacoAnalysisCard } from "@/components/common/ClacoAnalysisCard";

export const ClassicalPalette = () => {
  return (
    <div className="py-[22px] px-6">
      <div className="mb-[29px]">
        <ClacoMain />
      </div>
      <ClacoAnalysisCard type="main" />
      <div className="flex items-center justify-center">
        <Light />
      </div>
    </div>
  );
};
