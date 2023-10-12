import { cn } from "@/lib/utils";

export default function DatabaseIcon({ size, className }: { size: number, className: string }) {
    return (
        <svg
            width={size}
            height={size}
            className={cn(className)}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24">
            <path d="M12 9c4.418 0 8-1.343 8-3s-3.582-3-8-3-8 1.343-8 3 3.582 3 8 3Z" />
            <path d="M4 6v6c0 .796.843 1.559 2.343 2.121 1.5.563 3.535.879 5.657.879s4.157-.316 5.657-.879C19.157 13.56 20 12.796 20 12V6" />
            <path d="M4 12v6c0 .796.843 1.559 2.343 2.121 1.5.563 3.535.879 5.657.879s4.157-.316 5.657-.879C19.157 19.56 20 18.796 20 18v-6" />
        </svg>
    )
}