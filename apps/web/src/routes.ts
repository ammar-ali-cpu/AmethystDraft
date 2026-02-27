import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
// import { Dashboard } from "./pages/Dashboard";
// import { Rankings } from "./pages/Rankings";
// import { CheatSheet } from "./pages/CheatSheet";
// import { MockDraft } from "./pages/MockDraft";
// import { Sleepers } from "./pages/Sleepers";
// import { DraftRoom } from "./pages/DraftRoom";
// import { News } from "./pages/News";
// import { Ratings } from "./pages/Ratings";
// import { Auth } from "./pages/Auth";
// import { ForgotPassword } from "./pages/ForgotPassword";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
    //   { path: "dashboard", Component: Dashboard },
    //   { path: "rankings", Component: Rankings },
    //   { path: "cheat-sheet", Component: CheatSheet },
    //   { path: "mock-draft", Component: MockDraft },
    //   { path: "sleepers", Component: Sleepers },
    //   { path: "draft-room", Component: DraftRoom },
    //   { path: "news", Component: News },
    //   { path: "ratings", Component: Ratings },
    //   { path: "auth", Component: Auth },
    //   { path: "forgot-password", Component: ForgotPassword },
    ],
  },
]);