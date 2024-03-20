import classNames from 'classnames';
import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import ElementLine from '../ElementLine/ElementLine';
import Element from '../Element/Element';
import { ElementType } from '@type/element';
import { SelectedCaseContext } from '@components/contexts/SelectedCaseContext';

interface CaseElementProps extends PropsWithChildren {
  data: ElementType;
  isFirst: boolean;
}

const CaseElement = ({ data, isFirst = false }: CaseElementProps) => {
  const { setSelectedCase } = useContext(SelectedCaseContext);
  const [isSelected, setIsSelected] = useState<boolean>(isFirst);

  useEffect(() => {
    if (isFirst) {
      setSelectedCase((prevSelectedCase) => {
        const caseIndex = prevSelectedCase.findIndex(
          (item) => item.id === data.id,
        );
        // 이미 리스트에 요소가 없다면 추가합니다.
        if (caseIndex === -1) {
          return [...prevSelectedCase, data];
        } else {
          // 이미 리스트에 요소가 있다면 기존 상태를 유지합니다.
          return prevSelectedCase;
        }
      });
    }
  }, [isFirst, data, setSelectedCase]);

  const handleIsSelected = useCallback(() => {
    setIsSelected((prev) => !prev);
    setSelectedCase((prevSelectedCase) => {
      const caseIndex = prevSelectedCase.findIndex(
        (item) => item.id === data.id,
      );
      const newSelectedCase = [...prevSelectedCase];
      if (caseIndex === -1) {
        newSelectedCase.push(data);
      } else {
        newSelectedCase.splice(caseIndex, 1);
      }
      return newSelectedCase;
    });
  }, [data, setSelectedCase]);

  return (
    <div id={`case-${data.name}`} className="relative flex items-center">
      <ElementLine />
      <Element
        color="case"
        className={classNames({
          '!border-orange-400 text-orange-400': isSelected,
        })}
        onClick={handleIsSelected}
      >
        {data.name}
      </Element>
    </div>
  );
};

export default CaseElement;
