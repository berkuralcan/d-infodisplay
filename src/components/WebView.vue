<template>

        <div class="web-view-container">
            <div class="transparent-container"></div>
             <iframe src="https://www.dansuk.com.tr" frameborder="0" class="website"></iframe>
        </div>
       
</template>

<script>


export default {
    data() {
        return {}
    },

    methods: {

        changeComponents(input) {
            if (input == 1) {
                console.log("dashboard activated")
                this.$emit("dashboardActivated")
            } else if (input == 2) {
                console.log("staying on web page")
            } else if (input == 3) {
                console.log("switching to PDF View")
                this.$emit("PDFViewActivated")
            } else {
                console.log("At least running")
            }
        },
    }
}

</script>

<style>

.website {
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 100vh;
}

.transparent-container {
    position: absolute;
    opacity: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
}

</style>