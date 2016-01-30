precision mediump float;

uniform float time;
varying vec2 vUv;
uniform sampler2D daytimeTexture;
uniform sampler2D nightTexture;
uniform sampler2D cloudTexture;


uniform vec3 phongDiffuseMaterial;
uniform vec3 phongSpecularMaterial;
uniform vec3 phongAmbientMaterial;
uniform float phongShininessMaterial;
            
uniform vec3 ambientLightColor[1];
            
uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];
uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];
            
//uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
//uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];
//uniform float pointLightDistance[MAX_POINT_LIGHTS];

varying vec4 ecPosition;
varying vec3 ecNormal;

vec3 phong(vec3 p, vec3 v, vec3 n, vec3 lightPos, vec3 lightColor) {
    if(dot(v,n) < 0.0) return vec3(0,0,0);
    vec3 toLight = normalize(lightPos - p);
    vec3 reflectLight = reflect(-toLight, n);
    float ndots = max( dot(toLight,n), 0.0);
    float rdotv = max( dot(reflectLight, v), 0.0);
    vec3 ambi = phongAmbientMaterial * ambientLightColor[0];
    vec3 diff = phongDiffuseMaterial * ndots * lightColor;
    vec3 spec = phongSpecularMaterial * pow(rdotv, phongShininessMaterial ) * lightColor;
    return ambi + diff + spec;
}

void main(){
    //bool useOrtho = projectionMatrix[2][3] == 0;
    //vec3 viewDir = useOrtho?vec3(0,0,1):normalize(–ecPosition.xyz);
    //vec3 vColor= phong(ecPosition.xyz,ecNormal,viewDir);
    //gl_FragColor = vec4(vColor, 1.0);                            

    vec2 coord=vUv;
    vec4 RGB = texture2D( daytimeTexture, vUv );
    vec4 clouds = texture2D( cloudTexture, coord+vec2(0.0*time,0.0)); //gucken ob wolken da sind, an koordination
    RGB = 1.0-(1.0-clouds.r)*(1.0-RGB);
    gl_FragColor = vec4(RGB.r,RGB.g,RGB.b,1.0 );
}
