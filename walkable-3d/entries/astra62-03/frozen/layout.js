export const F=.60, INNER=5.24, OUTER=6.13, TOP=5.46, ROOF_YAW=.66;
export const PORCH_END=12.06, HALL_WIDTH=1.69;
export const terrace=[[-4.20,-4.72],[4.20,-4.72],[5.05,-7.05],[5.05,-13.08],[3.55,-15.18],[-3.55,-15.18],[-5.05,-13.08],[-5.05,-7.05]];
export const forecourt=[[-2.62,11.82],[2.62,11.82],[2.62,14.16],[2.04,14.78],[-2.04,14.78],[-2.62,14.16]];
export const portals=[
  {a:0,w:1.64,sill:F,spring:2.81,rise:1.37,door:true},
  {a:.92,w:.45,sill:1.91,spring:3.12,rise:.49},
  {a:1.59,w:.30,sill:3.54,spring:4.02,rise:.32},
  {a:2.25,w:.53,sill:1.77,spring:3.00,rise:.62},
  {a:Math.PI,w:1.71,sill:F,spring:2.89,rise:1.39,door:true},
  {a:2*Math.PI-2.24,w:.53,sill:1.77,spring:3.00,rise:.62},
  {a:2*Math.PI-1.58,w:.30,sill:3.54,spring:4.02,rise:.32},
  {a:2*Math.PI-.94,w:.45,sill:1.91,spring:3.12,rise:.49}
];
export const START={x:.18,z:11.11,yaw:-.02,pitch:.002};
export const desk={a:1.56,r:4.56,w:2.05,d:.83};
export const stool={a:1.32,r:3.73,radius:.32};
export const scopeBaseRadius=1.52;
