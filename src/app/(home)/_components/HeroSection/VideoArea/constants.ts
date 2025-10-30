export const ANIMATION_CONFIG = {
  DEFAULT_SPRING: {
    stiffness: 12,
    damping: 9,
    mass: 3,
  },
  DEFAULT_DELAY: 1500,
  ANIMATION_CURVE: {
    input: [0, 0.5, 0.8, 1.0],
    output: [0, 1.2, 0.85, 1.0],
  },
  REDUCED_SPRING: {
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
};

// Mobile path coefficients
export const MOBILE_PATH_COEFFS = {
  startY: 0.7,
  controlY1: 0.88,
  controlY2: 0.95,
  endY: 0.95,
} as const;

// Desktop path coefficients
export const DESKTOP_PATH_COEFFS = {
  startY: 0.585,
  controlY1: 0.85,
  controlY2: 1,
  endY: 1,
} as const;
