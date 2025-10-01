<template>
  <div class="parallax-container">
    <section class="parallax-hero" ref="parallaxHero">
      <div class="hero-content animate__animated animate__fadeIn">
        <h1 class="hero-title animate__animated animate__fadeIn">Titulo Parallax</h1>
        <p class="hero-subtitle animate__animated animate__fadeIn animate__delay-1s">
          Demostración usando Gsap y Animate.css en vuejs
        </p>
      </div>
    </section>

    <section class="parallax-layers">
      <div class="layer back" ref="layerBack"></div>
      <div class="layer middle" ref="layerMiddle"></div>
      <div class="layer front" ref="layerFront"></div>
      <div class="layer-content">
        <h2>Efecto de profundidad con capas</h2>
        <p>Observa como cada capa se mueve a una velocidad diferente</p>
      </div>
    </section>

    <section class="parallax-animated animation-section">
      <div class="container">
        <h2>Animaciones interactivas</h2>

        <div class="animation-cards">
          <div class="animate-card" @click="playAnimation('jello')" ref="animationCard">jello</div>
          <div class="animate-card" @click="playAnimation('bounceOut')" ref="animationCard2">bounceOut</div>
          <div class="animate-card">3</div>
          <div class="animate-card">4</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import 'animate.css/animate.min.css'
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const parallaxHero = ref(null)

const layerBack = ref(null)
const layerMiddle = ref(null)
const layerFront = ref(null)

const animationCard = ref(null)
const animationCard2 = ref(null)

const playAnimation = (animation) => {
  let targetElement = null

  switch (animation) {
    case 'jello':
      targetElement = animationCard.value
      break
    case 'bounceOut':
      targetElement = animationCard2.value
      break
    default:
      return
  }

  if (targetElement) {
    targetElement.classList.remove('animate__animated', 'animate__jello', 'animate__bounceOut')

    void targetElement.offsetWidth

    targetElement.classList.add('animate__animated', `animate__${animation}`)
  }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  gsap.fromTo(
    parallaxHero.value,
    { backgroundPositionY: '0%' },
    {
      backgroundPositionY: '50%',
      ease: 'none',
      scrollTrigger: {
        trigger: parallaxHero.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 5,
        // markers: true
      },
    },
  )

  if (layerFront.value) {
    gsap.to(layerBack.value, {
      y: '30%',
      ease: 'none',
      scrollTrigger: {
        trigger: layerBack.value,
        start: 'top top',
        bottom: 'bottom top',
        scrub: 0.5,
      },
    })

    gsap.to(layerMiddle.value, {
      y: '-15%',
      ease: 'none',
      scrollTrigger: {
        trigger: layerMiddle.value,
        start: 'top bottom',
        bottom: 'bottom top',
        scrub: 1,
      },
    })

    gsap.to(layerFront.value, {
      y: '-5%',
      scale: 1.05,
      ease: 'none',
      scrollTrigger: {
        trigger: layerFront.value,
        start: 'top bottom',
        bottom: 'bottom top',
        scrub: 1.5,
      },
    })
  }
})
</script>

<style scoped>
.parallax-container {
  width: 100%;
  overflow-x: hidden;

  .parallax-hero {
    height: 100vh;
    background-image: url('https://images.unsplash.com/photo-1544198365-f5d60b6d8190?auto=format&q=75&w=1920');
    background-size: cover;
    background-position: center 0%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    will-change: background-position;

    .hero-content {
      text-align: center;
      color: white;
      padding: 2rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      max-width: 800px;

      .hero-title {
        font-size: 4rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
      }

      .hero-subtitle {
        font-size: 1.5rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }

  .parallax-layers {
    height: 100vh;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    .layer {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      will-change: transform;

      &.back {
        background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&q=60&w=1920');
        z-index: 1;
        background-size: cover;
        background-position: center;
      }

      &.middle {
        z-index: 2;
        background: linear-gradient(135deg, rgba(111, 66, 193, 0.7), rgba(80, 135, 245, 0.7));
        clip-path: polygon(0 20%, 100% 5%, 100% 80%, 0 90%);
      }

      &.front {
        z-index: 3;
        background-image: url('https://images.unsplash.com/photo-1521747116042-5a810fda9664?auto=format&q=75&w=1000');
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        opacity: 0.7;
      }
    }

    .layer-content {
      position: absolute;
      z-index: 4;
      text-align: center;
      color: white;
      padding: 2rem;
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      max-width: 600px;

      h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgb(0, 0, 0, 0.5);
      }

      p {
        font-size: 1rem;
        max-width: 600px;
        margin: 0 auto;
      }
    }
  }

  .parallax-animated {
    padding: 5rem 1rem;

    &.animation-section {
      background: #f5f5f5;

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;

        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 3rem;
          position: relative;
        }
      }

      .animation-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;

        .animate-card {
          background: white;
          height: 150px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: background-color 0.2s;
          will-change: transform;

          &:hover {
            background: #e0e0e0;
          }
        }
      }
    }
  }
}
</style>
