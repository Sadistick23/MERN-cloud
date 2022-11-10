import Registration from "../components/registration/registration";
import Login from "../components/login/login";
import Disk from "../components/disk/Disk";
import Profile from "../components/profile/Profile";

export const publicRoutes = [
    {path: '/login', element: Login, id: 1},
    {path: '/registration', element: Registration, id: 2},
]
export const privateRoutes = [
    {path: '/disk', element: Disk, id: 1},
    {path: '/profile', element: Profile, id: 2},
]