<template>
    <div class="my-2">
        <ul class="flex gap-3">
            <li v-for="(image, index) in images" :key="index" class="relative" @click="selectImage(index)">
                <!-- Conteneur pour gérer les bordures -->
                <div :class="selectedImage === index ? ' bg-blue-500' : 'border border-gray-300'" class="p-1 rounded">
                    <img :src="image" alt="" class="h-20 w-20 rounded object-cover cursor-pointer" />
                </div>
                <!-- Badge de validation -->
                <div v-if="selectedImage === index"
                    class="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
                    <UBadge icon="check" variant="success" />
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            images: [
                "https://static.lpnt.fr/images/2021/11/17/22442307-22442297-g-jpg_8375297_1000x667.jpg",
                "https://i.pinimg.com/236x/a1/b6/b0/a1b6b087f353ae030ab4a024c8ec12ee.jpg",
                "https://plus.unsplash.com/premium_photo-1664299631876-f143dc691c4d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW5pbWFsJTIwZHIlQzMlQjRsZXxlbnwwfHwwfHx8MA%3D%3D",
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm4QKifdHMiRahOTYTq-C-RjnhWuArc7577g&s",
            ],
            selectedImage: null,
        };
    },
    methods: {
        selectImage(index) {
            this.selectedImage = index;
        },
    },
};
</script>

<style>
/* Transition fluide pour les bordures */
.border {
    transition: border-color 0.2s ease;
}
</style>