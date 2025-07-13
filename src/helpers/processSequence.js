import Api from "../tools/api";
import { pipe, tap, ifElse, allPass, length, test } from "ramda";

const api = new Api();

const isValidNumberString = allPass([
  test(/^[0-9.]+$/),
  (s) => (s.match(/\./g) || []).length <= 1,
  (s) => length(s) >= 2,
  (s) => length(s) <= 10,
  (s) => parseFloat(s) > 0,
]);

const round = Math.round;

const convertToBinary = (number) =>
  api.get("https://api.tech/numbers/base", {
    from: 10,
    to: 2,
    number,
  });

const getAnimalById = (id) => api.get(`https://animals.tech/${id}`);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const log = tap(writeLog);

  const handleValidValue = pipe(log, parseFloat, round, log, (rounded) =>
    convertToBinary(rounded)
      .then(({ result: binary }) => {
        log(binary);

        const len = binary.length;
        log(len);

        const squared = len ** 2;
        log(squared);

        const remainder = squared % 3;
        log(remainder);

        return getAnimalById(remainder);
      })
      .then(({ result }) => {
        if (!result) {
          handleError("Animal API вернул пустой результат");
          return;
        }

        handleSuccess(result);
      })
      .catch((err) => {
        const errorMessage = err instanceof Error ? err.message : String(err);
        handleError(errorMessage);
      })
  );

  const handle = ifElse(isValidNumberString, handleValidValue, () =>
    handleError("ValidationError")
  );

  handle(value);
};

export default processSequence;
