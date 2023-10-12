import { cn } from "@/lib/utils";

export default function HomeIcon({ size, className }: { size: number, className: string }) {
    return (
        <svg
            width={size}
            height={size}
            fill="none"
            stroke="currentColor"
            className={cn(className)}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24">
            <path d="M5 12H3l9-9 9 9h-2" />
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
            <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
        </svg>
    )
}
