// スタイルの定数化
export const breakpoints = {
  mobile: 768,
};

export const animations = {
  duration: {
    default: 0.8,
    mobile: 0.5,
  },
  stagger: {
    default: 0.2,
    mobile: 0.15,
  },
  delay: {
    circleTransition: 0.3,
  },
  ease: {
    default: "power2.out",
  },
};

export const zIndexes = {
  circleTransition: 1000,
  content: 1010,
  loading: 2000,
};

export const spacing = {
  container: "2rem",
  contentMaxWidth: "800px",
  contentPadding: {
    top: "2rem",
    bottom: "4rem",
  },
};

export const typography = {
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  body: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    lineHeight: 1.6,
  },
};

export const layout = {
  fullViewport: {
    width: "100vw",
    height: "100vh",
  },
};

export const effects = {
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  borderRadius: "12px",
};
