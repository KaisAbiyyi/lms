"use client"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProvileDropdown from "./profile-dropdown";

export default function AdminNavbar() {

    return (<>
        <div className="flex w-full py-4 justify-between">
            <h1>Dashboard</h1>
            <ProvileDropdown />
        </div>
    </>);
}
