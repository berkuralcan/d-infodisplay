<template>
    <transition
        appear
        mode="out-in"
        type="animation"
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutDown animate_fast"
    >
        <img :src="require('./../assets/pres/' + src)" class="presentation-image" v-bind:key="src">
    </transition>
</template>
 
<script>
    export default {
        data() {
            return {
                src: "pres-",
                currentImage: 2, // Images start from pres-2.jpg
                slide: 0
            }
        },
        methods: {

            incrementCurrentImage() {
                if (this.currentImage <= 21) {
                    console.log("Ran")
                    this.currentImage += 1
                } else {
                    console.log("reset")
                    this.currentImage = 2
                }
                this.src = "pres-"
                this.updateSrc()
                this.slide += 1
            },

            updateSrc() {
                this.src = this.src + this.currentImage + ".jpg"
            },

            incrementPresentation() {
                setInterval(this.incrementCurrentImage, 30000);
            },
            
            // This could just go below created(), but keeping it separate since the project requirements might change as a whole.
            startPresentation() {
                this.updateSrc()
                this.incrementPresentation()
            },

        },

        created() {
            this.startPresentation()
        }
    }
</script>

<style scoped>

.presentation-image {
    width: 100vw;
    height: 100vh;

}

.test {
    display: none;
}

</style>
