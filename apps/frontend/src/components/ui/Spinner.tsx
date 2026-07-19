export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="loader" />
    </div>
  );
};
