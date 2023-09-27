export const getDurationString = (duration) => {
  const minutes = duration % 60;
  const hours = (duration - minutes) / 60;
  return hours ? `${hours}ч&nbsp;${minutes}м` : `${minutes}м`;
};


export const cn = (cls, mods = {}, additional = []) => {
  return [
    cls,
    ...additional.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}

export const createQueryString = (queryObj) => {
  const paramsString = Object.entries(queryObj)
  .filter(([_, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return Boolean(value);
  })
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}=${value.join('+')}`
    }
    return `${key}=${value}`
  })
  .join('&');
  return '?' + paramsString;
}
