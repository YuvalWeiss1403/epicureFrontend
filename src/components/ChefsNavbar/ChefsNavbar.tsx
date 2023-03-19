import React, { useEffect, useState } from "react";
import "./ChefsNavbar.css";
import { useDispatch } from "react-redux";
import {
	AllChefs,
	NewChefs,
	MostViewedChefs,
} from "../../store/slices/ChefsSlice";

enum ChefsFilter {
	ALL = "ChefsAll",
	NEW = "ChefsNew",
	MOST_VIEWED = "ChefsMostViewed",
}

const ChefsNavbar: React.FC = () => {
	const dispatch = useDispatch();
	const [filteredChefs, setFilteredChefs] = useState<ChefsFilter>(
		ChefsFilter.ALL
	);

	useEffect(() => {
		dispatch(AllChefs());
	}, []);

	const handleButtonClick = (filter: ChefsFilter) => {
		switch (filter) {
			case ChefsFilter.ALL:
				dispatch(AllChefs());
				break;
			case ChefsFilter.NEW:
				dispatch(NewChefs());
				break;
			case ChefsFilter.MOST_VIEWED:
				dispatch(MostViewedChefs());
				break;
			default:
				break;
		}
		setFilteredChefs(filter);
	};

	return (
		<div className="chefs-navbar">
			{Object.values(ChefsFilter).map((filter) => (
				<button
					key={filter}
					className={filteredChefs === filter ? "filter-on" : "filter-off"}
					onClick={() => handleButtonClick(filter as ChefsFilter)}>
					{filter.split("Chefs")[1]}
				</button>
			))}
		</div>
	);
};

export default ChefsNavbar;
