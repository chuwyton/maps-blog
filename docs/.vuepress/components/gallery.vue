<template>
    <div>
        <div class="gallery">
            <div class="gallery-panel"
                v-for="photo in photos"
                :key="photo.id">
                <img :src="thumbUrl(photo.gallery, photo.filename)" v-on:click="selectPhoto(photo.id)"/>
            </div>
        </div>
        <div class="lightbox" v-if="lightbox" v-on:click="closeLightbox">
            <div class="lightbox-inner">
                <img :src="photoUrl(selectedPhoto.gallery, selectedPhoto.filename)"/>
                <div class="caption">{{selectedPhoto.description}}</div>
            </div>
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
            photos: photos,
            lightbox: false,
            selectedPhoto: {}
        }
    },
    computed: {
        filteredPhotos() {
            return this.photos.filter(photo => photo.gallery = this.album);
        }
    },
    methods: {
        thumbUrl(gallery, filename) {
            return require(`../public/pics/gallery/${gallery}/thumbnails/${filename}`)
        },
        photoUrl(gallery, filename) {
            return require(`../public/pics/gallery/${gallery}/${filename}`);
        },
        selectPhoto(id) {
            this.selectedPhoto = photos.find(photo => photo.id == id);
            this.openLightbox();
        },
        openLightbox() {
            this.lightbox = true;
        },
        closeLightbox() {
            this.lightbox = false;
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

    .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 21;
        background-color: rgba(0, 0, 0, 0.8);
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-gap: 2rem;
        margin-top: 0 !important;
    }

    .lightbox .lightbox-inner {
        margin: auto;
        width: 90vw;
        height: 90vh;
        grid-column-start: 2;
    }

    .lightbox .lightbox-inner img {
        display: block;
        margin: auto;
        max-width: 80vw;
        max-height: 80vh;

    }

    .caption {
        padding-top: 1rem;
        color: white;
        text-align: center;
    }
</style>
