<template>
    <div class="my-4">
        <UContainer>
            <div class="flex gap-3">
                <div class="h-10 w-10 bg-primary-500 rounded"></div>
                <h1 class="text-4xl font-semibold text-primary-500">Squad Name</h1>
            </div>
            <UBadge label="1098 members" variant="soft" class="mt-4" />
            <p class="text-neutral-500 mt-2">Elit anim nulla ex deserunt eu aute. Ut nostrud enim do mollit fugiat
                commodo
                culpa labore. Lorem officia
                do aliquip aliqua enim laborum dolore et do magna sunt sit culpa. Deserunt ut non eu veniam nostrud aute
                mollit ea aliqua ullamco nisi. Enim in exercitation occaecat labore ullamco id est proident aliqua
                mollit cillum officia consequat magna. Laborum ex ea consequat elit tempor veniam sint.

                Irure cillum cupidatat minim aliquip duis anim Lorem tempor fugiat eiusmod officia nostrud do. Pariatur
                fugiat consectetur aute velit labore ullamco do. Labore occaecat ullamco cillum in aute adipisicing
                nostrud proident deserunt minim. Nulla labore non dolore cillum fugiat occaecat eu officia do eiusmod
                dolore. Dolore cillum excepteur pariatur consectetur ex do ex in laborum commodo eiusmod cupidatat
                reprehenderit tempor. Magna irure incididunt ut quis laboris ex qui esse nisi ullamco cupidatat ad. Qui
                Lorem proident magna commodo sint id occaecat occaecat mollit dolore irure.</p>
            <h1 class="text-4xl font-semibold text-primary-500 mt-6">Score</h1>
            <div>
                <ul class="flex gap-3 w-full mt-4">
                    <li class="flex-1">
                        <UCard class="w-full">
                            <div class="flex flex-col items-center">
                                <h1 class="text-green-400 font-bold text-2xl">Easy</h1>
                                <UBadge label="463" color="green" variant="soft" />
                            </div>
                        </UCard>
                    </li>
                    <li class="flex-1">
                        <UCard class="w-full">
                            <div class="flex flex-col items-center">
                                <h1 class="text-amber-400 font-bold text-2xl">Medium</h1>
                                <UBadge label="463" color="amber" variant="soft" />
                            </div>
                        </UCard>
                    </li>
                    <li class="flex-1">
                        <UCard class="w-full">
                            <div class="flex flex-col items-center">
                                <h1 class="text-red-400 font-bold text-2xl">Hard</h1>
                                <UBadge label="463" color="red" variant="soft" />
                            </div>
                        </UCard>
                    </li>
                </ul>
            </div>

            <h1 class="text-4xl font-semibold text-primary-500 mt-6">Members</h1>
            <UTable :rows="people" />
        </UContainer>
    </div>
</template>
<script setup>
const people = [{
    id: 1,
    name: 'Lindsay Walton',
    title: 'Front-end Developer',
    email: 'lindsay.walton@example.com',
    role: 'Member'
}, {
    id: 2,
    name: 'Courtney Henry',
    title: 'Designer',
    email: 'courtney.henry@example.com',
    role: 'Admin'
}, {
    id: 3,
    name: 'Tom Cook',
    title: 'Director of Product',
    email: 'tom.cook@example.com',
    role: 'Member'
}, {
    id: 4,
    name: 'Whitney Francis',
    title: 'Copywriter',
    email: 'whitney.francis@example.com',
    role: 'Admin'
}, {
    id: 5,
    name: 'Leonard Krasner',
    title: 'Senior Designer',
    email: 'leonard.krasner@example.com',
    role: 'Owner'
}, {
    id: 6,
    name: 'Floyd Miles',
    title: 'Principal Designer',
    email: 'floyd.miles@example.com',
    role: 'Member'
}]
definePageMeta({
    layout: 'user'
})
</script>