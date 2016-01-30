precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;


void main() {
    vUv=uv;
    vec4 ecPosition = modelViewMatrix * vec4(position, 1.0);    //
    vec3 ecNormal = normalize(normal);                          //
    gl_Position = projectionMatrix *modelViewMatrix * vec4(position,1.0);
}

