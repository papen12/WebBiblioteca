import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type SideBarItem={
    id:string
    label:string
    icon?:IconDefinition
    onClick?: () => void
}

export interface SideBarProps {
    username:string
    items:SideBarItem[]
    className?:string
}