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
    var thetaLocs = gl.getUniformLocation(program2, 'theta');
    var theta = 0;
    var scaleLoc = gl.getUniformLocation(program, 'scale');
    var scaleLocs = gl.getUniformLocation(program2, 'scale');
    var scale = 1;
    var membesar = 1;     
    function resize(){
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
    function rendersegitiga(){
      var vertices = [
        // x, y       r, g, b
        +0.4,+0.75,      +0.3,+0.3,+0.3,
        +0.4,-0.75,      +0.2,+0.2,+0.2,
        +0.45,+0.76,     +0.1,+0.1,+0.1,
        +0.45,+0.76,     +0.2,+0.1,+0.1,
        +0.45,-0.65,     +0.3,+0.1,+0.1,
        +0.4,-0.75,       +0.4,+0.1,+0.1,
        +0.45,+0.76, +0.5,+0.1,+0.1,
        +0.7,+0.8, +0.6,+0.1,+0.1,
        +0.45,+0.65, +0.7,+0.1,+0.1,
        +0.45,+0.65, +0.8,+0.1,+0.1,
        +0.7,+0.8, +0.9,+0.1,+0.1,
        +0.675,+0.7, +0.8,+0.1,+0.1,
        +0.8,+0.425, +0.7,+0.1,+0.1,
        +0.7,+0.8, +0.6,+0.1,+0.1,
        +0.675,+0.7, +0.5,+0.1,+0.1,
        +0.8,+0.425, +0.4,+0.1,+0.1,
        +0.675,+0.7, +0.3,+0.1,+0.1,
        +0.75,+0.425, +0.2,+0.1,+0.1,
        +0.75,+0.425, +0.1,+0.1,+0.1,
        +0.8,+0.425, +0.1,+0.2,+0.1,
        +0.45,+0.05, +0.1,+0.3,+0.1,
        +0.45,+0.05, +0.1,+0.4,+0.1,
        +0.8,+0.425, +0.1,+0.5,+0.1,
        +0.45,-0.05, +0.1,+0.6,+0.1,
        +0.45,+0.05, +0.1,+0.7,+0.1,
        +0.8,-0.325, +0.1,+0.8,+0.1,
        +0.75,-0.325, +0.1,+0.9,+0.1,
        +0.45,-0.05, +0.1,+0.8,+0.1,
        +0.45,+0.05, +0.1,+0.7,+0.1,
        +0.75,-0.325, +0.1,+0.6,+0.1,
        +0.8,-0.325, +0.1,+0.5,+0.1,
        +0.75,-0.325, +0.1,+0.4,+0.1,
        +0.7,-0.7, +0.1,+0.3,+0.1,
        +0.7,-0.7, +0.1,+0.2,+0.1,
        +0.75,-0.325, +0.1,+0.1,+0.2,
        +0.675,-0.6, +0.1,+0.1,+0.3,
        +0.675,-0.6, +0.1,+0.1,+0.4,
        +0.45,-0.65, +0.1,+0.1,+0.5,
        +0.7,-0.7, +0.1,+0.1,+0.6,
        +0.4,-0.75, +0.1,+0.1,+0.7,
        +0.7,-0.7, +0.1,+0.1,+0.8,
        +0.45,-0.65, +0.1,+0.1,+0.9,
      ];
      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      var aPosition = gl.getAttribLocation(program, 'aPosition');
      if (aPosition < 0) {
          console.log('Failed to get the storage location of aPosition');
          return -1;
      }
      var aColor = gl.getAttribLocation(program, 'aColor');
      if (aColor < 0) {
        console.log('Failed to get the storage location of aColor');
        return -1;
      }
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(aColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(aPosition);
      gl.enableVertexAttribArray(aColor);
      theta += Math.atan(0.0085);
      gl.uniform1f(thetaLoc, theta);
      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0085);

    }
    function renderline(){
      var vertices = [
        // x, y       r, g, b
        -0.75,-0.75,  +0.1,+0.1,+0.9,
        -0.75,+0.75,  +0.1,+0.1,+0.8,//garis lurus
        -0.75,-0.75,  +0.1,+0.1,+0.7,
        -0.5,-0.7,    +0.1,+0.1,+0.6,//miring dibawah
        -0.75,+0.75,  +0.1,+0.1,+0.5,
        -0.5,+0.8,    +0.1,+0.1,+0.4,//miring diatas
        -0.5,+0.8,    +0.1,+0.1,+0.3,
        -0.4,+0.425,  +0.1,+0.1,+0.2,
        -0.4,+0.425,  +0.1,+0.1,+0.1,
        -0.5,+0.05,   +0.1,+0.1,+0.2,
        -0.5,+0.05,   +0.1,+0.1,+0.3,
        -0.4,-0.325,  +0.1,+0.1,+0.4,
        -0.4,-0.325,  +0.1,+0.1,+0.5,
        -0.5,-0.7,    +0.1,+0.1,+0.6,//bagian luar saja
        -0.7,+0.65,   +0.1,+0.1,+0.7,
        -0.525,+0.7,  +0.1,+0.1,+0.8,
        -0.7,+0.65,   +0.1,+0.1,+0.9,
        -0.7,+0.15,   +0.1,+0.2,+0.9,
        -0.7,+0.15,   +0.1,+0.3,+0.9,
        -0.525,+0.2,  +0.1,+0.4,+0.9,
        -0.525,+0.2,  +0.1,+0.5,+0.9,
        -0.45,+0.425, +0.1,+0.6,+0.9,
        -0.45,+0.425, +0.1,+0.7,+0.9,
        -0.525,+0.7,  +0.1,+0.8,+0.9,//-----
        -0.7,-0.05,   +0.1,+0.9,+0.9,
        -0.7,-0.65,   +0.1,+0.8,+0.9,
        -0.7,-0.65,   +0.1,+0.7,+0.9,
        -0.525,-0.6,  +0.1,+0.6,+0.9,
        -0.7,-0.05,   +0.1,+0.5,+0.9,
        -0.525,0,     +0.1,+0.4,+0.9,
        -0.525,-0.6,  +0.1,+0.3,+0.9,
        -0.45,-0.325, +0.1,+0.2,+0.9,
        -0.525,0,     +0.1,+0.1,+0.9,
        -0.45,-0.325, +0.2,+0.1,+0.9,//-----
      ];
      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }
      gl.useProgram(program2);
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      var aPosition = gl.getAttribLocation(program2, 'aPosition');
      if (aPosition < 0) {
          console.log('Failed to get the storage location of aPositions');
          return -1;
      }
      var aColor = gl.getAttribLocation(program2, 'aColor');
      if (aColor < 0) {
        console.log('Failed to get the storage location of aColors');
        return -1;
      }
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(aColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
      gl.enableVertexAttribArray(aPosition);
      gl.enableVertexAttribArray(aColor);
      theta += Math.atan(0.0085);
      gl.uniform1f(thetaLocs, theta);
      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0085);
    }
    function render(){
      requestAnimationFrame(render); 
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderline();
      gl.drawArrays(gl.LINES,0,34);
      gl.uniform1f(scaleLocs, scale);
      rendersegitiga();
      gl.drawArrays(gl.TRIANGLES,0,42);
      gl.uniform1f(scaleLoc, scale);
    } 
    render();
  }   
})(window || this);