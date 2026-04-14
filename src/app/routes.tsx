import { createBrowserRouter } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { Home } from "./pages/Home";
import { TrainingCenter } from "./pages/TrainingCenter";
import { LevelPrep } from "./pages/LevelPrep";
import { TrainingRoom } from "./pages/TrainingRoom";
import { TrainingReview } from "./pages/TrainingReview";
import { AbilityProfile } from "./pages/AbilityProfile";
import { DataCenter } from "./pages/DataCenter";
import { LearningCenter } from "./pages/LearningCenter";
import { Assessment } from "./pages/Assessment";
import { PersonalCenter } from "./pages/PersonalCenter";
import { Admin } from "./pages/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: "training", Component: TrainingCenter },
      { path: "training/prep/:id", Component: LevelPrep },
      { path: "training/room/:id", Component: TrainingRoom },
      { path: "training/review/:id", Component: TrainingReview },
      { path: "ability", Component: AbilityProfile },
      { path: "data", Component: DataCenter },
      { path: "learning", Component: LearningCenter },
      { path: "assessment", Component: Assessment },
      { path: "profile", Component: PersonalCenter },
      { path: "admin", Component: Admin },
    ],
  },
]);
