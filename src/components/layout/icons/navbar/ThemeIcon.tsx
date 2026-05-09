interface ThemeIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
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
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
            <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
            <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
            <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
        </svg>
    );
};
