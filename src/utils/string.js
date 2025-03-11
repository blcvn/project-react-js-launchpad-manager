export const generateTraceNo = () => {
  const unixMilli = Date.now();

  const randomNum = Math.floor(Math.random() * 10000) + 1;

  const traceNo = `${unixMilli}${randomNum}`;

  return traceNo;
};
