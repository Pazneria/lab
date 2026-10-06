export const ROOM={minX:-7,maxX:7,minZ:-9,maxZ:9,height:8.6};
export const ALCOVE={minX:7,maxX:10.5,minZ:-1.6,maxZ:5.5};
export const STAIR={minX:-6.5,maxX:-3.5,bottomZ:2.8,topZ:-2.8,rise:3.5,steps:20};
export const GALLERY=[{minX:-7,maxX:-3.3,minZ:-9,maxZ:-2.8},{minX:-3.3,maxX:1.3,minZ:-9,maxZ:-6.6}];
export const START={x:0.2,z:7.25,yaw:0.10,pitch:-.02};
export const colliders=[];
export function obstacle(minX,maxX,minZ,maxZ,minY=0,maxY=2.6,label='furniture'){
  colliders.push({minX,maxX,minZ,maxZ,minY,maxY,label});
}
export function orientedObstacle(x,z,width,depth,angle,minY=0,maxY=2.6,label='furniture'){
  const c=Math.abs(Math.cos(angle)),s=Math.abs(Math.sin(angle));const w=c*width+s*depth,d=s*width+c*depth;
  obstacle(x-w/2,x+w/2,z-d/2,z+d/2,minY,maxY,label);
}
export function inside(x,z,b,margin=0){return x>=b.minX+margin&&x<=b.maxX-margin&&z>=b.minZ+margin&&z<=b.maxZ-margin;}
export function registerStructure(){
  obstacle(-7.2,-6.9,-9.2,9.2,0,10,'west wall');
  obstacle(-7.2,7.2,-9.2,-8.92,0,10,'north wall and windows');
  obstacle(-7.2,7.2,8.92,9.2,0,10,'south wall');
  obstacle(6.92,7.2,-9,-1.6,0,10,'east wall');obstacle(6.92,7.2,5.5,9,0,10,'east wall');
  obstacle(10.42,10.7,-1.8,5.7,0,7,'alcove windows');obstacle(6.9,10.7,-1.8,-1.52,0,7,'alcove north wall');obstacle(6.9,10.7,5.42,5.7,0,7,'alcove south wall');
  // Continuous protected sides: staircase is only entered at its bottom or landing.
  obstacle(-6.74,-6.51,-2.85,2.85,0,4.7,'stair west rail');obstacle(-3.49,-3.25,-2.85,2.85,0,4.7,'stair east rail');
  // Gallery rails only collide with a visitor on the upper floor, leaving the room below open.
  obstacle(-3.39,-3.21,-6.7,-2.78,3.3,4.7,'gallery inner rail');
  obstacle(-3.4,1.38,-6.69,-6.51,3.3,4.7,'gallery overlook rail');
  obstacle(1.21,1.39,-9,-6.5,3.3,4.7,'gallery north return rail');
  obstacle(-7,-6.5,-2.9,-2.7,3.3,4.7,'landing rail');
  obstacle(-3.5,-3.21,-2.9,-2.7,3.3,4.7,'landing rail');
}
export function groundHeight(x,z,previousHeight){
  if(x>=STAIR.minX&&x<=STAIR.maxX&&z>=STAIR.topZ&&z<=STAIR.bottomZ)
    return Math.max(0,Math.min(STAIR.rise,(STAIR.bottomZ-z)/(STAIR.bottomZ-STAIR.topZ)*STAIR.rise));
  if(previousHeight>2.9&&GALLERY.some(b=>inside(x,z,b,-.01)))return STAIR.rise;
  return 0;
}
export function canOccupy(x,z,footY,radius=.23){
  const inRoom=inside(x,z,ROOM,radius),inAlcove=inside(x,z,ALCOVE,radius);
  const inOpening=x>=6.5&&x<=7.5&&z>=ALCOVE.minZ+radius&&z<=ALCOVE.maxZ-radius;
  if(!inRoom&&!inAlcove&&!inOpening)return false;
  for(const b of colliders){
    if(footY+.05>=b.maxY||footY+1.7<=b.minY)continue;
    if(x>b.minX-radius&&x<b.maxX+radius&&z>b.minZ-radius&&z<b.maxZ+radius)return false;
  }
  return true;
}
