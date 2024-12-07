import { ConceptButton } from "@/components/Onboarding/Registration";
import { ConceptProps } from "@/types";

export const Concept = ({ selectedConcept, onConceptClick }: ConceptProps) => {
  return (
    <div className="flex flex-col gap-[0.75rem]">
      <ConceptButton
        isChecked={selectedConcept.includes(
          "악기나 성악, 오페라 등 음악 자체에 깊이 집중할 수 있는 클래식 공연이 좋아요.",
        )}
        onClick={() =>
          onConceptClick(
            "악기나 성악, 오페라 등 음악 자체에 깊이 집중할 수 있는 클래식 공연이 좋아요.",
          )
        }
      >
        악기나 성악, 오페라 등 음악 자체에
        <br />
        깊이 집중할 수 있는 클래식 공연이 좋아요.
      </ConceptButton>
      <ConceptButton
        isChecked={selectedConcept.includes(
          "무용, 발레 등 음악과 퍼포먼스를 모두 감상할 수 있는 공연이 좋아요.",
        )}
        onClick={() =>
          onConceptClick(
            "무용, 발레 등 음악과 퍼포먼스를 모두 감상할 수 있는 공연이 좋아요.",
          )
        }
      >
        무용, 발레 등 음악과 퍼포먼스를
        <br />
        모두 감상할 수 있는 공연이 좋아요.
      </ConceptButton>
    </div>
  );
};
