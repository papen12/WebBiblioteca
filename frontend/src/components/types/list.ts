import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type NavItem={
    id:string
    label:string
    href:string
    icon?: IconDefinition
}

export interface NavBarProps{
    items:NavItem[]
    logo:string
    logoAlt?:string
    className?:string
}