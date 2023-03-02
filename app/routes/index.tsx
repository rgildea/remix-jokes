import type { LinksFunction, MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
    return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
    return {
        title: "uhh... jokes?",
        description: "A simple app to demonstrate Remix",
    };
};

export default function IndexRoute() {
    return (
        <div className="container">
            <div className="content">
                <h1>
                    Remix <span>Jokes!</span>
                </h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="jokes">Read Jokes</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}