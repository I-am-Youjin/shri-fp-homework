import {
  every,
  some,
  filter,
  size,
  countBy,
  values,
  flow,
  negate,
  includes,
} from "lodash";

const isWhite = (color) => color === "white";
const isRed = (color) => color === "red";
const isGreen = (color) => color === "green";
const isBlue = (color) => color === "blue";
const isOrange = (color) => color === "orange";
const isNotWhite = (color) => color !== "white";
const isNotRed = (color) => color !== "red";
const isNotRedOrWhite = (color) => !includes(["red", "white"], color);

export const validateFieldN1 = (obj) =>
  isRed(obj.star) &&
  isGreen(obj.square) &&
  isWhite(obj.triangle) &&
  isWhite(obj.circle);

export const validateFieldN2 = (obj) =>
  size(filter(Object.values(obj), isGreen)) >= 2;

export const validateFieldN3 = (obj) => {
  const colors = Object.values(obj);
  return size(filter(colors, isRed)) === size(filter(colors, isBlue));
};

export const validateFieldN4 = (obj) =>
  isBlue(obj.circle) && isRed(obj.star) && isOrange(obj.square);

export const validateFieldN5 = (obj) => {
  const colorCounts = countBy(Object.values(obj));
  delete colorCounts.white; // Игнорируем белый цвет
  return some(colorCounts, (count) => count >= 3);
};

export const validateFieldN6 = (obj) => {
  const colors = Object.values(obj);
  const greenCount = size(filter(colors, isGreen));
  const redCount = size(filter(colors, isRed));
  return greenCount === 2 && isGreen(obj.triangle) && redCount === 1;
};

export const validateFieldN7 = (obj) => every(Object.values(obj), isOrange);

export const validateFieldN8 = (obj) => isNotRedOrWhite(obj.star);

export const validateFieldN9 = (obj) => every(Object.values(obj), isGreen);

export const validateFieldN10 = (obj) =>
  obj.square === obj.triangle && isNotWhite(obj.square);
