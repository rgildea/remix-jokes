import { Outlet } from "@remix-run/react";

export default function Jokes() {
    return (
        <div>
            <hi>J🤪KES</hi>
            <Outlet />
        </div>
    );
}