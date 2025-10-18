export const isDevEnvironment = () => {
  return (
    import.meta.env.VITE_ENV === "testing" ||
    import.meta.env.VITE_ENV === "local"
  );
};

export const isProdEnvironment = () => {
  return import.meta.env.VITE_ENV === "prod";
};
