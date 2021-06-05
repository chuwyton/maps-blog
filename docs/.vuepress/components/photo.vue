<template>
    <div class="lightbox" @click.self="closeLightbox">
        <img :src="photoUrl(photo.gallery, photo.filename)">
    </div>
</template>

<script>
import photos from '../public/pics/gallery/gallery.json'
import gallery from './gallery.vue'

export default {
    name: 'photo',
    components: {gallery},
    data() {
        return {
            photos
        };
    },
    computed: {
        photo() {
            return this.photos.find((photo) => {
                let path = this.$page.regularPath.split('/');
                path.reverse();
                return photo.id === Number(path[1]); //match the ending number in gallery/photos/<num>/
            })
        }
    },
    methods: {
        photoUrl(gallery, filename) {
            return require(`../public/pics/gallery/${gallery}/${filename}`);
        },
        closeLightbox() {
            this.$router.push('/gallery/')
        }
    }
}
</script>

<style scoped>
    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-gap: 2rem;
        margin-top: 0 !important;
    }

    .lightbox img {
        margin: auto;
        width: 90vh;
        height: 90vh;
        grid-column-start: 2;
    }
</style>
