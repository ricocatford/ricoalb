import { useId } from "react";

interface LogoIconProps extends React.SVGProps<SVGSVGElement> {
    width?: number;
    height?: number;
}

export const LogoIcon: React.FC<Omit<LogoIconProps, "color">> = ({
    width = 42,
    height = 42,
    ...rest
}) => {
    const id = useId();

    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 96 96"
            fill="none"
            {...rest}
        >
            <defs>
                <linearGradient id={id} gradientTransform="rotate(45)">
                    <stop offset="0%" stopColor="var(--logo-gradient-from)" />
                    <stop offset="100%" stopColor="var(--logo-gradient-to)" />
                </linearGradient>
            </defs>
            <g fill={`url(#${id})`}>
                <path d="M78.268 32.181H57.521L47.148 50.146l10.373 17.966h20.747l10.373-17.966zM21.732 52.129L11.359 70.095l10.373 17.966h20.746l10.373-17.966-10.373-17.966zM42.478 47.871l10.373-17.966-10.373-17.966H21.732L11.359 29.905l10.373 17.966z" />
            </g>
        </svg>
    );
};
