import Home from "./Components/Home"
import ViewPost from "./Components/ViewPost";
import SignUpForm from "./Components/SignUpForm";
import SignInForm from "./Components/SignInForm";
import UnAuth from "./layouts/UnAuth";
import Auth from "./layouts/Auth";

const routes = [
    { path: "/", element: Home, layout: UnAuth },
    { path: "/view", element: ViewPost, layout: Auth },
    { path: "/signUp", element: SignUpForm, layout: UnAuth },
    { path: "/signIn", element: SignInForm, layout: UnAuth },
]

export default routes;