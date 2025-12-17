interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const CheckIcon: React.FC<CheckIconProps> = ({
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
            <path d="M5 12l5 5l10 -10" />
        </svg>
    );
};
