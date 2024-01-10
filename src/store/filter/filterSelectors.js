export const sortTypeSelector = (state) => state.filter.filters.sortType;
export const genresSelector = (state) => state.filter.filters.genres;
export const ratingSelector = (state) => state.filter.filters.rating;
export const yearsSelector = (state) => state.filter.filters.years;

export const filtersSelector = (state) => state.filter.filters;

export const filtersActiveSelector = (state) => state.filter.filtersActive;
export const searchSelector = (state) => state.filter.searchValue;

