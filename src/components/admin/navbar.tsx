"use client"
import ProvileDropdown from "./ProvileDropdown";

export default function AdminNavbar() {

    return (<>
        <div className="flex w-full py-4 justify-between">
            <h1>Dashboard</h1>
            <ProvileDropdown />
        </div>
    </>);
}
