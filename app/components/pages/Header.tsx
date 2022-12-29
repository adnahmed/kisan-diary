import { AuthenticatedMenu, UnauthenticatedMenu } from "./Auth";
interface HeaderArgs {
  isAuthenticated: Boolean;
}

export default function Header({ isAuthenticated }: HeaderArgs) {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="header">
        <img key="logo" alt="logo" src="/assets/diary.png" className="logo" />
        <a key="title" href="/" className="title">
          Kesan Diary
        </a>
        {isAuthenticated ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      </div>
    </div>
  );
}
