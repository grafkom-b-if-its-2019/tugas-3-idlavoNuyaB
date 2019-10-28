(function (global) {
  // var canvas,gl,program;
  glUtils.SL.init({callback:function() { main();} });  
  function main(){
    window.addEventListener('resize', resize);
    var canvas=document.getElementById("glcanvas");
    var gl=glUtils.checkWebGL(canvas);
    var vertexShader =glUtils.getShader(gl,gl.VERTEX_SHADER,glUtils.SL.Shaders.v1.vertex);
    var fragmentShader=glUtils.getShader(gl,gl.FRAGMENT_SHADER,glUtils.SL.Shaders.v1.fragment);
    var vertexShader2 =glUtils.getShader(gl,gl.VERTEX_SHADER,glUtils.SL.Shaders.v2.vertex);
    resize();
    var program=glUtils.createProgram(gl,vertexShader,fragmentShader);
    var program2=glUtils.createProgram(gl,vertexShader2,fragmentShader);
    var thetaLoc = gl.getUniformLocation(program, 'theta');
    var theta = [0,0,0];   
    var thetaLocCube = gl.getUniformLocation(program2, 'theta');
    var thetaCube = [0,0,0];  
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    function cube(){
      gl.useProgram(program2);
      /**
     *  A ( -0.5, -0.5,  0.5 )
     *  B ( -0.5,  0.5,  0.5 )
     *  C (  0.5,  0.5,  0.5 )
     *  D (  0.5, -0.5,  0.5 )
     *  E ( -0.5, -0.5, -0.5 )
     *  F ( -0.5,  0.5, -0.5 )
     *  G (  0.5,  0.5, -0.5 )
     *  H (  0.5, -0.5, -0.5 )
     */
      var cubeVertices = [
        // x, y, z            r, g, b
        -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,  // depan, merah, BAD BDC
        -0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
         0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
        -0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
         0.5, -0.5,  0.5,     1.0, 0.0, 0.0,
         0.5,  0.5,  0.5,     1.0, 0.0, 0.0,
         0.5,  0.5,  0.5,     0.0, 1.0, 0.0,  // kanan, hijau, CDH CHG
         0.5, -0.5,  0.5,     0.0, 1.0, 0.0,
         0.5, -0.5, -0.5,     0.0, 1.0, 0.0,
         0.5,  0.5,  0.5,     0.0, 1.0, 0.0,
         0.5, -0.5, -0.5,     0.0, 1.0, 0.0,
         0.5,  0.5, -0.5,     0.0, 1.0, 0.0,
         0.5, -0.5,  0.5,     0.0, 0.0, 1.0,  // bawah, biru, DAE DEH
        -0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
        -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
         0.5, -0.5,  0.5,     0.0, 0.0, 1.0,
        -0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
         0.5, -0.5, -0.5,     0.0, 0.0, 1.0,
        -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,  // belakang, kuning, EFG EGH
        -0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
         0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
        -0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
         0.5,  0.5, -0.5,     1.0, 1.0, 0.0,
         0.5, -0.5, -0.5,     1.0, 1.0, 0.0,
        -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,  // kiri, cyan, FEA FAB
        -0.5, -0.5, -0.5,     0.0, 1.0, 1.0,
        -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,
        -0.5,  0.5, -0.5,     0.0, 1.0, 1.0,
        -0.5, -0.5,  0.5,     0.0, 1.0, 1.0,
        -0.5,  0.5,  0.5,     0.0, 1.0, 1.0,
         0.5,  0.5, -0.5,     1.0, 0.0, 1.0,  // atas, magenta, GFB GBC
        -0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
        -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
         0.5,  0.5, -0.5,     1.0, 0.0, 1.0,
        -0.5,  0.5,  0.5,     1.0, 0.0, 1.0,
         0.5,  0.5,  0.5,     1.0, 0.0, 1.0
      ];
  
      var cubeVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);
  
      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
  
      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);
      thetaCube[axis]+=0.5;
      gl.uniform3fv(thetaLocCube,thetaCube);
    }
    function rendersegitiga(){
      gl.useProgram(program);
      var vertices = [
        // x, y       r, g, b   x'=x-0.6
        -0.2,+0.75,      +0.3,+0.3,+0.3,
        -0.2,-0.75,      +0.2,+0.2,+0.2,
        -0.15,+0.76,     +0.1,+0.1,+0.1,
        -0.15,+0.76,     +0.2,+0.1,+0.1,
        -0.15,-0.65,     +0.3,+0.1,+0.1,
        -0.2,-0.75,      +0.4,+0.1,+0.1,
        -0.15,+0.76,     +0.5,+0.1,+0.1,
        +0.1,+0.8,       +0.6,+0.1,+0.1,
        -0.15,+0.65,     +0.7,+0.1,+0.1,
        -0.15,+0.65,     +0.8,+0.1,+0.1,
        +0.1,+0.8,       +0.9,+0.1,+0.1,
        +0.075,+0.7,     +0.8,+0.1,+0.1,
        +0.2,+0.425,     +0.7,+0.1,+0.1,
        +0.1,+0.8,       +0.6,+0.1,+0.1,
        +0.075,+0.7,     +0.5,+0.1,+0.1,
        +0.2,+0.425,     +0.4,+0.1,+0.1,
        +0.075,+0.7,     +0.3,+0.1,+0.1,
        +0.15,+0.425,    +0.2,+0.1,+0.1,
        +0.15,+0.425,    +0.1,+0.1,+0.1,
        +0.2,+0.425,     +0.1,+0.2,+0.1,
        -0.15,+0.05,     +0.1,+0.3,+0.1,
        -0.15,+0.05,     +0.1,+0.4,+0.1,
        +0.2,+0.425,     +0.1,+0.5,+0.1,
        -0.15,-0.05,     +0.1,+0.6,+0.1,
        -0.15,+0.05,     +0.1,+0.7,+0.1,
        +0.2,-0.325,     +0.1,+0.8,+0.1,
        +0.15,-0.325,    +0.1,+0.9,+0.1,
        -0.15,-0.05,     +0.1,+0.8,+0.1,
        -0.15,+0.05,     +0.1,+0.7,+0.1,
        +0.15,-0.325,    +0.1,+0.6,+0.1,
        +0.2,-0.325,     +0.1,+0.5,+0.1,
        +0.15,-0.325,    +0.1,+0.4,+0.1,
        +0.1,-0.7,       +0.1,+0.3,+0.1,
        +0.1,-0.7,       +0.1,+0.2,+0.1,
        +0.15,-0.325,    +0.1,+0.1,+0.2,
        +0.075,-0.6,     +0.1,+0.1,+0.3,
        +0.075,-0.6,     +0.1,+0.1,+0.4,
        -0.15,-0.65,     +0.1,+0.1,+0.5,
        +0.1,-0.7,       +0.1,+0.1,+0.6,
        -0.2,-0.75,      +0.1,+0.1,+0.7,
        +0.1,-0.7,       +0.1,+0.1,+0.8,
        -0.15,-0.65,     +0.1,+0.1,+0.9
      ];
      var vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      var aPosition = gl.getAttribLocation(program, 'aPosition');
      var aColor = gl.getAttribLocation(program, 'aColor');
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(aColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(aPosition);
      gl.enableVertexAttribArray(aColor);
      theta[1]+=0.85;
      gl.uniform3fv(thetaLoc, theta);
    }
    function render(){
      requestAnimationFrame(render); 
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      rendersegitiga();
      gl.drawArrays(gl.TRIANGLES,0,42);
      cube();
      gl.drawArrays(gl.LINES, 0, 36);
    } 
    render();
  }   
})(window || this);