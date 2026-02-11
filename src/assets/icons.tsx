import { SVGProps } from 'react';

export function Hamburger(props: SVGProps<SVGSVGElement>) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" {...props}>{/* Icon from Solar by 480 Design - https://creativecommons.org/licenses/by/4.0/ */}<g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5"><path d="M20 7H4" /><path d="M20 12H4" opacity=".5" /><path d="M20 17H4" /></g></svg>
    )
}