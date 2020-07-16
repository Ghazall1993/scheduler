import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames';

export default function DayListItem(props) {
  const dayClass = classNames( "day-list__item",
    {"day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0}
  );

  const formatSpots = (spots) => {
    switch (spots) {
      case 0:
        return "no spots remaining";
        break;
      case 1:
        return "1 spot remaining";
        break;
      default:
        return `${spots} spots remaining`;
        break;
    }
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}