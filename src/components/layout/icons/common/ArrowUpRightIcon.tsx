interface ArrowUpRightIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const ArrowUpRightIcon: React.FC<ArrowUpRightIconProps> = ({
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <path d="M7 17L17 7" />
            <path d="M9 7h8v8" />
        </svg>
    );
};
