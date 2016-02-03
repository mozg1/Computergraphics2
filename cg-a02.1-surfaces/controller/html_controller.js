/*
 * JavaScript / Canvas teaching framwork 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "random", "band", "parametric", "robot", "planet", "explosion"],
    (function($,BufferGeometry, Random, Band, Parametric, Robot, Planet, Explosion) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {

        /*
         *   change modes - random/band
         */
            $("#random").show();
            $("#band").hide();
            $("#parametric").hide();
            $("#showMat").hide();
            $("#showWire").hide();

            $("#exp").hide();
            $("#planet").hide();


            $("#btnRandom").click( (function() {
                $("#random").show();
                $("#band").hide();
                $("#parametric").hide();
                $("#exp").hide();
                $("#planet").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
                $("#exp").hide();
                $("#planet").hide();

                $("#band").show();
                $("#parametric").hide();
                $("#showMat").hide();
                $("#showWire").hide();
            }));

            $("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide()

                $("#exp").hide();
                $("#planet").hide();

                $("#parametric").show();
                $("#showMat").show();
                $("#showWire").show();
            }));

            $("#btnRobot").click( (function() {
                $("#random").hide();
                $("#band").hide();
                $("#parametric").hide();
                $("#showMat").show();
                $("#showWire").show();

                $("#exp").hide();
                $("#planet").hide();
            }));
//======================================================================== Ex3

            $("#btnNewPlanet").click( (function() {
                var planet = new Planet();
                scene.planetLight();
                scene.addBufferGeometry(planet);
                $("#exp").hide();
                $("#planet").show();
                $("#parametric").hide();
                $("#showMat").hide();
                $("#showWire").hide();


                /**
                scene.addMesh(planet.getMesh());
                var aLight = new THREE.AmbientLight(color);
                scene.addLight(aLight);
                var dLight = new THREE.DirectionalLight(color, intensity);
                dLight.name = "dLight";
                dLight.position.set(-1, 0, -0.3).normalize();
                scene.addLight(dLight);
        */
            }));

            
            $("#btnNewExplosion").click( (function() {
                var explosion = new Explosion();
                scene.explosionLight();
                scene.addBufferGeometry(explosion);
                $("#exp").show();
                $("#planet").hide();
                $("#parametric").hide();
                $("#showMat").hide();
                $("#showWire").hide();
        /**
                scene.addMesh(explosion.getMesh());
                var aLight = new THREE.AmbientLight(color);
                scene.addLight(aLight);
                var dLight = new THREE.DirectionalLight(color, intensity);
                dLight.name = "dLight";
                dLight.position.set(-1, 0, -0.3).normalize();
                scene.addLight(dLight);
         */
            }));




