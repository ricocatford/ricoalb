import { useEffect, useRef } from "react";
import styles from "@/assets/styles/components/layout/background/Hex.module.css";

interface HexBackgroundProps {
    color: string;
}

interface HexagonConfig {
    hue: number;
    saturation: number;
    lightness: number;
    glowColor: string;
    riseSpeed: number;
    fadeSpeed: number;
    chanceOfActivation: number;
    borderWidth: number;
    gap: number;
}

export const Hex: React.FC<HexBackgroundProps> = ({ color }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        // Helper to parse color into HSL for the brightening logic
        const getHSL = (colorStr: string) => {
            const temp = document.createElement("div");
            temp.style.color = colorStr;
            document.body.appendChild(temp);
            const styles = window.getComputedStyle(temp).color;
            document.body.removeChild(temp);

            const rgb = styles.match(/\d+/g)?.map(Number);
            if (!rgb || rgb.length < 3) return { h: 120, s: 100, l: 50 };

            const r = rgb[0] / 255,
                g = rgb[1] / 255,
                b = rgb[2] / 255;
            const max = Math.max(r, g, b),
                min = Math.min(r, g, b);
            let h = 0,
                s,
                l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return { h: h * 360, s: s * 100, l: l * 100 };
        };

        let hsl = getHSL(color);
        let hexagons: Hexagon[] = [];
        const hexRadius = 19.5;
        let rows: number, cols: number;

        const config: HexagonConfig = {
            hue: hsl.h,
            saturation: hsl.s,
            lightness: hsl.l,
            glowColor: color,
            riseSpeed: 0.004,
            fadeSpeed: 0.002,
            chanceOfActivation: 0.0005,
            borderWidth: 2,
            gap: 2,
        };

        class Hexagon {
            x: number;
            y: number;
            brightness: number;
            target: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.brightness = 0;
                this.target = 0;
            }

            draw(
                context: CanvasRenderingContext2D,
                canvasWidth: number,
                canvasHeight: number
            ) {
                if (this.brightness <= 0.001) return;

                let edgeOpacity = 1;

                // Vertical Fades: 5% Top, 20% Bottom
                const topFadeZone = canvasHeight * 0.05;
                const bottomFadeZone = canvasHeight * 0.2;

                // Horizontal Fades: 5% Left, 5% Right
                const sideFadeZone = canvasWidth * 0.05;

                if (this.y < topFadeZone) {
                    edgeOpacity *= this.y / topFadeZone;
                } else if (this.y > canvasHeight - bottomFadeZone) {
                    edgeOpacity *= (canvasHeight - this.y) / bottomFadeZone;
                }

                if (this.x < sideFadeZone) {
                    edgeOpacity *= this.x / sideFadeZone;
                } else if (this.x > canvasWidth - sideFadeZone) {
                    edgeOpacity *= (canvasWidth - this.x) / sideFadeZone;
                }

                if (edgeOpacity <= 0) return;

                const drawRadius = hexRadius - config.gap / 1.5 - 0.5;

                context.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (Math.PI / 3) * i + Math.PI / 6;
                    const vx = this.x + drawRadius * Math.cos(angle);
                    const vy = this.y + drawRadius * Math.sin(angle);
                    if (i === 0) context.moveTo(vx, vy);
                    else context.lineTo(vx, vy);
                }
                context.closePath();

                const currentL = 10 + (config.lightness - 10) * this.brightness;
                const finalOpacity = this.brightness * edgeOpacity;

                context.save();
                context.shadowBlur = 15 * this.brightness;
                context.shadowColor = config.glowColor;
                context.strokeStyle = `hsla(${config.hue}, ${config.saturation}%, ${currentL}%, ${finalOpacity})`;
                context.lineWidth = config.borderWidth;
                context.stroke();
                context.restore();
            }

            update() {
                if (
                    this.target === 0 &&
                    Math.random() < config.chanceOfActivation
                ) {
                    this.target = 1;
                }

                if (this.target === 1) {
                    this.brightness += config.riseSpeed;
                    if (this.brightness >= 1) {
                        this.brightness = 1;
                        this.target = 0;
                    }
                } else if (this.brightness > 0) {
                    this.brightness -= config.fadeSpeed;
                    if (this.brightness < 0) this.brightness = 0;
                }
            }
        }

        const init = () => {
            if (!canvas || !canvas.parentElement) return;

            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;

            hexagons = [];
            const hexWidth = Math.sqrt(3) * hexRadius;
            const xSpacing = hexWidth;
            const ySpacing = hexRadius * 1.5;

            cols = Math.ceil(canvas.width / xSpacing) + 2;
            rows = Math.ceil(canvas.height / ySpacing) + 2;

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    let x = c * xSpacing;
                    if (r % 2 !== 0) x += xSpacing / 2;
                    let y = r * ySpacing;
                    hexagons.push(new Hexagon(x, y));
                }
            }
        };

        let lastCheckedColorValue = "";
        let animationFrameId: number;

        const animate = () => {
            const root = document.documentElement;
            const variableName = color.startsWith("var(")
                ? color.slice(4, -1)
                : color;
            const currentResolvedColor =
                window
                    .getComputedStyle(root)
                    .getPropertyValue(variableName)
                    .trim() || color;

            if (currentResolvedColor !== lastCheckedColorValue) {
                const newHsl = getHSL(currentResolvedColor);
                config.hue = newHsl.h;
                config.saturation = newHsl.s;
                config.lightness = newHsl.l;
                config.glowColor = currentResolvedColor;
                lastCheckedColorValue = currentResolvedColor;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            hexagons.forEach((hex) => {
                hex.update();
                hex.draw(ctx, canvas.width, canvas.height);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => init();

        const resizeObserver = new ResizeObserver(() => handleResize());
        if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

        window.addEventListener("resize", handleResize);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
            cancelAnimationFrame(animationFrameId);
        };
    }, [color]);

    return <canvas ref={canvasRef} className={styles.canvas} />;
};
