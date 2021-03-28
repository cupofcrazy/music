import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

// plugin
const VueScrollTrigger = {
    install(Vue) {
        console.log('Installed custom ScrollTrigger Plugin.')
        // directive
        Vue.directive('scroll-y', {
            inserted(el) {
                gsap.from(el, 1, {
                    scrollTrigger: el,
                    // clipPath: 'inset(0% 100% 100% 0%)',
                    autoAlpha: 0,
                    y: 100,
                    ease: 'expo.out',
                    // autoAlpha: 0
                })
            }
        })
        Vue.directive('scroll-fade', {
            inserted(el) {
                gsap.from(el, 1, {
                    scrollTrigger: el,
                    ease: 'expo.out',
                    autoAlpha: 0
                })
            }
        })
        Vue.directive('scroll-bounce', {
            inserted(el) {
                gsap.from(el, {
                    scrollTrigger: el,
                    duration: 1.5,
                    scale: .75,
                    autoAlpha: 0,
                    ease: 'elastic.out',
                })
            }
        })

    }
}

export default VueScrollTrigger