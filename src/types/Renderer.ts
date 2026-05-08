export class Renderer {
    private gl: WebGL2RenderingContext;
    private canvas: HTMLCanvasElement;
    private scale: number;
    private program!: WebGLProgram;
    private vs!: WebGLShader;
    private fs!: WebGLShader;
    private buffer!: WebGLBuffer;

    private uniforms: {
        resolution: WebGLUniformLocation | null;
        time: WebGLUniformLocation | null;
        touch: WebGLUniformLocation | null;
        pointerCount: WebGLUniformLocation | null;
        pointers: WebGLUniformLocation | null;
    } = {
            resolution: null, time: null, touch: null, pointerCount: null, pointers: null
        };

    private readonly vertexSrc = "#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}";

    private readonly defaultFragmtSrc = "#version 300 es\nprecision highp float;\nout vec4 O;\nuniform float time;\nuniform vec2 resolution;\nvoid main() {\n\tvec2 uv=gl_FragCoord.xy/resolution;\n\tO=vec4(uv,sin(time)*.5+.5,1);\n}";

    public shaderSource: string;

    private readonly vertices = new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]);

    public mouseCoords: [number, number] = [0, 0];
    public pointerCoords: Float32Array = new Float32Array(0);
    public nbrOfPointers: number = 0;

    constructor(canvas: HTMLCanvasElement, scale: number, initialShaderSource?: string) {
        this.canvas = canvas;
        this.scale = scale;
        this.shaderSource = initialShaderSource || this.defaultFragmtSrc;

        const gl = canvas.getContext("webgl2");
        if (!gl) {
            throw new Error("WebGL2 not supported on this browser.");
        }
        this.gl = gl;

        this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
    }

    private compile(type: number, source: string): WebGLShader {
        const gl = this.gl;
        const shader = gl.createShader(type)!;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Shader Error (${type === gl.VERTEX_SHADER ? 'Vertex' : 'Fragment'}):`, gl.getShaderInfoLog(shader));
        }
        return shader;
    }

    public setup(): void {
        const gl = this.gl;
        this.vs = this.compile(gl.VERTEX_SHADER, this.vertexSrc);
        this.fs = this.compile(gl.FRAGMENT_SHADER, this.shaderSource);

        this.program = gl.createProgram()!;
        gl.attachShader(this.program, this.vs);
        gl.attachShader(this.program, this.fs);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            console.error("Program Link Error:", gl.getProgramInfoLog(this.program));
        }
    }

    public init(): void {
        const { gl, program } = this;

        this.buffer = gl.createBuffer()!;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        const position = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        this.uniforms = {
            resolution: gl.getUniformLocation(program, "resolution"),
            time: gl.getUniformLocation(program, "time"),
            touch: gl.getUniformLocation(program, "touch"),
            pointerCount: gl.getUniformLocation(program, "pointerCount"),
            pointers: gl.getUniformLocation(program, "pointers"),
        };
    }

    public updateScale(scale: number): void {
        this.scale = scale;
        this.gl.viewport(
            0,
            0,
            this.canvas.width * scale,
            this.canvas.height * scale
        );
    }

    public render(now: number = 0): void {
        const { gl, program, buffer, canvas, uniforms, mouseCoords, nbrOfPointers, pointerCoords } = this;

        if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

        if (uniforms.resolution) gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        if (uniforms.time) gl.uniform1f(uniforms.time, now * 1e-3);
        if (uniforms.touch) gl.uniform2f(uniforms.touch, ...mouseCoords);
        if (uniforms.pointerCount) gl.uniform1i(uniforms.pointerCount, nbrOfPointers);
        if (uniforms.pointers) gl.uniform2fv(uniforms.pointers, pointerCoords);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
}