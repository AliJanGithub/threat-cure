"use client";

import { useEffect, useRef } from 'react';

const WebGLBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 aPosition;
      uniform float uTime;
      varying vec2 vUv;
      
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        float wave = sin(uTime + aPosition.y * 3.14159) * 0.1;
        vec2 pos = aPosition + vec2(wave, 0.0);
        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;

    // Fragment shader with orange theme
    const fragmentShaderSource = `
      precision mediump float;
      uniform float uTime;
      varying vec2 vUv;
      
      void main() {
        float time = uTime * 0.001;
        
        // Create moving gradient
        vec2 uv = vUv * 2.0 - 1.0;
        
        // Create orange/red gradient
        vec3 color1 = vec3(1.0, 0.4, 0.2); // Orange
        vec3 color2 = vec3(0.9, 0.3, 0.1); // Dark orange
        vec3 color3 = vec3(1.0, 0.9, 0.8); // Light peach
        
        // Moving gradient
        float gradient = sin(uv.x * 3.0 + time) * 0.5 + 0.5;
        vec3 baseColor = mix(color1, color2, gradient);
        
        // Add subtle noise
        float noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.1;
        
        // Add pulsing effect
        float pulse = sin(time * 2.0) * 0.05 + 0.05;
        
        // Final color with transparency
        vec3 finalColor = baseColor + vec3(noise) + vec3(pulse);
        float alpha = 0.1; // Very subtle
        
        gl_FragColor = vec4(finalColor, alpha);
      }
    `;

    // Compile shader
    function compileShader(source, type) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    // Create shader program
    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Set up vertices
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionAttrib = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(positionAttrib);
    gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, 'uTime');
    let startTime = Date.now();

    // Animation loop
    let animationId;
    const animate = () => {
      resizeCanvas();
      
      const currentTime = Date.now() - startTime;
      gl.uniform1f(timeUniform, currentTime);
      
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      
      animationId = requestAnimationFrame(animate);
    };

    // Handle resize
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) cancelAnimationFrame(animationId);
      if (program) gl.deleteProgram(program);
      if (vertexBuffer) gl.deleteBuffer(vertexBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        opacity: 0.3,
        mixBlendMode: 'overlay',
      }}
    />
  );
};

export default WebGLBackground;