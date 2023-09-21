export const debounce = (func, timeout) => {
  return function (...args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();

    if (previousCall && this.lastCall - previousCall <= timeout) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => func(...args), timeout);
  };
};

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
