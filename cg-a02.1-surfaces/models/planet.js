/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function() {


            this.root = new THREE.Object3D();

            // load and create required textures
            
            var scope = this;

            //s 11/26

            var material = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.merge([
                    THREE.UniformsLib['lights'],
                    {
                        diffuseMaterial: {type: 'c', value: new THREE.Color(1, 0, 0)},
                        specularMaterial: {type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
                        ambientMaterial: {type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
                        shininessMaterial: {type: 'f', value: 6.0},

                        daytimeTexture: {type: "t", value: null},
                        cloudTexture: {type: "t", value: null},
                        nightTexture:{type: "t", value: null},

                        cloudsTextureBool:       { type: 'i' , value: $('checkBoxCloudsTexture').is(':checked')},
                        dayTimeTextureBool:		 { type: 'i' , value: $('checkBoxDayTexture').is(':checked')},
                        nightTextureBool:		 { type: 'i' , value: $('checkBoxNightTexture').is(':checked')},

                        time: {type: "f", value: 1.5}
                    }]),
                vertexShader: Shaders.getVertexShader('planet'),
                fragmentShader: Shaders.getFragmentShader('planet'),

                lights:true
            });
            // implement ShaderMaterial using the code from
            // the lecture 
            
            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this =========================LOADER
            var loader = new THREE.TextureLoader(); 
            //http://threejs.org/docs/index.html#Reference/Loaders/MaterialLoader

            loader.load("textures/earth_month04.jpg" ,
                function ( texture ) {
                    material.uniforms.daytimeTexture.value = texture;
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

            loader.load("textures/earth_at_night_2048.jpg" , 
                function ( texture ){
                    material.uniforms.nightTexture.value = texture;
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

            loader.load("textures/earth_clouds_2048.jpg" , 
                function ( texture ){
                material.uniforms.cloudTexture.value = texture;
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


            // for dynamically changing textures
       //     material.map.needsUpdate = true;
//================================================================================================

//            material.uniforms.daytimeTexture.value   = textureName;
            
            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(400, 100,100), material );
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);




            this.getMesh = function() {
                return this.root;
            };


        }; // constructor

        return Planet;

    })); // define module


