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

// Fetch a single Inter weight from Google Fonts as TTF, subsetted to `text`.
// Requesting without a browser User-Agent makes Google return truetype
// (Satori cannot read the woff2 it serves to real browsers).
async function loadInter(weight: number, text: string): Promise<ArrayBuffer> {
    const url = `https://fonts.googleapis.com/css2?family=Inter:wght@${weight}&text=${encodeURIComponent(
        text,
    )}`;
    const css = await (await fetch(url)).text();
    const src = css.match(
        /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!src) {
        throw new Error(`Failed to extract Inter ${weight} font URL`);
    }
    return fetch(src[1]).then((res) => res.arrayBuffer());
}

export default async function OpengraphImage(): Promise<ImageResponse> {
    const eyebrow = "~/ricoalb $ whoami";
    const name = "Ricardo Albarenque";
    const role = "Full-Stack Developer";
    const tagline = "Building scalable, high-performance web experiences.";
    const domain = "www.ricoalb.com";

    const [inter500, inter800] = await Promise.all([
        loadInter(500, eyebrow + role + tagline + domain),
        loadInter(800, name),
    ]);

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "80px",
                    background: BACKGROUND,
                    backgroundImage: `radial-gradient(circle at 18% 120%, hsla(96, 100%, 60%, 0.18), transparent 55%), linear-gradient(135deg, hsl(0, 0%, 7%), hsl(0, 0%, 4%))`,
                    fontFamily: "Inter",
                }}
            >
                {/* terminal prompt eyebrow */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "14px",
                        fontSize: "30px",
                        fontWeight: 500,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: ACCENT_FROM,
                        marginBottom: "30px",
                    }}
                >
                    <span style={{ color: ACCENT_FROM }}>{"~/ricoalb $"}</span>
                    <span style={{ color: FOREGROUND_DIM }}>whoami</span>
                </div>

                {/* name — logo gradient */}
                <div
                    style={{
                        display: "flex",
                        fontSize: "100px",
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        backgroundImage: `linear-gradient(135deg, ${ACCENT_FROM}, ${ACCENT_TO})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                    }}
                >
                    {name}
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
                    {role}
                </div>
                <div
                    style={{
                        display: "flex",
                        marginTop: "12px",
                        fontSize: "30px",
                        fontWeight: 500,
                        color: FOREGROUND_DIM,
                    }}
                >
                    {tagline}
                </div>

                {/* domain footer */}
                <div
                    style={{
                        display: "flex",
                        marginTop: "48px",
                        fontSize: "28px",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: ACCENT_FROM,
                    }}
                >
                    {domain}
                </div>
            </div>
        ),
        {
            ...size,
            fonts: [
                { name: "Inter", data: inter500, weight: 500, style: "normal" },
                { name: "Inter", data: inter800, weight: 800, style: "normal" },
            ],
        },
    );
}
