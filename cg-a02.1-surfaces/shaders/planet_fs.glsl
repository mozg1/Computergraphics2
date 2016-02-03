precision mediump float;

varying vec4 ecPosition;
varying vec3 ecNormal;
varying vec2 vUv;
varying vec3 viewDir;

varying vec3 fragColor;

uniform sampler2D daytimeTexture;
uniform sampler2D nightTexture;
uniform sampler2D cloudTexture;

uniform int dayBool;
uniform int cloudsBool;
uniform int nightBool;

uniform vec3 diffuseMaterial;
uniform vec3 specularMaterial;
uniform vec3 ambientMaterial;
uniform float shininessMaterial;
            
uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];
uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];
            
//uniform vec3 pointLightColor[MAX_POINT_LIGHTS];
//uniform vec3 pointLightPosition[MAX_POINT_LIGHTS];
//uniform float pointLightDistance[MAX_POINT_LIGHTS];


vec3 phong(vec3 p,  vec3 v, vec3 n, vec3 lightPos, vec3 lightColor,vec3 colorClouds,vec3 colorDay,vec3 colorNight){
    if(dot(v,n) < 0.0)
        return vec3(0, 0, 0); // back-face

    vec3 toLight = normalize(-lightPos);
    vec3 reflectLight = reflect(-toLight, n);
    float ndots = max( dot(toLight,n), 0.0);
    float rdotv = max( dot(reflectLight, v), 0.0);


	vec3 isDiffuse = (dayBool == 1 )? colorDay : diffuseMaterial;
    if(cloudsBool == 1) {
        isDiffuse = (1.0-colorClouds)*isDiffuse + colorClouds*vec3(1,1,1);
    }
	vec3 ambi = (nightBool == 1)? colorNight : ambientMaterial;
	vec3 diff =  isDiffuse * ndots * lightColor;
    vec3 spec = specularMaterial * pow(rdotv, shininessMaterial ) * lightColor ;

    return pow(1.0 - ndots,6.0)* ambi + diff + spec;
}


void main(){
    //bool useOrtho = projectionMatrix[2][3] == 0;
    //vec3 viewDir = useOrtho?vec3(0,0,1):normalize(–ecPosition.xyz);
    //vec3 vColor= phong(ecPosition.xyz,ecNormal,viewDir);
    //gl_FragColor = vec4(vColor, 1.0);
/*
    vec2 coord=vUv;
    vec4 RGB = texture2D( daytimeTexture, vUv );
    vec4 clouds = texture2D( cloudTexture, coord+vec2(0.0*time,0.0)); //gucken ob wolken da sind, an koordination
    RGB = 1.0-(1.0-clouds.r)*(1.0-RGB);
*/
    // get color from different textures
    vec3 colorDay    = texture2D(daytimeTexture, vUv).rgb;
    vec3 colorNight  = texture2D(nightTexture, vUv).rgb;
    vec3 colorClouds = texture2D(cloudTexture, vUv).rgb;
   	vec3 colorEarth = phong(ecPosition.xyz,viewDir, ecNormal, directionalLightDirection[0], directionalLightColor[0],colorClouds,colorDay,colorNight);

    gl_FragColor = vec4(colorEarth, 0.1);


//    gl_FragColor = vec4(RGB.r,RGB.g,RGB.b,1.0 );


}
