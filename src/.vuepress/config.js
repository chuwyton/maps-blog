module.exports = {
    base: '/maps-blog/',
    dest: 'dist',
    title: 'Hand Drawn Maps of Wyton Chu',
    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Posts', link: '/posts/'},
            {text: 'About', link: '/about/'}
        ]
    },
    additionalPages: [buildGalleryPhotoUrls]
};

function buildGalleryPhotoUrls() {
    const photos = require('./public/pics/gallery/gallery.json');
    const photoArray = [];
    for(let i = 0; i < photos.length; i++) {
        photoArray.push({
            path: `/gallery/photos/${photos[i].id}/`,
            frontmatter: {
                sidebar: false,
                navbar: false,
                pageClass: 'photo-page'
            },
            content: '<gallery/><photo/>'
        })
    }

    return photoArray;
}