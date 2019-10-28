precision mediump float;

attribute vec2 aPosition;
attribute vec3 aColor;
varying vec3 fColor;
uniform float theta;
uniform float scale;
void main(){
    fColor=aColor;
    mat4 skalasi = mat4(
        scale, 0.0, 0.0, 0.0,           //  y - - y
        0.0, scale, 0.0, 0.0,             //  - x x -
        0.0, 0.0, scale, 0.0,             //  y x x y
        0.0, 0.0, 0.0, 1.0              //
    );
    gl_Position = vec4(aPosition,0,1)*skalasi;
    gl_PointSize = 10.0;
    mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = gl_Position * rotasi;
  mat4 translasi = mat4(
        1.0, 0.0, 0.0, 0.0,   // dx = 0.5
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    );
    gl_Position = gl_Position * translasi;
}