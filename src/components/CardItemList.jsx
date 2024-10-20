import { CardItem } from "./CardItem";
import GameData from "../app.mock";
import { useEffect, useState } from "react";

export const CardItemList = () => {
  const [cardList, setCardList] = useState([...GameData]);
  const [flipedCard, setFlippedCard] = useState([]);
  const [disabled, setDisabled] = useState();

  const onClickHandler = (currentId) => {
    if (disabled) return;
    const updatedList = cardList.map((data) =>
      data.id === currentId ? { ...data, isOpen: true } : data
    );
    setCardList(updatedList);

    const flipedCard = updatedList.filter(
      (data) => data.isOpen && !data.matched
    );

    if (flipedCard.length === 2) {
      setDisabled(true);
      setFlippedCard(flipedCard);
    }
  };

  useEffect(() => {
    let timeoutId;
    if (flipedCard.length === 2) {
      const [first, second] = flipedCard;
      if (first.name == second.name) {
        setCardList((prev) =>
          prev.map((data) =>
            data.name == first.name ? { ...data, matched: true } : data
          )
        );
        setFlippedCard([]);
        setDisabled(false);
      } else {
        timeoutId = setTimeout(() => {
          setCardList((prev) =>
            prev.map((data) =>
              data.id === first.id || data.id === second.id
                ? { ...data, isOpen: false }
                : data
            )
          );
          setFlippedCard([]);
          setDisabled(false);
        }, 500);
      }

      return () => clearTimeout(timeoutId);
    }
  }, [flipedCard]);

  return (
    <div className="card-item-list">
      {cardList?.map((item) => {
        return (
          <CardItem
            key={item.id}
            id={item.id}
            image={item.pic}
            onClick={onClickHandler}
            isOpen={item.isOpen}
          ></CardItem>
        );
      })}
    </div>
  );
};
