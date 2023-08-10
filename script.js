gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var timeout=0;

function mouseFollowerChapta(){
    var xscale = 1;
    var yscale = 1;
    var prevClientX = 0;
    var prevClientY = 0;
    window.addEventListener("mousemove", function(dets){
    this.clearTimeout(timeout)
        var xdiff = dets.clientX -  prevClientX;
        var ydiff  = dets.clientY - prevClientY;
        prevClientX = dets.clientX;
        prevClientY = dets.clientY;

        xscale = gsap.utils.clamp(.8,1.2,xdiff)
        yscale = gsap.utils.clamp(.8,1.2,ydiff)

        mouseFollower(xscale,yscale)

        timeout = this.setTimeout(function(){
            this.document.getElementById("mouseFollower").style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(${1},${1})`


        },100)

    })
   
 }

function mouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
    

        this.document.getElementById("mouseFollower").style.transform =`translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`
    })
   
 }
 
 mouseFollower()
 mouseFollowerChapta()

var tl = gsap.timeline()
function time(){
    var a=0
    setInterval(function(){

         a+= Math.floor(Math.random()*20)
        if(a<100)
        {
        let loader = document.getElementById("loader")
        loader.innerText = a + "%";
        }
        else{
            a=100;
            let loader = document.getElementById("loader")
            loader.innerText = a + "%";
            
        }
    },100)
}



tl.from("#loader h1",{
    duration:1.2,
    onStart:time()
})

tl.to("#loader",{
    scale:0,
    opacity:0,
    delay:0.5,
    duration:1,
   
})


gsap.to("#page2 .box",{
    rotate:360,
    duration:2,
    delay:1,
   
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page2 .box",
        start:"top 70%",
        scrub:3
    }
   
})

gsap.to("#page3 .box",{
    rotate:360,
    duration:2,
    delay:1,
   
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page3 .box",
        start:"top 70%",
        scrub:3
    }
   
})

