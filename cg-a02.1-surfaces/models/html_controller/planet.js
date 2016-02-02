/* requireJS module definition */
define(["three", "shaders"],
    (function(THREE, Shaders) {

        "use strict";

        var Planet = function() {


            this.root = new THREE.Object3D();

            var scope = this;

            // implement ShaderMaterial using the code from
            // the lecture

            var material = new THREE.ShaderMaterial({

                uniforms: THREE.UniformsUtils.merge(

					[
						THREE.UniformsLib['lights'],
						{
							phongDiffuseMaterial:    { type: 'c', value: new THREE.Color(1,1,1)},
							phongSpecularMaterial:   { type: 'c', value: new THREE.Color(0.7, 0.7, 0.7)},
							phongAmbientMaterial:    { type: 'c', value: new THREE.Color(0.8, 0.2, 0.2)},
							phongShininessMaterial:  { type: 'f', value: 16.0},
							
							dayTexture: 			 { type: 't' , value: null },
							cloudTexture: 			 { type: 't' , value: null },
							nightTexture: 			 { type: 't' , value: null },
							
							cloudsTextureBool:       { type: 'i' , value: $('checkBoxCloudsTexture').is('checked')},
							dayTimeTextureBool:		 { type: 'i' , value: $('checkBoxDayTexture').is('checked')},
							nightTextureBool:		 { type: 'i' , value: $('checkBoxNightTexture').is('checked')}
						}
					]
                ),

                vertexShader: Shaders.getVertexShader("planet"),
                fragmentShader: Shaders.getFragmentShader("planet"),
                lights: true
            });


            // hint:
            // texture can be assigned only when it is loaded completely, e.g. like this
            //Define the texture for the planet with path
            //var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture(loader) } );
            material.uniforms.dayTexture.value = THREE.ImageUtils.loadTexture("textures/earth_month04.jpg");
            material.uniforms.cloudTexture.value = THREE.ImageUtils.loadTexture("textures/earth_clouds_2048.jpg");
            material.uniforms.nightTexture.value = THREE.ImageUtils.loadTexture("textures/earth_at_night_2048.jpg");


            scope.mesh = new THREE.Mesh( new THREE.SphereGeometry(600, 100,100), material );
            scope.mesh.name = "planet";

            scope.root.add(scope.mesh);

            this.getMesh = function() {
                return this.root;
            };
			
			this.changeTexture = function(tex){
				switch(tex){
					case 'day' 	 : {if (material.uniforms.dayTimeTextureBool.value == 0){
										material.uniforms.dayTimeTextureBool.value = 1;
									}else {
										material.uniforms.dayTimeTextureBool.value = 0;
									} 
								  }
									break;
					case 'clouds': {if (material.uniforms.cloudsTextureBool.value == 0){
										material.uniforms.cloudsTextureBool.value = 1;
									}else {
										material.uniforms.cloudsTextureBool.value = 0;
									} 
								  }
									break;
					case 'night' :  {if (material.uniforms.nightTextureBool.value == 0){
										 material.uniforms.nightTextureBool.value = 1;
									}else {
										 material.uniforms.nightTextureBool.value = 0;
									} 
								  }
									break;
					default:  console.log("error changeTexture");
				}	
				material.needsUpdate = true;
			};
			
			this.getTextures = function(){
				return material.uniforms.dayTimeTextureBool.value;
			};
        }; // constructor

        return Planet;

    })); // define module