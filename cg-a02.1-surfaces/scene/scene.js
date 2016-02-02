/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: scene
 *
 * A Scene is a depth-sorted collection of things to be drawn, 
 * plus a background fill style.
 *
 */



/* requireJS module definition */
define(["three", "util", "shaders", "BufferGeometry", "random", "band"],
    (function(THREE, util, shaders, BufferGeometry, Random, Band) {

        "use strict";

        /*
         * Scene constructor
         */
        var Scene = function(renderer, width, height) {

            var start = Date.now();

            // the scope of the object instance basically means the viewport
            var scope = this;

            scope.renderer = renderer;
            scope.t = 0.0;

            scope.camera = new THREE.PerspectiveCamera( 66, width / height, 0.1, 2000 );
            scope.camera.position.z = 1000;
            scope.scene = new THREE.Scene();

            var spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.position.set( 0, 0, 1000 );

            spotLight.castShadow = true;

            spotLight.shadowMapWidth = 1024;
            spotLight.shadowMapHeight = 1024;

            spotLight.shadowCameraNear = 0.1;
            spotLight.shadowCameraFar =  2000;
            spotLight.shadowCameraFov = 66;

            scope.scene.add( spotLight );

            // Add a listener for 'keydown' events. By this listener, all key events will be
            // passed to the function 'onDocumentKeyDown'. There's another event type 'keypress'.
            document.addEventListener("keydown", onDocumentKeyDown, false);


            /*
             * you can rotate the meshes in 4 directions, using the arrow keys
             */
            function onDocumentKeyDown(event){
                // Get the key code of the pressed key
                var keyCode = event.which;

                if(keyCode == 38){
                    console.log("cursor up");
                    scope.currentMesh.rotation.x += 0.05;
                    // Cursor down
                } else if(keyCode == 40){
                    console.log("cursor down");
                    scope.currentMesh.rotation.x += -0.05;
                    // Cursor left
                } else if(keyCode == 37){
                    console.log("cursor left");
                    if (scope.currentMesh) {
                        scope.currentMesh.rotation.y += 0.05;
                    }else{
                        var nodeHead = scope.scene.getObjectByName("torso", true);
                        if (nodeHead)
                            nodeHead.rotation.y += 0.05;
                    }

                } else if(keyCode == 39){
                    console.log("cursor right");
                    if (scope.currentMesh){
                        scope.currentMesh.rotation.y += -0.05;
                    }else{
                        var nodeHead = scope.scene.getObjectByName("torso", true);
                        if (nodeHead)
                            nodeHead.rotation.y -= 0.05;
                    }

                }

                //turning the neck
                else if(keyCode == 49) {
                    console.log("key 1");
                    var nodeHead = scope.scene.getObjectByName("neck", true);
                    if (nodeHead)
                        nodeHead.rotation.y += 0.05;
                }
                else if(keyCode == 50) {
                    console.log("key 2");
                    var nodeHead = scope.scene.getObjectByName("neck", true);
                    if (nodeHead)
                        nodeHead.rotation.y -= 0.05;
                }

                //turning the head
                else if(keyCode == 55) {
                    console.log("key 7");
                    var nodeHead = scope.scene.getObjectByName("head", true);
                    if (nodeHead)
                        nodeHead.rotation.z += 0.05;
                }
                else if(keyCode == 56) {
                    console.log("key 8");
                    var nodeHead = scope.scene.getObjectByName("head", true);
                    if (nodeHead)
                        nodeHead.rotation.z -= 0.05;
                }

                //shoulder up-down
                else if(keyCode == 51) {
                    console.log("key 3");
                    var nodeShoulder = scope.scene.getObjectByName("shoulder", true);
                    if (nodeShoulder)
                        nodeShoulder.rotation.z += 0.05;
                        console.log(nodeHead.rotation.z);
                }
                else if(keyCode == 52) {
                    console.log("key 4");
                    nodeShoulder = scope.scene.getObjectByName("shoulder", true);
                    if (nodeShoulder)
                        nodeShoulder.rotation.z -= 0.05;
                }
                //TODO: maybe add front-back

                //elbow up-down
                else if(keyCode == 53) {
                    console.log("key 5");
                    var nodeElbow = scope.scene.getObjectByName("elbow", true);
                    if (nodeElbow)
                        nodeElbow.rotation.z += 0.05;
                    console.log(nodeHead.rotation.z);
                }
                else if(keyCode == 54) {
                    console.log("key 6");
                    nodeElbow = scope.scene.getObjectByName("elbow", true);
                    if (nodeElbow)
                        nodeElbow.rotation.z -= 0.05;
                }



            }
/*
            var animateOne = function(animation) {
                console.log(Date.now());
                var r = $.Deferred();
                animation();
                setTimeout(function() {
                    r.resolve();
                }, 500);
                return r;
            };
*/
            this.animate = function(speed) {
                if(scope.currentMesh == undefined) {
                    this.animateHead(speed);
                    this.animateShoulder(speed);
                    this.animateElbow(speed);

                    //animateOne(this.animateShoulder(speed)).done(this.animateElbow(speed))
                } else {
                    scope.currentMesh.rotation.x += speed;
                    scope.currentMesh.rotation.y += speed;
                    var obj = scope.scene.children[ scope.scene.children.length-1 ];
                    obj.children[0].material.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );

                }

            };

            this.animateHead = function(speed) {
                var nodeHead = scope.scene.getObjectByName("head", true);
                if (nodeHead)
                    nodeHead.rotation.z += speed;
            };

            this.animateShoulder = function(speed) {
                var nodeShoulder = scope.scene.getObjectByName("shoulder", true);
                if (nodeShoulder)
                    nodeShoulder.rotation.z += speed;
            };

            this.animateElbow = function(speed) {
                var nodeElbow = scope.scene.getObjectByName("elbow", true);
                if (nodeElbow)
                    nodeElbow.rotation.z += speed;
            };


            /*
             * add meshes to scene
             */
            this.addBufferGeometry = function(bufferGeometry) {

                scope.currentMesh = bufferGeometry.getMesh();
                scope.scene.add( scope.currentMesh );

            };

            this.deleteGeometry = function(bufferGeometry) {

            };


            this.showMaterial = function(color) {
                var obj = scope.scene.children[ scope.scene.children.length-1 ];
                if(obj.material.wireframe == true) {
                    obj.material = new THREE.MeshDepthMaterial( { //MeshBasicMaterial / PointsMaterial
                        color: color,
                        size: 10, vertexColors: THREE.VertexColors,
                        side: THREE.DoubleSide,
                        wireframe: false,
                        transparent: true
                    });
                } else {
                    obj.material = new THREE.MeshBasicMaterial({ //MeshBasicMaterial / PointsMaterial
                        color: color,
                        size: 10, vertexColors: THREE.VertexColors,
                        side: THREE.DoubleSide,
                        wireframe: true
                    });
                }
                console.log(color);
            };

            this.showWireframes = function(color) {
                var obj = scope.scene.children[ scope.scene.children.length-1 ];
                if(obj.material.wireframe == false) {
                    obj.material = new THREE.MeshBasicMaterial( { //MeshBasicMaterial / PointsMaterial
                        color: color,
                        size: 10, vertexColors: THREE.VertexColors,
                        side: THREE.DoubleSide,
                        wireframe: true
                    });
                } else {
                    // TODO: why is everything black?
                    obj.material = new THREE.MeshPhongMaterial( { //MeshBasicMaterial / PointsMaterial
                        color: color,
                        /*
                        shading: THREE.SmoothShading,
                        shininess: 30,
                        specular: 0x111111,
                        */
                        wireframe: false
                    });
                }

            };

            this.changeColor = function(rgb) {

                var obj = scope.scene.children[ scope.scene.children.length-1 ];

                var i =0;
                var newcolor = [];
                /*
                while(i < obj.geometry.color.length) {
                    newcolor[i] = rgb[i];
                    newcolor[i+1] = rgb[i+1];
                    newcolor[i+2] = rgb[i+2];
                    i+=3;
                }
*/
                obj.material.color.setHex( this.rgbToHex(rgb.red, rgb.green, rgb.blue));

                console.log(obj);

                console.log(rgb.red + " " + rgb.green + " " + rgb.blue);

                obj.geometry.addAttribute("color", newcolor);

            };

            this.changeSegments = function(number) {
                var obj = scope.scene.children[ scope.scene.children.length-1 ];
                console.log(obj);

                obj.segments = number;

            };

            this.componentToHex = function(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            };

            this.rgbToHex = function(r, g, b) {
                console.log( this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b) );
                return "0x" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
            };

            this.deleteAll = function() {
                var obj, i;
                for ( i = scope.scene.children.length - 1; i >= 0 ; i -- ) {
                    obj = scope.scene.children[ i ];
                    scope.scene.remove(obj);
                }
            };

            /*
             * drawing the scene
             */
            this.draw = function() {

                requestAnimFrame( scope.draw );

                scope.renderer.render(scope.scene, scope.camera);

            };


            this.planetLight = function(){

                var color = 0xff0000;
                var intensity = 1;

                var aLight = new THREE.AmbientLight(color);
                var dLight = new THREE.DirectionalLight(color, intensity);
                dLight.name = "dLight";
                dLight.position.set(-1,0,-0.3).normalize();
                scope.scene.add(aLight);
                scope.scene.add(dLight);

                var sphereSize = 100;
                var pointLightHelper = new THREE.DirectionalLightHelper(dLight);
                scope.scene.add( pointLightHelper );

            };

            this.explosionLight = function(){

                var color = 0xff0000;
                var intensity = 1;

                var aLight = new THREE.AmbientLight(color);
                var dLight = new THREE.DirectionalLight(color, intensity);
                dLight.name = "dLight";
                dLight.position.set(-1,0,-0.3).normalize();
                scope.scene.add(aLight);
                scope.scene.add(dLight);

                var sphereSize = 100;
                var pointLightHelper = new THREE.DirectionalLightHelper(dLight);
                scope.scene.add( pointLightHelper );

            };


            /*
            this.changeTexture = function() {
                var obj = scope.scene.children[ scope.scene.children.length-1 ];
                obj.material.uniforms.cloudTexture.value =
            }
            */

        };


        // this module only exports the constructor for Scene objects
        return Scene;

    })); // define

    
