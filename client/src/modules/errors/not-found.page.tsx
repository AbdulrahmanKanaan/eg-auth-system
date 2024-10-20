import { Link } from "react-router-dom";
import { ROUTES } from "../../const";

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 text-5xl">
      <span>Page Not Found</span>
      <Link to={ROUTES.HOME} className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
}
