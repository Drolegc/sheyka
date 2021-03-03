export default {
    methods: {
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
        }
    }
}