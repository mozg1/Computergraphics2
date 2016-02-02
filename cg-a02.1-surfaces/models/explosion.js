/* requireJS module definition */
define(["jquery", "three", "shaders"],
    (function($, THREE, Shaders) {

        "use strict";

        var Explosion = function() {

            var start = Date.now();

            this.root = new THREE.Object3D();

            var scope = this;

            // load explosion texture
            //
            // Loading textures is asynchronous. That means you the load function
            // takes the file url as input and three callback functions
            // onLoadSuccess, onLoadProgress and onLoadError
            // we need to handle these cases. Only in onLoadSuccess we can setup
            // the scene, the texture and the shaders correctly.
            // correctly this would be implemented with promises (see assignment add-on question)


            var material = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: {type: 'c', value: new THREE.Color(1, 0, 0)},
                        specularMaterial: {type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
                        ambientMaterial: {type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
                        shininessMaterial: {type: 'f', value: 16.0},
                        explosion:{type: "t", value:null},
                        //topoTexture:{type: "t", value: null},
                        time: {type: "f", value: 0.0}
                    }]),
                vertexShader: Shaders.getVertexShader('explosion'),
                fragmentShader: Shaders.getFragmentShader('explosion'),
                lights:true
            });

            // define a shader with these uniform values

            // var material = new THREE.ShaderMaterial( {
            //         uniforms: {
            //             explosionTex: ... aka explosion texture
            //             time: ... time since start
            //             weight: ... aka displacement weight - how strong is the displacement
            //             freqScale: ... frequency of the noise f < 0 = only low frequency noise, f > 0 more and more high frequency noise 
            //                            comes on
            //             colorScale: ... rescales the access positioning into the explosion textures (high value = lighter color, low value = darker color)
            //         },
            //         vertexShader: Shaders.getVertexShader("explosion"),
            //         fragmentShader: Shaders.getFragmentShader("explosion")
            //     } );
            var loader = new THREE.TextureLoader();

            loader.load("textures/explosion.png" ,
                function ( texture ){
                    material.uniforms.explosion.value = texture;
                },
                // Function called when download progresses
                function ( xhr ) {
                    console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
                },
                // Function called when download errors
                function ( xhr ) {
                    console.log( 'An error happened' );
                }
            );


            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry( 300, 50, 50 ), material );
            scope.mesh.name = "explosion";
            scope.root.add(scope.mesh);



            this.getMesh = function() {
                return this.root;
            };


        }; // constructor


        return Explosion;

    })); // define module

