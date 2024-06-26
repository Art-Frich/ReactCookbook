import { useEffect, useState } from 'react';
import HelpBubble from './HelpBubble';

function isVisible(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}

const HelpSequence = (props) => {
  const [position, setPosition] = useState(0);
  const [sequence, setSequence] = useState();

  useEffect(() => {
    if (props.sequence) {
      const filter = props.sequence.filter((i) => {
        // если цель указана
        if (!i.forElement) {
          return false;
        }
        const element = document.querySelector(i.forElement);

        // если указанная цель существует
        if (!element) {
          return false;
        }
        return isVisible(element); // а размерами обладает?
      });
      setSequence(filter);
    } else {
      setSequence(null);
    }
  }, [props.sequence, props.open]);

  // почему не стейт?
  const data = sequence && sequence[position];

  // каждый раз при открытии сбрасываем счетчик
  useEffect(() => {
    setPosition(0);
  }, [props.open]);

  const onNext = () =>
    setPosition((p) => {
      if (p === sequence.length - 1) {
        props.onClose && props.onClose();
      }
      return p + 1;
    });

  const onPrevious = () =>
    setPosition((p) => {
      if (p === 0) {
        props.onClose && props.onClose();
      }
      return p - 1;
    });

  return (
    <div className="HelpSequence-container">
      {data && (
        <HelpBubble
          open={props.open}
          forElement={data.forElement}
          placement={data.placement}
          onClose={props.onClose}
          previousLabel={position > 0 && 'Previous'}
          nextLabel={position < sequence.length - 1 ? 'Next' : 'Finish'}
          onPrevious={onPrevious}
          onNext={onNext}
          content={data.text}
        />
      )}
    </div>
  );
};

export default HelpSequence;
