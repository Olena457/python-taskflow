export const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-background/99">
      <div className="loader" />
    </div>
  );
};
