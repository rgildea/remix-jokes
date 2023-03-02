import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
    useCatch,
    useLoaderData
} from "@remix-run/react";

import { db } from "~/utils/db.server";

export const meta: MetaFunction = () => {
    return {
        title: "Random Joke",
        description: "A random joke",
    };
}

export const loader = async ({ params }: LoaderArgs) => {
    const count = await db.joke.count();
    const randomRowNumber = Math.floor(Math.random() * count);
    const [randomJoke] = await db.joke.findMany({
        take: 1,
        skip: randomRowNumber,
    });
    if (!randomJoke) {
        throw new Response("No random joke found", {
            status: 404,
        });
    }
    return json({ randomJoke });
};

export default function JokesIndexRoute() {
    const data = useLoaderData<typeof loader>();

    return (
        <div>
            <p>Here's a random joke:</p>
            <p>{data.randomJoke.content}</p>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return (
            <div className="error-container">
                There are no jokes to display.
            </div>
        );
    }
    throw new Error(
        `Unexpected caught response with status ${caught.status}`
    );
}

export function ErrorBoundary() {
    return (
        <div className="error-container">
            I did a whoopsies.
        </div>
    );
}