export const getErrorMessage: (error: unknown) => string = (error) => {
  if (error instanceof Error) return error.message;
  return String(error);
};
