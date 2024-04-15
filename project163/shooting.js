AFRAME.registerComponent("shot", {
    init: function() {
      this.bowling();
    },

bowling: function() { 
    window.addEventListener("keydown",
    (e)=> {
        if (e.key === "z"){
            var ball = document.createElement("a-entity")
            ball.setAttribute("geometry", {
                primitive: "sphere", 
                radius: 0.02,
            })
            ball.setAttribute("material", "color", "blue")
            var cam = document.querySelector("#camera")
            pos = cam.getAttribute("position")
            ball.setAttribute("position", {
                x: pos.x,
                y:pos.y,
                z:pos.z
            })
            var camera = document.querySelector("#camera").object3D
            var direction = new THREE.Vector3()

            camera.getWorldDirection(direction)
            ball.setAttribute("velocity", direction.multiplyScalar(-10))

            var scene = document.querySelector("#scene")
            scene.appendChild(ball)
        }
    }
    )
},


removeBall: function (e) {
    //Original entity (bullet)
    console.log(e.detail.target.el);

    //Other entity, which bullet touched.
    console.log(e.detail.body.el);

    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("box")) 
      {
        //set material attribute
        // elementHit.setAttribute("box") {
          elementHit.setAttribute("material", {
            opacity:1,
            transparent: true
          })
        // }

        //impulse and point vector
        var impulse = new CANNON.Vec3(-2, 2, 1)
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        )
          elementHit.body.applyImpulse(impulse, worldPoint)
        //remove event listener
        element.removeEventListener("collide", this.removeBall)
        
        //remove the bullets from the scene
          var scene = document.querySelector("#scene")
          scene.removeChild(element)
    }
  },
})

