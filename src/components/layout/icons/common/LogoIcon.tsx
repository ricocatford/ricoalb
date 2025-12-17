interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const LogoIcon: React.FC<LogoIconProps> = ({
    width = 42,
    height = 42,
    ...rest
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 96 96"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...rest}
        >
            <linearGradient
                gradientTransform="rotate(45)"
                id="929d9aad-787d-4962-af12-88787f9f6263"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
            >
                <stop offset="0%" stopColor="#12cff3" stopOpacity="1"></stop>
                <stop offset="100%" stopColor="#1d8ee4" stopOpacity="1"></stop>
            </linearGradient>
            <g stroke="none" fill="url(#929d9aad-787d-4962-af12-88787f9f6263)">
                <path d="M78.268 32.181H57.521L47.148 50.146l10.373 17.966h20.747l10.373-17.966zM21.732 52.129L11.359 70.095l10.373 17.966h20.746l10.373-17.966-10.373-17.966zM42.478 47.871l10.373-17.966-10.373-17.966H21.732L11.359 29.905l10.373 17.966z"></path>
            </g>
        </svg>
    );
};
