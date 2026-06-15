import { ImageResponse } from "next/og";

export const alt = "Ricardo Albarenque — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand tokens mirrored from globals.css (dark theme, default).
const ACCENT_FROM = "hsl(96, 100%, 60%)";
const ACCENT_TO = "hsl(110, 83%, 36%)";
const BACKGROUND = "hsl(0, 0%, 5%)";
const FOREGROUND = "hsl(0, 0%, 75%)";
const FOREGROUND_DIM = "hsl(0, 0%, 45%)";

export default function OpengraphImage(): ImageResponse {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "90px",
                    background: BACKGROUND,
                    backgroundImage: `radial-gradient(circle at 18% 120%, hsla(96, 100%, 60%, 0.18), transparent 55%), linear-gradient(135deg, hsl(0, 0%, 7%), hsl(0, 0%, 4%))`,
                    fontFamily: "sans-serif",
                }}
            >
                {/* terminal prompt eyebrow */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "30px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: ACCENT_FROM,
                        marginBottom: "34px",
                    }}
                >
                    <span style={{ color: ACCENT_FROM }}>{"~/ricoalb $"}</span>
                    <span style={{ color: FOREGROUND_DIM }}>whoami</span>
                </div>

                {/* name — logo gradient */}
                <div
                    style={{
                        display: "flex",
                        fontSize: "120px",
                        fontWeight: 800,
                        lineHeight: 1.02,
                        letterSpacing: "-0.02em",
                        backgroundImage: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    Ricardo Albarenque
                </div>

                {/* tagline */}
                <div
                    style={{
                        display: "flex",
                        marginTop: "30px",
                        fontSize: "40px",
                        fontWeight: 500,
                        color: FOREGROUND,
                    }}
                >
                    Full-Stack Developer
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: "12px",
                        fontSize: "30px",
                        color: FOREGROUND_DIM,
                    }}
                >
                    Building scalable, high-performance web experiences.
                </div>

                {/* domain footer */}
                <div
                    style={{
                        display: "flex",
                        position: "absolute",
                        bottom: "70px",
                        left: "90px",
                        fontSize: "28px",
                        letterSpacing: "0.06em",
                        color: ACCENT_FROM,
                    }}
                >
                    www.ricoalb.com
                </div>
            </div>
        ),
        size,
    );
}