//========================================================================



            /*
             *   create a random number of points, or parse user input
             *   create a geometry buffer and pass random position and color values to create a mesh
             *   add the buffer to the scene
             */
            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometry();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometry(bufferGeometryRandom);
            }));


            /*
             * set radius, height distance and number of bands
             */
            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };

                /*
                 * pass parameters above to new Band object
                 * create geometry buffer and pass set position and color values to create a mesh
                 * add buffer to the scene
                 */
                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometry();
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());

                scene.addBufferGeometry(bufferGeometryBand);
            }));

            $("#btnNewParam").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : -2,
                    umax : 2,
                    vmin : -2,
                    vmax : 2
                };

                var posFunc = function(u,v) {
                 //SHOE -2 - 2 / -2 - 2

                    var x = u;
                    var y = v;
                    var z = ((1/3)*Math.pow(u,3) + (1/2)*Math.pow(v,2));

                    return [x*100,y*100,z*100];
                };

                newBufferGeo(posFunc,config);
            }));

            $("#btnCrossCup").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : 0,
                    umax : 1,
                    vmin : 0,
                    vmax : 2*Math.PI
                };

                var posFunc = function(u,v) {
                    // CROSS CUP: 0-1 / 0 - 2*Math.PI
                    var x = 1-Math.pow(u,2) + Math.pow(u,2)*Math.sin(v)*Math.sin(v);
                    var y = Math.pow(u,2) * Math.sin(v)*Math.sin(v) + 2*Math.pow(u,2) * Math.sin(v)*Math.cos(v);
                    var z = Math.sqrt((1-Math.pow(u,2))/2 * u * (Math.sin(v)+Math.cos(v)));
                    return [x*100,y*100,z*100];
                };

                newBufferGeo(posFunc,config);
            }));

            $("#btnApple").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI,
                    vmin : -Math.PI,
                    vmax : Math.PI
                };

                var posFunc = function(u,v) {
                    // APPLE: 0-2*pi / -pi - pi

                     var x = Math.cos(u)*(4+3.8*Math.cos(v));
                     var y = Math.sin(u)*(4+3.8*Math.cos(v));
                     var z = (Math.cos(v)+Math.sin(v)-1)*(1+Math.sin(v))*Math.log(1-Math.PI * v/10)+7.5*Math.sin(v);

                    return [x*50,y*50,z*50];
                };

                newBufferGeo(posFunc,config);

            }));

            $("#btnHorn").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : 0,
                    umax : 1,
                    vmin : -Math.PI,
                    vmax : Math.PI
                };

                var posFunc = function(u,v) {
                    // HORN: 0-1 / -pi - pi

                     var x = (5 + u*Math.cos(v))*Math.sin(2 * Math.PI * u);
                     var y = (5 + u*Math.cos(v))*Math.cos(2 * Math.PI * u) + 3 * u;
                     var z = u*Math.sin(v);

                    return [x*100,y*100,z*100];
                };

                newBufferGeo(posFunc,config);

            }));

            $("#btnDini").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : 0,
                    umax : 4*Math.PI,
                    vmin : 0.01,
                    vmax : 2
                };

                var posFunc = function(u,v) {
                    // DINI: 0 - 4*pi / 0.01 - 2
                     var x = 2*Math.cos(u)*Math.sin(v);
                     var y = 2*Math.sin(u)*Math.sin(v);
                     var z = 2*(Math.cos(v) + Math.log(Math.tan(v/2)))+3 * u;


                    return [x*100,y*100,z*100];
                };

                newBufferGeo(posFunc,config);

            }));

            $("#btnWaveSphere").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : 0,
                    umax : 14.5,
                    vmin : 0,
                    vmax : 2*Math.PI
                };

                var posFunc = function(u,v) {
                    // Wellenkugel: 0-14.5 / 0-2pi

                     var x = u *Math.cos(Math.cos(u))*Math.cos(v);
                     var y = u *Math.cos(Math.cos(u))*Math.sin(v);
                     var z = u *Math.sin(Math.cos(u));


                    return [x*50,y*50,z*50];
                };

                newBufferGeo(posFunc,config);

            }));

            $("#btnEllipsoid").click ( (function() {
                var config = {
                    segments : parseInt($("#numSegmentsP").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI,
                    vmin : 0,
                    vmax : Math.PI
                };

                var posFunc = function(u,v) {
                    // Ellipse: 0-2pi / 0-pi

                    var x = 2 * Math.cos(u)*Math.sin(v);
                    var y = 5 * Math.sin(u)*Math.sin(v);
                    var z = 7 * Math.cos(v);


                    return [x*50,y*50,z*50];
                };

                newBufferGeo(posFunc,config);

            }));
            //==========================================================================0
            $("#btnRobot").click ( (function() {
                var bot = new Robot();
                //scene.addBufferGeometry(bot.getRoot());
                //bot.getSkins().forEach(function(skin){scene.scene.add(skin)}); // FIXME: This was an experiment, remove
                scene.scene.add(bot.getRoot());
            }));

            //===========================================================================


            function newBufferGeo(posFunc, config) {
                var rgb = {
                    red : parseFloat($("#red").attr("value"))/100,
                    blue : parseFloat($("#blue").attr("value"))/100,
                    green : parseFloat($("#green").attr("value"))/100
                };

                var param = new Parametric(posFunc, config, rgb);
                var bufferGeometryParam = new BufferGeometry(scene.rgbToHex(rgb.red, rgb.green, rgb.blue));
                bufferGeometryParam.addAttribute("position", param.getPositions());
                bufferGeometryParam.addAttribute("color", param.getColors());
                bufferGeometryParam.setIndex(param.getIndices());
                bufferGeometryParam.setSegments(param.getSegments());
/*
bufferGeometryTorus.geometry.setIndex( new THREE.BufferAttribute(torus.getIndices(), 1));
*/

                scene.addBufferGeometry(bufferGeometryParam);
                return this;
            }


            $("#numSegmentsP").change( (function() {
                var segments = parseInt($("#numSegmentsP").attr("value"));
                scene.changeSegments(segments);
            }));


            $("#red").change( (function() {
                var rgb = {
                    red : parseInt($("#red").attr("value")),
                    blue : parseInt($("#blue").attr("value")),
                    green : parseInt($("#green").attr("value"))
                };
                scene.changeColor(rgb);

            }));

            $("#green").change( (function() {
                var rgb = {
                    red : parseInt($("#red").attr("value")),
                    blue : parseInt($("#blue").attr("value")),
                    green : parseInt($("#green").attr("value"))
                };

                scene.changeColor(rgb);

            }));

            $("#blue").change( (function() {
                var rgb = {
                    red : parseInt($("#red").attr("value")),
                    blue : parseInt($("#blue").attr("value")),
                    green : parseInt($("#green").attr("value"))
                };

                scene.changeColor(rgb);

            }));

            $("#showMat").click( function() {
                var rgb = {
                    red : parseInt($("#red").attr("value")),
                    blue : parseInt($("#blue").attr("value")),
                    green : parseInt($("#green").attr("value"))
                };
                scene.showMaterial(scene.rgbToHex(rgb.red, rgb.green, rgb.blue));
            });

            $("#showWire").click(function() {
                var rgb = {
                    red: parseInt($("#red").attr("value")),
                    blue: parseInt($("#blue").attr("value")),
                    green: parseInt($("#green").attr("value"))
                };
                scene.showWireframes(scene.rgbToHex(rgb.red, rgb.green, rgb.blue));
            });

            /*
             * animate drawn objects
             */
            $("#animate").click( (function() {
                    var myTimer = setInterval(function () {
                        if ($("#animate").is(':checked')) {
                            scene.animate(($("#speed").attr("value"))/10000);
                        } else {
                            clearInterval(myTimer);
                        }
                    },1);
            }));

            $("#clearAll").click( function() {
                scene.deleteAll();
            })


        };

        // return the constructor function
        return HtmlController;


    })); // require


