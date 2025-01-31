function isMobile() {
  const width = window.innerWidth > 0 ? window.innerWidth : window.width;
  const _isMobile = width <= 992;

  return _isMobile;
}

export default isMobile;
