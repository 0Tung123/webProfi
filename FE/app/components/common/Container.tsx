import { CONTAINER } from "@/app/lib/constants";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={CONTAINER}>
      {children}
    </div>
  );
}