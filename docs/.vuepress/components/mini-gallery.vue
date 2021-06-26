<template>
    <div class="minigallery" ref="miniGallery"
        :style="{
            'display': 'grid',
            'grid-template-rows': '1fr '.repeat(gridPartitions.yPartitions).trim(),
            'grid-template-columns': '1fr '.repeat(gridPartitions.xPartitions).trim(),
            'grid-gap': '10px'
        }">
        <div class="minigallery-panel"
            v-for="(photo, index) in filteredPhotos"
            :key="index"
            :style="getLayout(index)">
            <img :src="thumbUrl(photo.gallery, photo.filename)"/>
        </div>
    </div>
</template>

<script>
import photos from '../public/pics/gallery/gallery.json';

export default {
    name: 'mini-gallery',
    props: {
        photoList: String, // osakyo/osakyo-5;osakyo/osakyo11;osakyo/osakyo-99
        layoutList: String // 1/1,2/2;        1/3,1/1;         2/3,1/1
    },
    data() {
        return {
            photos: photos
        }
    },
    computed: {
        filteredPhotos() {
            // osakyo.osakyo-5;osakyo-osakyo-11;osakyo.osakyo-99
            return this.photoList.replace(/ /g,'').split(';')
                .map(s => {return{gallery: s.split('/')[0], filename: s.split('/')[1]}})
                .map(i => this.photos.find(p => p.gallery == i.gallery && p.filename.split('.')[0] == i.filename));
        },
        photoLayout() {
            // 1/1,2/2;        1/3,1/1;         2/3,1/1
            return this.layoutList.replace(/ /g,'').split(';').map(
                i => {return {
                    yPos: Number(i.split(',')[0].split('/')[0]),
                    xPos: Number(i.split(',')[0].split('/')[1]),
                    ySize: Number(i.split(',')[1].split('/')[0]),
                    xSize: Number(i.split(',')[1].split('/')[1])
                }}
            )
        },
        gridPartitions() {
            return {
                xPartitions: Math.max(...this.photoLayout.map(pl => pl.xPos + pl.xSize - 1)),
                yPartitions: Math.max(...this.photoLayout.map(pl => pl.yPos + pl.ySize - 1))
            }
        }
    },
    methods: {
        getLayout(index) {
            var pl = this.photoLayout[index];
            return {
                'grid-row-start': pl.yPos,
                'grid-column-start': pl.xPos,
                'grid-row-end': pl.yPos + pl.ySize,
                'grid-column-end': pl.xPos + pl.xSize
            }
        },
        thumbUrl(gallery, filename) {
            return require(`../public/pics/gallery/${gallery}/thumbnails/${filename}`);
        }
    }
}
</script>

<style scoped>
    .minigallery-panel {
        display: flex;
    }

    .minigallery-panel img {
        object-fit: cover;
    }
</style>