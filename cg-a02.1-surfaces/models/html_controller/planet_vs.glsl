precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 vColor;
varying vec3 fragColor;
varying vec3 viewDir;



void main() {

    //multiply with a vertex with 3 coordinates an 1 additional parameter
    ecPosition = modelViewMatrix * vec4(position, 1.0);
    ecNormal = normalMatrix * normal;
	
	vUv = uv;

    //perspective or orthogonal projection
    bool useOrtho = projectionMatrix[2][3] < 0.1;
    //different if else construct
    viewDir = useOrtho ? vec3(0, 0, 1) : normalize(-ecPosition.xyz);

    gl_Position = projectionMatrix * ecPosition;

}