/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: ParametricSurface
 *
 */

/* requireJS module definition */


define(["three", "parametric", "BufferGeometry"],
    (function(THREE, Parametric, BufferGeometry) {

        "use strict";
        /**
         *
         * @param posFunc - gets a pair of u,v points, returns a 3-dim coordinate array [x,y,z]
         * @param config - holds value range of posFunc(umin,umx,vmin,vmax), as well as number of segments
         * @constructor - returns an ellipsoid
         */
        var Robot = function () {
            var KL = 500;

            this.root =  new THREE.Object3D();

            this.torso = new THREE.Object3D();
            this.torso.name = "torso";
            //hals
            this.neck =  new THREE.Object3D();
            this.neck.translateY (KL/2 + KL/16);
            this.neck.name = "neck";

            this.head =  new THREE.Object3D();
            this.head.name = "head";
            this.head.translateY (KL/16 + KL/12);
            //arm
            this.shoulder =  new THREE.Object3D();
            this.shoulder.translateY (KL/2 - KL/16);
            this.shoulder.translateX(KL/4 + KL/16);
            this.shoulder.name = "shoulder";

            this.uArm =  new THREE.Object3D();
            this.uArm.translateX(KL/4 + KL/16);

            this.elbow =  new THREE.Object3D();
            this.elbow.translateX(KL/4 + KL/16);
            this.elbow.name = "elbow";

            this.antebrachium =  new THREE.Object3D();
            this.antebrachium.translateX(KL/4 + KL/16);

            this.hand =  new THREE.Object3D();
            this.hand.translateX(KL/4 + KL/12);

            /**
             * this.neck =  new THREE.Object3D();
             this.neck.translateY (KL/4);
             this.head =  new THREE.Object3D();
             this.head.translateY (KL/6);
             this.head.translateX(KL/3);
             //arm
             this.shoulder =  new THREE.Object3D();
             this.shoulder.translateY (KL/8);
             this.shoulder.translateX(KL/8);

             this.uArm =  new THREE.Object3D();
             this.uArm.translateY (KL/6);
             this.uArm.translateX(KL/2);

             this.elbow =  new THREE.Object3D();
             this.elbow.translateY (KL/8);
             this.elbow.translateX(KL/8);

             this.antebrachium =  new THREE.Object3D();
             this.antebrachium.translateY (KL/6);
             this.antebrachium.translateX(KL/2);

             this.hand =  new THREE.Object3D();
             this.hand.translateY (KL/6);
             this.hand.translateX(KL/6);
             */

            //add head and arm to torso
            this.torso.add(this.neck);
            this.neck.add(this.head);

            this.torso.add(this.shoulder);
            this.shoulder.add(this.uArm);
            this.uArm.add(this.elbow);
            this.elbow.add(this.antebrachium);
            this.antebrachium.add(this.hand);

            this.root.add(this.torso);

            var makeMaterial = function() {
                return new THREE.MeshNormalMaterial({ color: 0x222222, wireframe: false});
            };

            this.torsoSkin          = new THREE.Mesh(new THREE.CubeGeometry(KL/2, KL, KL/2),
                makeMaterial());
            this.neckSkin           = new THREE.Mesh(new THREE.CylinderGeometry(KL/12, KL/12, KL/8),
                makeMaterial());
            this.headSkin           =  new THREE.Mesh(new THREE.SphereGeometry(1),
                makeMaterial());

            this.shoulderSkin       =  new THREE.Mesh(new THREE.SphereGeometry(KL/16),
                makeMaterial());
            this.uArmSkin           = new THREE.Mesh(new THREE.SphereGeometry(1),
                makeMaterial());
            this.elbowSkin          = new THREE.Mesh(new THREE.SphereGeometry(KL/16),
                makeMaterial());
            this.antebrachiumSkin   = new THREE.Mesh(new THREE.SphereGeometry(1),
                makeMaterial());

            //scaling stuffs
            this.headSkin.scale.x = KL/6;
            this.headSkin.scale.y = KL/12;
            this.headSkin.scale.z = KL/12;

            this.antebrachiumSkin.scale.x = KL/4;
            this.antebrachiumSkin.scale.y = KL/16;
            this.antebrachiumSkin.scale.z = KL/16;

            this.uArmSkin.scale.x = KL/4;
            this.uArmSkin.scale.y = KL/16;
            this.uArmSkin.scale.z = KL/16;

            var makeDini = function() {

                var config = {
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

                var param = new Parametric(posFunc, config, {r: 0, g : 0xFF, b : 0 });
                var bufferGeometryParam = new BufferGeometry(0x00FF00);
                bufferGeometryParam.addAttribute("position", param.getPositions());
                bufferGeometryParam.addAttribute("color", param.getColors());
                bufferGeometryParam.setIndex(param.getIndices());
                bufferGeometryParam.setSegments(param.getSegments());

                return bufferGeometryParam;

            };


            this.handSkin           = new THREE.Mesh(makeDini(),
                makeMaterial());

            //this.hand.add(this.handSkin);
            this.antebrachium.add(this.antebrachiumSkin);
            this.elbow.add(this.elbowSkin);
            this.uArm.add(this.uArmSkin);
            this.shoulder.add(this.shoulderSkin);
            this.neck.add(this.neckSkin);
            this.head.add(this.headSkin);
            this.torso.add(this.torsoSkin);

            this.getRoot = function() {
                return this.root;
            }

        };



        return Robot;
    }));
