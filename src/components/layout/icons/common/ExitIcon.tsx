interface ExitIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const ExitIcon: React.FC<ExitIconProps> = ({
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
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </svg>
    );
};
