/*
 * JavaScript / Canvas teaching framework 
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 * changes by Benjamin Bleckmann, Josef Strunk
 * Module: html_controller
 *
 * Defines callback functions for communicating with various 
 * HTML elements on the page, e.g. buttons and parameter fields.
 *
 */


/* requireJS module definition */
define(["jquery", "BufferGeometry", "BufferGeometryPoints", "random", "band","parametric","robot","planet","explosion"],
    (function($,BufferGeometry,BufferGeometryPoints, Random, Band,Parametric,Robot,Planet,Explosion) {
        "use strict";

        /*
         * define callback functions to react to changes in the HTML page
         * and provide them with a closure defining context and scene
         */
        var HtmlController = function(scene) {


            $("#random").hide();
            $("#band").hide();
			$("#ellipsoid").hide();
			$("#planet").show();
			$("#explosion").hide();
			$("#parametric").hide();
			$("#robot_div").hide();
		

            $("#btnRandom").click( (function() {
                $("#band").hide();
				$("#parametric").hide();
				$("#ellipsoid").hide();
				$("#explosion").hide();
				$("#planet").hide();
				$("#random").show();
				$("#robot_div").hide();
            }));

            $("#btnBand").click( (function() {
                $("#random").hide();
				$("#parametric").hide();
				$("#ellipsoid").hide();
				$("#planet").hide();
				$("#explosion").hide();
                $("#band").show();
				$("#robot_div").hide();
				
            }));
			
			$("#btnEllipsoid").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").hide();
				$("#ellipsoid").show();
			}));
			
			$("#btnParametric").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").show();
				$("#planet").hide();
				$("#explosion").hide();
				$("#ellipsoid").hide();
				$("#robot_div").hide();
			}));
			
			$("#btnPlanet").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").hide();
				$("#planet").show();
				$("#explosion").hide();
				$("#ellipsoid").hide();
				$("#robot_div").hide();
			}));
			
			$("#btnExplosion").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").hide();
				$("#planet").hide();
				$("#explosion").show();
				$("#ellipsoid").hide();
				$("#robot_div").hide();
			}));
			
			$("#btnRobot").click( (function() {
                $("#random").hide();
                $("#band").hide();
				$("#parametric").hide();
				$("#planet").hide();
				$("#explosion").hide();
				$("#ellipsoid").hide();
				$("#robot_div").show();
			}));
			
			// create random pointcloud
            $("#btnNewRandom").click( (function() {

                var numPoints = parseInt($("#numItems").attr("value"));
                var random = new Random(numPoints);
                var bufferGeometryRandom = new BufferGeometryPoints();
                bufferGeometryRandom.addAttribute("position", random.getPositions());
                bufferGeometryRandom.addAttribute("color", random.getColors());

                scene.addBufferGeometryPoints(bufferGeometryRandom);
            }));

			// create band
            $("#btnNewBand").click( (function() {

                var config = {
                    segments : parseInt($("#numSegments").attr("value")),
                    radius : parseInt($("#radius").attr("value")),
                    height : parseInt($("#height").attr("value"))
                };


                var band = new Band(config);
                var bufferGeometryBand = new BufferGeometryPoints();
				
                bufferGeometryBand.addAttribute("position", band.getPositions());
                bufferGeometryBand.addAttribute("color", band.getColors());
				console.log(bufferGeometryBand.getMesh());
                scene.addBufferGeometry(bufferGeometryBand);
            }));
			
			// create ellipsoid
			$("#btnNewEllipsoid").click( (function() {


                var config = {
                    segments : parseInt($("#numSegmentsEllipsoid").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI+0.125,
                    vmin : 0,
                    vmax : Math.PI
                };
				
				var a = ($("#constA").attr("value"));
				var b = ($("#constB").attr("value"));
				var c = ($("#constC").attr("value"));
				
				var posFunc = function(u,v) {
                    var x = eval(a+"*Math.cos(u)*Math.sin(v)*125");
                    var y = eval(b+"*Math.sin(u)*Math.sin(v)*125");
                    var z = eval(c+"*Math.cos(v)*125");
                    return [x,y,z];
                };


              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());
				  bufferGeometryParametric.setIndex(parametric.getIndices());
			  var bufferGeometryParametric2= new BufferGeometryPoints();
				  bufferGeometryParametric2.addAttribute("position", parametric.getPositions());
				  bufferGeometryParametric2.addAttribute("color", parametric.getColors());

                scene.addBufferGeometry(bufferGeometryParametric);
            }));
			
			// create p.surface
			$("#btnNewParametric").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : parseInt($("#numUmin").attr("value")),
                    umax : parseInt($("#numUmax").attr("value")),
                    vmin : parseInt($("#numVmin").attr("value")),
                    vmax : parseInt($("#numVmax").attr("value"))
                };
				
				var posFunc = function(u,v) {
                    var x = eval($("#x").attr("value"));
                    var y = eval($("#y").attr("value"));
                    var z = eval($("#z").attr("value"));
                    return [x,y,z];
                };

              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());
				  bufferGeometryParametric.setIndex(parametric.getIndices());
			  var bufferGeometryParametric2= new BufferGeometryPoints();
				  bufferGeometryParametric2.addAttribute("position", parametric.getPositions());
				  bufferGeometryParametric2.addAttribute("color", parametric.getColors());
				  
                scene.addBufferGeometry(bufferGeometryParametric);
            }));
			
			// create pyramide
			$("#btnNewParametric2").click( (function() {


                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : -Math.PI,
                    umax : Math.PI,
                    vmin : -Math.PI,
                    vmax : Math.PI
                };
				
				var posFunc = function(u,v) {
                    var x = eval("Math.cos(u)*200");
                    var y = eval("Math.cos(v)*200");
                    var z = eval("Math.cos(u+v)*200");
                    return [x,y,z];
                };

              var parametric = new Parametric(posFunc, config);
			  
			 var  bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());
				  bufferGeometryParametric.setIndex(parametric.getIndices());
			  var bufferGeometryParametric2= new BufferGeometryPoints();
				  bufferGeometryParametric2.addAttribute("position", parametric.getPositions());
				  bufferGeometryParametric2.addAttribute("color", parametric.getColors());
				  
                  scene.addBufferGeometry(bufferGeometryParametric);
            }));
			
			// create torus
			$("#btnNewParametric3").click( (function() {

                var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI + 0.13,
                    vmin : 0,
                    vmax : 2*Math.PI
                };
				
				var posFunc = function(u,v) {
                    var x = eval("((5+2*Math.cos(v))*Math.cos(u))*50");
                    var y = eval("((5+2*Math.cos(v))*Math.sin(u))*50");
                    var z = eval("2*Math.sin(v)*50");
                    return [x,y,z];
                };

              var parametric = new Parametric(posFunc, config);
			  
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());
				  bufferGeometryParametric.setIndex(parametric.getIndices());
			  var bufferGeometryParametric2= new BufferGeometryPoints();
				  bufferGeometryParametric2.addAttribute("position", parametric.getPositions());
				  bufferGeometryParametric2.addAttribute("color", parametric.getColors());
				  
				console.log(parametric.getIndices());
                scene.addBufferGeometry(bufferGeometryParametric);
            }));
            
			// rotationcheckbox
			$("#CheckBoxRotation").click( (function() {

			    var checked = $("#CheckBoxRotation").attr("checked");
				var scope = scene.getScope();	
				var render = function () {
						
						if(document.getElementById("CheckBoxRotation").checked==true)
						requestAnimationFrame( render ); 
						scope.currentMesh.rotation.x += 0.01; 
						scope.currentMesh.rotation.y += 0.01; 

				};
					
				if(checked){
					render();
				}						
            }));
            
			// wireframe checkbox
			$("#CheckBoxWireframe").click( (function() {

			    var checked = $("#CheckBoxWireframe").attr("checked");
			    var scope = scene.getScope();
			    
					if (checked) {
						scope.currentMesh.material.wireframe = true;
					} else {
					
						scope.currentMesh.material.wireframe = false;
					}						
            }));
			
			// wireframe checkbox ellipsoid
			$("#CheckBoxWireframeElli").click( (function() {
				var checked = $("#CheckBoxWireframeElli").attr("checked");
			    var scope = scene.getScope();
			    
					if (checked) {
						scope.currentMesh.material.wireframe = true;
					} else {
					
						scope.currentMesh.material.wireframe = false;
					}
            }));
            
            //solidcheckbox
            $("#CheckBoxSolid").click( (function() {
				
			    var checked = $("#CheckBoxSolid").attr("checked");
				var scope = scene.getScope();	
				var render = function () {
						
						if(document.getElementById("CheckBoxSolid").checked==true)
						requestAnimationFrame( render ); 
						scope.currentMesh.rotation.x += 0.04; 
						scope.currentMesh.rotation.y += 0.04; 
				};
					
				if(checked){
					render();
				}
									
            }));

			// pointscheckbox
            $("#CheckBoxPoints").click( (function() {

			    var checked = $("#CheckBoxPoints").attr("checked");
				var scope = scene.getScope();											
            }));
			
			// wireframe checkbox
			$("#CheckBoxWireframeElli").click( (function() {

			    var checked = $("#CheckBoxWireframeElli").attr("checked");
			    var scope = scene.getScope();
			    
					if (checked) {
						scope.currentMesh.material.wireframe = true;
					} else {
					
						scope.currentMesh.material.wireframe = false;
					}									
            }));
            
            //solidcheckbox
            $("#CheckBoxSolidElli").click( (function() {

			    var checked = $("#CheckBoxSolid").attr("checked");
				var scope = scene.getScope();	
				var render = function () {
						
						if(document.getElementById("CheckBoxSolid").checked==true)
						requestAnimationFrame( render ); 
						scope.currentMesh.rotation.x += 0.04; 
						scope.currentMesh.rotation.y += 0.04; 

				};
					
				if(checked){
					render();
				}									
            }));

			// pointscheckbox
            $("#CheckBoxPointsElli").click( (function() {

			    var checked = $("#CheckBoxPoints").attr("checked");
				var scope = scene.getScope();	
				var render = function () {
						
						if(document.getElementById("CheckBoxPoints").checked==true)
						requestAnimationFrame( render ); 
						scope.currentMesh.rotation.x += 0.04; 
						scope.currentMesh.rotation.y += 0.04; 

				};
					
				if(checked){
					render();
				}									
            }));
            
            // animate running of robot
            $("#CheckBoxAnimateRun").click( (function() {

				var scope = scene.getScope();	
				
				
				var render = function () {
						
						if(document.getElementById("CheckBoxAnimateRun").checked==true)
						requestAnimationFrame( render ); 
						scope.animateLegs();
						scope.animateClawsRun();
						scope.animateTorsoRun();
						scope.animateFace();
						
				};	
				
					render();					
            }));
            
            // animate attacking tail
            $("#CheckBoxAnimateTail").click( (function() {

			    var scope = scene.getScope(); 
			    
			    
			    var render = function () {
			      
			      if(document.getElementById("CheckBoxAnimateTail").checked==true)
			      requestAnimationFrame( render ); 
			     
			      scope.animateTail();

			    }; 
			    
			     render();     
            }));
            
            // animate claw hugging
            $("#CheckBoxAnimateClaws").click( (function() {

			    var scope = scene.getScope(); 
			    
			    
			    var render = function () {
			      
			      if(document.getElementById("CheckBoxAnimateClaws").checked==true)
			      requestAnimationFrame( render ); 
			     
			      scope.animateClawHug();

			    }; 
			    
			     render();     
            }));
            
            // animate jumping up
            $("#CheckBoxAnimateJump").click( (function() {
			    var scope = scene.getScope(); 
			    var render = function () {
			      
			      if(document.getElementById("CheckBoxAnimateJump").checked==true)
			      requestAnimationFrame( render ); 
			     
			      scope.animateJumpUp();
			    }; 
			    
			     render();     
            }));
            
            // animate shooting
            $("#CheckBoxAnimateShot").click( (function() {
			    var scope = scene.getScope(); 
			    var render = function () {
			      
			      if(document.getElementById("CheckBoxAnimateShot").checked==true)
			      requestAnimationFrame( render ); 
			     
			      scope.animateShot();
			    }; 
			    
			     render();     
            }));
            
            // clear run movement
            $("#BtnClearRun").click( (function() {

			    var scope = scene.getScope(); 
			      
			      scope.clearRun();
            }));
            
            // create new robot
			$("#newRobot").click( (function() {
				
				// parametric surfaces
				// pyramide
				var config = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : -Math.PI,
                    umax : Math.PI,
                    vmin : -Math.PI,
                    vmax : Math.PI
                };
				
				var posFunc = function(u,v) {
                    var x = eval("Math.cos(u)*200");
                    var y = eval("Math.cos(v)*200");
                    var z = eval("Math.cos(u+v)*200");
                    return [x,y,z];
                };
                
                // torus
                var config2 = {
                    segments : parseInt($("#numSegmentsPara").attr("value")),
                    umin : 0,
                    umax : 2*Math.PI + 0.13,
                    vmin : 0,
                    vmax : 2*Math.PI
                };
				
				var posFunc2 = function(u,v) {
                    var x = eval("((5+2*Math.cos(v))*Math.cos(u))*50");
                    var y = eval("((5+2*Math.cos(v))*Math.sin(u))*50");
                    var z = eval("2*Math.sin(v)*50");
                    return [x,y,z];
                };

              var parametric = new Parametric(posFunc, config); // pyramide
              var parametric2 = new Parametric(posFunc2, config2); // torus
			  
			  // pyramide
			  var bufferGeometryParametric = new BufferGeometry();
                  bufferGeometryParametric.addAttribute("position", parametric.getPositions());
                  bufferGeometryParametric.addAttribute("color", parametric.getColors());
				  bufferGeometryParametric.setIndex(parametric.getIndices());
			  
			  // torus
			  var bufferGeometryParametric2 = new BufferGeometry();
                  bufferGeometryParametric2.addAttribute("position", parametric2.getPositions());
                  bufferGeometryParametric2.addAttribute("color", parametric2.getColors());
				  bufferGeometryParametric2.setIndex(parametric2.getIndices());
				
				
				var robot = new Robot(bufferGeometryParametric,bufferGeometryParametric2);
				scene.addMesh(robot.getMesh());						
            }));
			
			
$("#btnNewPlanet").click( (function() {
				var planet = new Planet();
						scene.addMesh( planet.getMesh () ) ;
						
				var color = new THREE.Color(1,1,1);
				var intensity = 1;
				var aLight = new THREE.AmbientLight( color ); 
						scene.addLight( aLight );
				var dLight = new THREE. DirectionalLight ( color , intensity ) ; 
					dLight.name = "dLight";
					dLight.position.set(-1, 0, -0.3).normalize();
					scene.addLight( dLight ); 
					
			    $("#CheckBoxDayTexture").change(function() {
					planet.changeTexture("day");
					console.log(planet.getTextures());
				});
				
				$("#CheckBoxClouds").change( function() {
					planet.changeTexture("clouds");
				
				});
			
				$("#CheckBoxNightTexture").change( function() {
					planet.changeTexture("night");
				});
				
            }));			
			 
			
			
			 
			
        };

        // return the constructor function
        return HtmlController;

    })); // require