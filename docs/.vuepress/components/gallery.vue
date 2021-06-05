<template>
    <div class="gallery">
        <div class="gallery-panel"
             v-for="photo in photos"
             :key="photo.id">
            <router-link :to="`/gallery/photos/${photo.id}`">
                <img :src="thumbUrl(photo.gallery, photo.filename)">
            </router-link>
        </div>
    </div>
</template>

<script>
import photos from '../public/pics/gallery/gallery.json'

export default {
    name: 'gallery',
    props: ['album'],
    data() {
        return {
            photos
        };
    },
    computed: {
        filteredPhotos() {
            return this.photos.filter(photo => photo.gallery = this.album);
        }
    },
    methods: {
        thumbUrl(gallery, filename) {
            return require(`../public/pics/gallery/${gallery}/thumbnails/${filename}`)
        }
    }
}
</script>

<style scoped>
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
        grid-gap: 1rem;
        max-width: 100rem;
        margin: 1.5rem auto;
        padding: 0 2.5rem 0 0;
    }

    .gallery-panel img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.3rem;
    }
</style>
