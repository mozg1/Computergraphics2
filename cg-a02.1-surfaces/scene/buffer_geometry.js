/*
 * JavaScript / Canvas teaching framwork
 * (C)opyright Kristian Hildebrand, khildebrand@beuth-hochschule.de
 *
 * Module: BufferGeometry
 *
 * BufferGeometry Vertex-Arrays and Vertex-Attributes
 * stored in float32 arrays for the given attributes.
 * In our cases we assume all attributes have
 * numItems*3 size e.g. position (x, y, z), color (r, g, b)
 *
 * BufferGeometry is (at least for now) used to render Points with
 * vertexcolors.
 * Therefore we add a point material (THREE.PointsMaterial) and point container (THREE.Points).
 *
 */

/* requireJS module definition */
define(["three"],
    (function(THREE) {

        "use strict";

        var BufferGeometry = function (color) {
            /*
             * constituted of - mesh, geometry, material
             */

            this.mesh     = undefined;
            this.geometry = new THREE.BufferGeometry();
            this.material = new THREE.MeshBasicMaterial( { //MeshBasicMaterial / PointsMaterial
                color: color,
                size: 10, vertexColors: THREE.VertexColors,
                side: THREE.DoubleSide,
                wireframe: true
            } );

            /**
             * Adds a vertex attribute, we assume each element has three components, e.g.
             * [position_x0, position_y0, position_z0, position_x1, position_y1, position_z1,...]
             * AddAttribute updates the mesh.
             *
             * @param name vertex attributes name, e.g. position, color, normal
             * @param buffer
             */
            this.addAttribute = function(name, buffer) {
                this.geometry.addAttribute(name, new THREE.BufferAttribute(buffer, 3));
                this.geometry.computeBoundingSphere();

                //this.mesh = new THREE.Points( this.geometry, this.material );
                this.mesh = new THREE.Mesh(this.geometry, this.material);

                this.setIndex = function (buffer) {
                    this.geometry.setIndex(new THREE.BufferAttribute(buffer, 1));
                };

                this.setSegments = function ( buffer) {
                    this.geometry.segments = buffer;
                };
            };

            this.changeAttribute = function(name, buffer) {

            };

            this.getMaterial = function() {
                return this.material;
            };

            this.getMesh = function() {
                return this.mesh;
            };

            this.setWireframe = function(wireframe) {
                this.material.wireframe = wireframe;
            }


        };

        return BufferGeometry;
    }));


/*
 var maxindex = 0;
 for(var i=0; i<=uSegments; i++) {
 for(var j=0; j<=vSegments; j++) {

 // current position (u,v) on the surface
 var u = uMin + i * (uMax-uMin) / uSegments;
 var v = vMin + j * (vMax-vMin) / vSegments;

 // current index into the vertex buffers
 var vindex = i*(vSegments+1) + j;

 // calculate and store per-vertex attributes
 if(definition.position) {
 var p = definition.position(u,v);
 vposition[vindex]   = p[0];
 vposition[vindex+1] = p[1];
 vposition[vindex+2] = p[2];
 };
 if(definition.normal) {
 var n = definition.normal(u,v);
 vnormal[vindex]   = n[0];
 vnormal[vindex+1] = n[1];
 vnormal[vindex+2] = n[2];
 };
 if(definition.tangent) {
 if(vindex > 1) {
 var lastLastIndex = vindex - 2;
 var lastLastPos   = [vposition[lastLastIndex*3], vposition[lastLastIndex*3+1], vposition[lastLastIndex*3+2]];
 var currPos   = [vposition[vindex*3], vposition[vindex*3+1], vposition[vindex*3+2]];
 var tang = [currPos[0] - lastLastPos[0], currPos[1] - lastLastPos[1], currPos[2] - lastLastPos[2]];
 vtangent[vindex*3]   = tang[0];
 vtangent[vindex*3+1] = tang[1];
 vtangent[vindex*3+2] = tang[2];
 } else {
 vtangent[vindex*3]   = 1;
 vtangent[vindex*3+1] = 0;
 vtangent[vindex*3+2] = 0;
 }

 };
 if(definition.texCoords) {
 var t = definition.texCoords(u,v);
 vtexcoord[vindex*2]   = t[0];
 vtexcoord[vindex*2+1] = t[1];
 };

 // index inside the
 var iindex = i*vSegments + j;

 // lines for drawing two triangles per patch
 if(i<uSegments && j<vSegments) {
 var ii = iindex*6;
 triangles[ii++] = vindex;
 triangles[ii++] = vindex+(vSegments+1);
 triangles[ii++] = vindex+(vSegments+1)+1;
 triangles[ii++] = vindex+(vSegments+1)+1;
 triangles[ii++] = vindex+1;
 triangles[ii++] = vindex;
 };
 // lines for drawing two triangles per patch
 if(i<uSegments && j<vSegments) {
 var ii = iindex*4;
 triangles[ii++] = vindex;
 triangles[ii++] = vindex+(vSegments+1);
 triangles[ii++] = vindex;
 triangles[ii++] = vindex+1;
 };
 }; // for j
 }; // for i
 */