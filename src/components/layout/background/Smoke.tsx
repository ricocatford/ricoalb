"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { Renderer } from "@/types/Renderer";
import styles from "@/assets/styles/components/layout/background/Smoke.module.css";

const EXTERNAL_SHADER_SOURCE: string = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
#define FC gl_FragCoord.xy
#define R resolution
#define MN min(R.x,R.y)
#define T (time+660.)
#define S smoothstep
#define N normalize
#define rot(a) mat2(cos((a)-vec4(0,11,33,0)))
float rnd(vec2 p) {
	p=fract(p*vec2(12.9898,78.233));
	p+=dot(p,p+34.56);
	return fract(p.x*p.y);
}
float noise(vec2 p) {
	vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f), k=vec2(1,0);
	float
	a=rnd(i),
	b=rnd(i+k),
	c=rnd(i+k.yx),
	d=rnd(i+1.);
	return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
	float t=.0, a=1., h=.0; mat2 m=mat2(1.,-1.2,.2,1.2);
	for (float i=.0; i<5.; i++) {
		t+=a*noise(p);
		p*=2.*m;
		a*=.5;
		h+=a;
	}
	return t/h;
}
void main() {
	vec2 uv=(FC-.5*R)/R.y, k=vec2(0,T*.015);
	vec3 col=vec3(1);
    uv.x+=.25;
	uv*=vec2(2,1);
	float n=fbm(uv*.28+vec2(-T*.01,0));
	n=noise(uv*3.+n*2.);
	col.r-=fbm(uv+k+n);
	col.g-=fbm(uv*1.003+k+n+.003);
	col.b-=fbm(uv*1.006+k+n+.006);
	col=mix(col,vec3(1),dot(col,vec3(.21,.71,.07)));
	col=mix(vec3(.08),col,min(time*.1,1.));
	col=clamp(col,.08,1.);
	O=vec4(col,1);
}`;

export const Smoke: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<Renderer | null>(null);
    const animationFrameId = useRef<number | null>(null);

    const resizeCanvas = useCallback((renderer: Renderer, dpr: number) => {
        const { innerWidth: width, innerHeight: height } = window;
        if (canvasRef.current) {
            canvasRef.current.width = width * dpr;
            canvasRef.current.height = height * dpr;
            renderer.updateScale(dpr);
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.max(1, window.devicePixelRatio);
        let renderer: Renderer;

        try {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            renderer = new Renderer(canvas, dpr, EXTERNAL_SHADER_SOURCE);
            rendererRef.current = renderer;

            renderer.setup();
            renderer.init();

            const loop = (now: number) => {
                renderer.render(now);
                animationFrameId.current = requestAnimationFrame(loop);
            };

            const handleResize = () => resizeCanvas(renderer, dpr);
            window.addEventListener("resize", handleResize);

            loop(0);

            return () => {
                window.removeEventListener("resize", handleResize);
                if (animationFrameId.current) {
                    cancelAnimationFrame(animationFrameId.current);
                }
            };
        } catch (error) {
            console.error("Failed to initialize WebGL background:", error);
            return;
        }
    }, [resizeCanvas]);

    return (
        <div className={styles.backgroundContainer}>
            <canvas ref={canvasRef} className={styles.animatedCanvas} />
            <div className={styles.container}>{children}</div>
        </div>
    );
};
