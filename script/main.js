const container = document.querySelector(".fireworkDiv")
      const fireworks = new Fireworks(container, {
          autoresize: true,
          opacity: 0.5,
          acceleration: 1.05,
          friction: 0.97,
          gravity: 1.5,
          particles: 50,
          traceLength: 3,
          traceSpeed: 10,
          explosion: 5,
          intensity: 30,
          flickering: 50,
          lineStyle: 'round',
          hue: {
            min: 0,
            max: 360
          },
          delay: {
            min: 30,
            max: 60
          },
          rocketsPoint: {
            min: 0,
            max: 100
          },
          lineWidth: {
            explosion: {
              min: 1,
              max: 3
            },
            trace: {
              min: 1,
              max: 2
            }
          },
          brightness: {
            min: 50,
            max: 80
          },
          decay: {
            min: 0.015,
            max: 0.03
          },
          mouse: {
            click: false,
            move: false,
            max: 1
          }
      })
      const tl = new TimelineMax();
      const handleBirthdayBox = () => {
        const merrywrap = document.getElementById("merrywrap");
        const box = merrywrap.getElementsByClassName("giftbox")[0];
        const cakeContainer = document.getElementById("cake-container");
      
        let step = 1;
        let stepMinutes = [2000, 1000, 50, 0];
      
        function init() {
          box.addEventListener("click", openBox, false);
        }
      
        function stepClass(step) {
          merrywrap.className = `merrywrap step-${step}`;
        }
      
        function openBox() {
          if (step === 1) {
            box.removeEventListener("click", openBox, false);
          }
          stepClass(step);
          if (step === 3) {
            // No action needed
          }
          if (step === 4) {
            // Hide the gift box and resume timeline for balloon animation
            setTimeout(() => {
              merrywrap.style.opacity = "0";
              setTimeout(() => {
                merrywrap.style.display = "none";
                tl.resume(); // This will start the balloon animation
              }, 100);
            }, 1000);
            return;
          }
          setTimeout(openBox, stepMinutes[step - 1]);
          step++;
        }
      
        init();
      };
        const fetchData = () => {
    fetch("customize.json")
      .then(data => data.json())
      .then(data => {
        dataArr = Object.keys(data);
        dataArr.map(customData => {
          // Check if element exists before trying to modify it
          const element = document.querySelector(`[data-node-name*="${customData}"]`);
          if (element && data[customData] !== "") {
            if (customData === "imagePath") {
              element.setAttribute("src", data[customData]);
            } else {
              element.innerText = data[customData];
            }
          }

          // Check if the iteration is over
          // Run animation if so
          if (dataArr.length === dataArr.indexOf(customData) + 1) {
            animationTimeline();
          } 
        });
      });
  };

  // Animation Timeline
  const animationTimeline = () => {
    // Remove references to deleted elements
    // const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    // Only process the hbd element that still exists
    // textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    //   .split("")
    //   .join("</span><span>")}</span`;

    hbd.innerHTML = `<span>${hbd.innerHTML
      .split("")
      .join("</span><span>")}</span`;

    const ideaTextTrans = {
      opacity: 0,
      y: -20,
      rotationX: 5,
      skewX: "15deg"
    };

    const ideaTextTransLeave = {
      opacity: 0,
      y: 20,
      rotationY: 5,
      skewX: "-15deg"
    };

    tl
      .to(".container", 0.1, {
        visibility: "visible"
      })
      .from(".one", 0.7, {
        opacity: 0,
        y: 10
      })
      // First part of text
      .from(".two", 0.4, {
        opacity: 0,
        y: 10,
        onStart: function() {
          const element = document.querySelector('.two');
          element.innerHTML = `<span class="text-part-1"></span><span class="text-part-2"></span>`;
        }
      })
      .to({}, 0.25, {}) // Wait 0.25 seconds
      // Typing animation for second part
      .call(() => {
        const text = "I really like your name btw!";
        const element = document.querySelector('.text-part-2');
        let index = 0;
        
        function typeText() {
          if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
          } else {
            tl.resume();
          }
        }
        
        tl.pause();
        typeText();
      })
      .to({}, 2, {}) // Wait 2 seconds after typing
      // Fade out everything
      .to(".one", 0.7, {
        opacity: 0,
        y: 10
      })
      .to(".two", 0.7, {
        opacity: 0,
        y: 10
      })
      .from(".three", 0.7, {
        opacity: 0,
        y: 10
      })
      .to(".three", 0.7, {
        opacity: 0,
        y: 10
      }, "+=2")
      .to(".merrywrap", 0.4, { 
        display: "block", 
        opacity: 1
      })
      .call(() => {
        tl.pause();
        handleBirthdayBox();
      })
      .staggerFromTo(
        ".baloons img",
        2.5,
        {
          opacity: 0.9,
          y: 1400
        },
        {
          opacity: 1,
          y: -1000
        },
        0.2
      )
      .call(() => {
        const cakeContainer = document.getElementById("cake-container");
        cakeContainer.style.display = "block";
        setTimeout(() => {
          cakeContainer.style.opacity = "1";
          setupCandleInteraction();
        }, 200);
        tl.pause();
      })
      .from(".glass-heading", 0.7, {
        opacity: 0,
      })
      .staggerFrom(
        ".wish-hbd span",
        0.5,
        {
          opacity: 0,
          y: -50,
          rotation: 150,
          skewX: "30deg",
          ease: Elastic.easeOut.config(1, 0.5),
          onStart: () => {
            fireworks.start();
            setTimeout(() => {
              fireworks.stop();
            }, 19000);
          },
        },
        0.1
      )
      .from(".wish h5", 0.5, {
        opacity: 0,
        y: 10,
      }, "party")
      .call(() => {
        tl.pause();
        setTimeout(() => {
          tl.resume();
        }, 17000);
      })
      .to(".six", 0.2, {
        opacity: 0,
        y: 30,
        zIndex: "-1"
      })
      .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
      .to(".last-smile", 0.5, {
        rotation: 90
      }, "+=1");
  };

  // Preload functionality
  window.addEventListener('load', function() {
    // Hide preloader when everything is loaded
    document.getElementById('preloader').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
    
    // Preload all images
    const images = document.querySelectorAll('img');
    let imagesLoaded = 0;
    
    function imageLoaded() {
      imagesLoaded++;
      if (imagesLoaded === images.length) {
        console.log('All images loaded!');
      }
    }
    
    images.forEach(img => {
      if (img.complete) {
        imageLoaded();
      } else {
        img.addEventListener('load', imageLoaded);
        img.addEventListener('error', imageLoaded);
      }
    });
    
    // Pre-initialize fireworks in background (not visible)
    fireworks.start();
    setTimeout(() => {
      fireworks.stop();
    }, 500);
  });
  
  // Start button functionality
  document.getElementById('startButton').addEventListener('click', function() {
    document.getElementById('startScreen').style.display = 'none';
    document.querySelector('.container').style.visibility = 'visible';
    // Start the animation
    fetchData();
  });

  // Add new function to handle candle interaction
  function setupCandleInteraction() {
    const candles = document.querySelectorAll('.candle');
    let blownCandles = 0;
    const totalCandles = candles.length;
    
    candles.forEach(candle => {
      candle.addEventListener('mouseenter', function() {
        if (this.getAttribute('data-blown') === 'false') {
          this.setAttribute('data-blown', 'true');
          blownCandles++;
          
          // Check if all candles have been blown out
          if (blownCandles === totalCandles) {
            setTimeout(() => {
              document.getElementById('cake-container').style.opacity = "0";
              setTimeout(() => {
                document.getElementById('cake-container').style.display = "none";
                // Resume the animation for the remaining sequence
                tl.resume();
              }, 1000);
            }, 1000);
          }
        }
      });
    });
  }
