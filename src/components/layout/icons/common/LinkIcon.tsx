interface LinkIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const LinkIcon: React.FC<LinkIconProps> = ({
    width = 32,
    height = 32,
    ...rest
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18" />
            <path d="M16 12l-4 -4" />
            <path d="M16 12h-8" />
            <path d="M12 16l4 -4" />
        </svg>
    );
};
